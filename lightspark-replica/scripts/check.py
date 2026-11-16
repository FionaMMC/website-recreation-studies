"""Validate local asset closure, runtime patches, labels and documentation links."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json,re,subprocess,sys
ROOT=Path(__file__).resolve().parent.parent
errors=[]
resources=set()
class Assets(HTMLParser):
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag in ('script','img','source') and a.get('src'): resources.add(a['src'])
        if tag=='link' and any(x in a.get('rel','') for x in ['stylesheet','icon','preload']): resources.add(a.get('href',''))
parser=Assets()
for page in ['index.html','study.html']:
    parser.feed((ROOT/'dist'/page).read_text())
for css in (ROOT/'public').rglob('*.css'):
    for raw in re.findall(r'url\(([^)]+)\)',css.read_text()):
        value=raw.strip('\"\' ')
        if value.startswith('data:') or value.startswith('http'):continue
        path=ROOT/'public'/value.lstrip('/') if value.startswith('/') else css.parent/value.split('?')[0]
        if not path.is_file():errors.append(f'Missing CSS asset: {path.relative_to(ROOT)}')
for value in resources:
    if not value.startswith('/') or value.startswith('//'):continue
    path=ROOT/'dist'/unquote(urlsplit(value).path).lstrip('/')
    if not path.is_file():errors.append('Missing built asset: '+value)
count=0
for js in (ROOT/'public/_next').rglob('*.js'):
    result=subprocess.run(['node','--check',str(js)],capture_output=True,text=True)
    count+=1
    if result.returncode:errors.append(f'Invalid JavaScript: {js.name}: {result.stderr[:200]}')
    for value in re.findall(r'[\"\'](/(?:images|fonts|brand)/[^\"\'`\\]*\.(?:webp|svg|png|woff2?))[\"\']',js.read_text()):
        if not (ROOT/'public'/value.lstrip('/')).is_file():errors.append('Missing runtime asset: '+value)
app=(ROOT/'public/_next/static/chunks/pages/_app-44817acd33900988.js').read_text()
main=(ROOT/'public/_next/static/chunks/main-41a1ac46906224cf.js').read_text()
if 'o&&a().initialize({gtmId:o})' in app:errors.append('Production analytics startup remains enabled')
if 'window.__lightsparkRequire=e' not in main:errors.append('React compatibility export missing')
registry=json.loads((ROOT/'src/patterns/registry.json').read_text())
ids=[x['id'] for x in registry['patterns']]
if len(ids)!=len(set(ids)):errors.append('Duplicate component IDs')
for item in registry['patterns']:
    if not (ROOT/item['source']).is_file():errors.append('Missing pattern component: '+item['source'])
for doc in [ROOT/'README.md',*list((ROOT/'docs').glob('*.md'))]:
    for value in re.findall(r'\]\(([^)]+)\)',doc.read_text()):
        if value.startswith(('http:','https:','#')):continue
        target=value.split('#')[0]
        if target and not (doc.parent/unquote(target)).exists():errors.append(f'Broken documentation link: {doc.name}: {target}')
errors=list(dict.fromkeys(errors))
if errors:
    print('\n'.join(errors));sys.exit(1)
print(f'PASS: {len(resources)} built asset references; CSS and runtime asset closure; {count} vendor JS files; {len(ids)} unique component labels; local doc links; analytics disabled.')
