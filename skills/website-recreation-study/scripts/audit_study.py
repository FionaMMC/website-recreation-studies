#!/usr/bin/env python3
"""Read-only static asset, optional component registry and Markdown link audit."""
import argparse
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit

LIMITS = [
    "Checks file existence for static HTML/CSS references, not HTTP responses or content correctness.",
    "Does not inspect JavaScript-created URLs, runtime endpoints, lazy-loading, CSS variables or computed styles.",
    "Does not validate visuals, hydration, animation, accessibility, browser behavior or Markdown anchors.",
]


class Audit:
    def __init__(self, case, public, build):
        self.case = case
        self.roots = list(dict.fromkeys([build, public, case]))
        self.errors = []
        self.css_seen = set()
        self.references = 0

    def relative(self, path):
        try:
            return str(path.relative_to(self.case))
        except ValueError:
            return str(path)

    def contained(self, path):
        try:
            path.relative_to(self.case)
            return True
        except ValueError:
            return False

    def read(self, path):
        if not self.contained(path.resolve()):
            self.errors.append(f"Path escapes case: {self.relative(path)}")
            return ""
        try:
            return path.read_text(encoding="utf-8")
        except (OSError, UnicodeError) as exc:
            self.errors.append(f"Cannot read {self.relative(path)}: {exc}")
            return ""

    def resolve(self, raw, owner, document=False):
        raw = raw.strip().strip("\"'")
        if not raw or raw.startswith(("#", "var(")):
            return None
        try:
            url = urlsplit(raw)
            if url.scheme or url.netloc or not url.path:
                return None
            decoded = unquote(url.path)
            self.references += 1
            roots = [self.case] if document else self.roots
            # Resolve root URLs against the owning asset tree first.
            if not document:
                roots = sorted(roots, key=lambda p: (not owner.is_relative_to(p), -len(p.parts)))
            candidates = [(p / decoded.lstrip("/")).resolve() for p in roots] if decoded.startswith("/") else [(owner.parent / decoded).resolve()]
            safe = [p for p in candidates if self.contained(p)]
            if not safe:
                self.errors.append(f"Path escapes case: {raw} in {self.relative(owner)}")
                return None
            for path in safe:
                if path.is_file() or (document and path.is_dir()):
                    return path
            self.errors.append(f"Missing {'document link' if document else 'asset'}: {raw} in {self.relative(owner)}")
        except (ValueError, OSError) as exc:
            self.errors.append(f"Invalid URL {raw!r} in {self.relative(owner)}: {exc}")
        return None

    def reference(self, raw, owner):
        path = self.resolve(raw, owner)
        if path and path.suffix.lower() == ".css":
            self.css(path)

    def css_text(self, text, owner):
        text = re.sub(r"/\*.*?\*/", "", text, flags=re.S)
        matches = re.findall(r'url\(\s*(?:"((?:\\.|[^"\\])*)"|\'((?:\\.|[^\'\\])*)\'|([^)]*?))\s*\)', text, flags=re.I)
        refs = [next((part for part in match if part), "") for match in matches]
        refs += re.findall(r"@import\s+[\"']([^\"']+)[\"']", text, flags=re.I)
        for value in set(refs):
            self.reference(value, owner)

    def css(self, path):
        if path not in self.css_seen:
            self.css_seen.add(path)
            self.css_text(self.read(path), path)

    def registry(self, path):
        try:
            value = json.loads(self.read(path))
        except json.JSONDecodeError as exc:
            self.errors.append(f"Invalid registry JSON: {self.relative(path)}: {exc}")
            return 0
        patterns = value.get("patterns") if isinstance(value, dict) else value
        if not isinstance(patterns, list):
            self.errors.append("Registry must be a list, or an object containing a patterns list")
            return 0
        seen = set()
        for index, item in enumerate(patterns):
            if not isinstance(item, dict):
                self.errors.append(f"Registry item {index} must be an object")
                continue
            identity, source = item.get("id"), item.get("source")
            if not isinstance(identity, str) or not identity.strip():
                self.errors.append(f"Registry item {index} needs a nonempty id")
            elif identity in seen:
                self.errors.append(f"Duplicate component id: {identity}")
            else:
                seen.add(identity)
            if not isinstance(source, str) or not source.strip():
                self.errors.append(f"Registry item {index} needs a source file")
                continue
            target = (self.case / source).resolve()
            if not self.contained(target) or not target.is_file():
                self.errors.append(f"Missing or unsafe component source: {source}")
        return len(patterns)


class HTMLAssets(HTMLParser):
    def __init__(self, audit, owner):
        super().__init__(convert_charrefs=True)
        self.audit, self.owner, self.in_style = audit, owner, False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "style":
            self.in_style = True
        for key in ("src", "poster"):
            if attrs.get(key):
                self.audit.reference(attrs[key], self.owner)
        if tag == "link" and set(attrs.get("rel", "").lower().split()) & {"stylesheet", "icon", "preload", "modulepreload", "manifest", "apple-touch-icon"}:
            self.audit.reference(attrs.get("href", ""), self.owner)
        if attrs.get("srcset") and not attrs["srcset"].lstrip().startswith("data:"):
            for part in attrs["srcset"].split(","):
                if part.strip():
                    self.audit.reference(part.strip().split()[0], self.owner)
        if attrs.get("style"):
            self.audit.css_text(attrs["style"], self.owner)

    def handle_endtag(self, tag):
        if tag == "style":
            self.in_style = False

    def handle_data(self, data):
        if self.in_style:
            self.audit.css_text(data, self.owner)


def main():
    parser = argparse.ArgumentParser(description=__doc__, epilog="No network or filesystem mutations. Python 3.9+.")
    parser.add_argument("case_dir", type=Path)
    parser.add_argument("--public-dir", default="public")
    parser.add_argument("--build-dir", default="dist")
    parser.add_argument("--registry", help="Optional case-relative registry; defaults to src/patterns/registry.json when present")
    parser.add_argument("--docs-dir", default="docs")
    parser.add_argument("--json", action="store_true", dest="as_json")
    args = parser.parse_args()
    case = args.case_dir.resolve()
    if not case.is_dir():
        parser.error("case_dir must be an existing directory")
    paths = {key: (case / value).resolve() for key, value in [("public", args.public_dir), ("build", args.build_dir), ("docs", args.docs_dir), ("registry", args.registry or "src/patterns/registry.json")]}
    audit = Audit(case, paths["public"], paths["build"])
    if any(not audit.contained(path) for path in paths.values()):
        parser.error("configured paths must remain inside case_dir")
    html = sorted(paths["build"].rglob("*.html")) if paths["build"].is_dir() else []
    if not html:
        html = sorted(set(case.glob("*.html")) | set(paths["public"].rglob("*.html")))
    if not html:
        audit.errors.append("No static HTML found in build directory, public directory or case root")
    for page in html:
        HTMLAssets(audit, page).feed(audit.read(page))
    for root in set([paths["public"], paths["build"]]):
        if root.is_dir():
            for css in root.rglob("*.css"):
                audit.css(css)
    registry_count = audit.registry(paths["registry"]) if paths["registry"].is_file() else None
    if args.registry and registry_count is None:
        audit.errors.append(f"Requested registry does not exist: {args.registry}")
    docs = sorted(set(case.glob("README*.md")) | set(paths["docs"].rglob("*.md")))
    for doc in docs:
        text = re.sub(r"^\s*(```|~~~).*?^\s*\1\s*$", "", audit.read(doc), flags=re.S | re.M)
        for value in re.findall(r"\]\(\s*(<[^>]+>|[^\s)]+)", text):
            audit.resolve(value.strip("<>"), doc, document=True)
    audit.errors = list(dict.fromkeys(audit.errors))
    result = {"ok": not audit.errors, "html_files": len(html), "css_files": len(audit.css_seen), "references": audit.references, "components": registry_count, "markdown_files": len(docs), "errors": audit.errors, "coverage_limits": LIMITS}
    if args.as_json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print(f"{'PASS' if result['ok'] else 'FAIL'}: {len(html)} HTML, {len(audit.css_seen)} CSS, {audit.references} static references, {len(docs)} Markdown files; components: {registry_count if registry_count is not None else 'not supplied'}")
        for message in audit.errors + ["Limit: " + item for item in LIMITS]:
            print(message)
    return 0 if result["ok"] else 1


if __name__ == "__main__":
    sys.exit(main())
