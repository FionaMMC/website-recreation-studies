import { React } from '../lib/runtime.js';
import { SoftFocusCard, HairlineGrid, ActionPair, PartnerMarquee, SectionHeading, patternRegistry } from '../patterns/index.js';
import '../styles/study.css';

const logos = ['sofi','coinbase','nu','revolut','whop','bitso','tether','polymarket'].map(name => ({
  src: `/images/explore/logos/logo-${name}.svg`, alt: name, width: 100, height: 30,
}));
const feelingLabels = ['苹果风', '现代', '情绪性色彩', '商业感'];

function PatternLabel({ id }) {
  const [copied, setCopied] = React.useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(id); setCopied(true); }
    catch { setCopied(false); }
  }
  return <button className="study-label" onClick={copy} title="复制 label">{copied ? '已复制' : id}<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 5.5V2.5h7v8H10M3 5.5h7v8H3z" fill="none" stroke="currentColor" /></svg></button>;
}
function PatternNote({ id, title, description, children, code }) {
  return <section className="study-pattern" id={id}>
    <div className="study-pattern__description"><PatternLabel id={`lightspark.${id}`} /><h2>{title}</h2><p>{description}</p></div>
    <div className="study-pattern__demo">{children}<details><summary>查看复用代码</summary><pre><code>{code}</code></pre></details></div>
  </section>;
}
export default function StudyPage() {
  return <div className="study">
    <header className="study-nav"><a href="/" aria-label="查看 Lightspark 复刻首页">Website studies <span>001</span></a><a href="https://github.com/FionaMMC/website-recreation-studies" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a></header>
    <main>
      <section className="study-intro">
        <h1>理性的秩序，<br /><span>情绪的色彩。</span></h1>
        <div className="study-intro__aside"><p>Lightspark · 界面学习</p><blockquote>“苹果风，现代的，情绪的色彩的，商业的。”</blockquote><p>先记录美灿的第一感受，再把感受拆成能理解、能复用的设计手法。</p><div className="study-feelings">{feelingLabels.map(x=><span key={x}>{x}</span>)}</div></div>
      </section>
      <p className="study-context">“苹果风”是视觉联想。以下组件是从原站提炼并单独实现的学习模式；完整首页保留原始 React 组件与动效。</p>
      <nav className="study-index" aria-label="可复用模式索引">{patternRegistry.patterns.map(p=><a key={p.id} href={`#${p.id.replace('lightspark.','')}`}>{p.label.split(' · ')[0]}</a>)}</nav>
      <PatternNote id="soft-focus-card" title="让色彩有温度" description="柔焦边缘让产品插画从页面里浮出来。色彩负责感受，清晰的文字负责信息；模糊停留在视觉层。" code={'<SoftFocusCard\n  src="/your-product.webp"\n  alt="产品预览"\n  href="/product"\n  title="你的产品"\n/>'}>
        <div className="study-card-pair"><SoftFocusCard src="/images/hero-v2-blur/hero-img-wallets-gga.webp" alt="蓝色柔焦背景中的钱包账户界面" title="柔焦边缘" description="保留产品中心的清晰信息。" href="#soft-focus-card"/><SoftFocusCard src="/images/hero-v2-blur/hero-img-cards.webp" alt="红色柔焦背景中的银行卡界面" title="情绪性色彩" description="在克制的版式中容纳饱和色。" href="#soft-focus-card"/></div>
      </PatternNote>
      <PatternNote id="hairline-grid" title="让结构轻下来" description="用细线和间距建立秩序。信息之间有明确的关系，却不需要每一格都变成厚重的卡片。" code={'<HairlineGrid columns={3} mobileColumns={1}>\n  <p>信息一</p>\n  <p>信息二</p>\n  <p>信息三</p>\n</HairlineGrid>'}>
        <HairlineGrid columns={3} mobileColumns={1}>{[['对齐','关系比边框更重要'],['留白','让注意力有停留的地方'],['分隔','一条细线就足够']].map(([title,copy])=><div className="study-grid-copy" key={title}><span>{title}</span><p>{copy}</p></div>)}</HairlineGrid>
      </PatternNote>
      <PatternNote id="action-pair" title="给两种准备程度" description="主操作与次操作放在一起，用深浅表达优先级。让需要交流的人和准备动手的人都能继续。" code={'<ActionPair\n  primary={{ label: "查看完整复刻", href: "/" }}\n  secondary={{ label: "查看代码", href: "…" }}\n/>'}>
        <div className="study-action-demo"><ActionPair primary={{label:'查看完整复刻',href:'/'}} secondary={{label:'查看代码',href:'https://github.com/FionaMMC/website-recreation-studies'}} /></div>
      </PatternNote>
      <PatternNote id="partner-marquee" title="让信任安静地出现" description="统一尺度的品牌标志低速连续移动，悬停或键盘聚焦时暂停；减少动态效果时改为静态横向列表。" code={'<PartnerMarquee\n  logos={[{ src: "/logo.svg", alt: "合作方" }]}\n  speed={42}\n/>'}>
        <PartnerMarquee logos={logos} speed={42} label="原站展示的客户标志，作为排版学习素材" />
      </PatternNote>
      <PatternNote id="section-heading" title="用文字建立层级" description="中性的无衬线字体、克制的字重、充分的段落间距。标题有分量，正文保持可读。" code={'<SectionHeading\n  title="你的章节标题"\n  description="一句有用的解释。"\n/>'}>
        <SectionHeading title="What we do" description="标题先说清楚，视觉再让它值得被看见。" />
      </PatternNote>
    </main>
    <footer className="study-footer"><p>001 / Lightspark</p><p>主观感受 → 可观察手法 → 可复用模式</p><a href="/">回到复刻首页 <span aria-hidden="true">↗</span></a></footer>
  </div>;
}
