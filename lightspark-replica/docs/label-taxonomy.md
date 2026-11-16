# 网页复刻学习系列 · 标签词表

标签用于跨网站检索**可观察、可迁移的设计模式**。感受、事实和解释分开保存，让之后能回答“我为什么喜欢这个页面”“哪一种做法适合当前项目”，而不是只收集“高级”“好看”这些结果词。

## 标签结构

模式 ID 采用 `namespace:lower-kebab-case`，一经发布保持稳定。中文名称可以改得更准确；ID 不因翻译或措辞调整而变化。含义实质改变时建立新 ID，并注明替代关系。

| 命名空间 | 记录内容 | 合适的问题 |
| --- | --- | --- |
| `color` | 配色的分工与关系 | 色彩在哪里承担情绪，哪里承担信息？ |
| `type` | 字体与排版层级 | 字号、字重、行宽怎样组织阅读？ |
| `layout` | 空间、网格和信息结构 | 内容为什么这样分组和排序？ |
| `shape` | 轮廓与组件形态 | 不同角色的形态是否构成一致家族？ |
| `motion` | 时间、反馈和输入响应 | 什么触发变化，变化解释什么？ |
| `nav` | 查找、预览和跨页到达 | 用户怎样判断下一步去哪里？ |
| `responsive` | 设备变化后的交互重组 | 窄屏保留了什么，重新组织了什么？ |
| `proof` | 信任证据的表达 | 谁说的、数字说明什么、依据在哪里？ |
| `conversion` | 下一步行动与真实路径 | 不同准备程度的用户怎样开始？ |

不要为每个网站都创建一套同义标签。优先复用已有标签，并在实例里记录该网站的具体变体。

## 当前登记的模式

| 稳定 ID | 中文名称 | 核心关系 / 检索关键词 | 首个实例 |
| --- | --- | --- | --- |
| `color:emotional-objects-neutral-shell` | 情绪物件，安静底盘 | 中性界面承载信息，局部彩色物件承载情绪；模糊边缘、品牌温度 | [Lightspark 01](lightspark-design-study.md#01--情绪物件安静底盘) |
| `type:restrained-variable-sans` | 克制的变量无衬线排版 | 同家族、少字重、字号与灰度层级；商业信息 | [Lightspark 02](lightspark-design-study.md#02--字体克制让内容提供分量) |
| `layout:whitespace-as-hierarchy` | 留白作为层级 | 空间分组、阶段切换、限制行宽；阅读节奏 | [Lightspark 03](lightspark-design-study.md#03--留白负责分组与节奏) |
| `shape:continuous-corners` | 连续曲率轮廓 | Squircle、柔和触感、组件家族；角色差异 | [Lightspark 04](lightspark-design-study.md#04--连续曲率形成触感) |
| `layout:hairline-editorial-grid` | 细线编辑网格 | 淡分隔线、列对齐、编号；结构秩序 | [Lightspark 05](lightspark-design-study.md#05--细线网格把丰富内容放稳) |
| `motion:progressive-brand-contraction` | 品牌渐进收束 | 滚动进度、Logo 展开与停靠；展示进入阅读 | [Lightspark 06](lightspark-design-study.md#06--品牌从展开到收束) |
| `nav:preview-mega-menu` | 带预览的分组导航 | 信息气味、菜单预览、业务分组；桌面与移动抽屉 | [Lightspark 07](lightspark-design-study.md#07--mega-menu-先给上下文) |
| `motion:inertial-object-field` | 惯性物件场 | 拖动、惯性、指针视差、可探索首屏；屏外暂停 | [Lightspark 08](lightspark-design-study.md#08--可拨动的物件场) |
| `responsive:touch-first-product-carousel` | 触控优先的产品轮播 | 桌面并列转窄屏连续浏览；手势与发现线索 | [Lightspark 09](lightspark-design-study.md#09--窄屏把同时展示改成连续浏览) |
| `proof:metric-quote-attribution` | 指标、引言与署名证据链 | 数字语境、客户身份、可归属引言；证言轮播 | [Lightspark 10](lightspark-design-study.md#10--客户证据有完整归属) |
| `proof:quiet-logo-rail` | 低噪声 Logo 带 | 灰度、光学尺寸、连续轨道；熟悉感与规模 | [Lightspark 11](lightspark-design-study.md#11--低噪声-logo-带) |
| `conversion:guided-or-self-serve` | 销售沟通与自主开始双入口 | Demo / API key、文档、沙盒；准备程度 | [Lightspark 12](lightspark-design-study.md#12--同时接住销售与开发者) |

## 感受词独立保存

感受不是模式标签的别名。可以按原话保存后，再添加便于检索的辅助索引，但不得覆盖或修正用户原话。

本次原话：

> 苹果风，现代的，情绪的色彩的，商业的

| 感受索引 | 可对应的原话片段 | 使用规则 |
| --- | --- | --- |
| `impression:apple-like` | 苹果风 | 仅表示用户审美联想，不等于品牌、技术或组件来源 |
| `impression:modern` | 现代的 | 保留用户判断，另找具体机制，不当作已验证设计属性 |
| `impression:emotional-color` | 情绪的色彩的 | 保留原始表达，可关联色彩与插图模式 |
| `impression:commercial` | 商业的 | 可关联证据、内容结构和行动入口，不自动表示商业效果好 |

后续如果用户没有给感受，就写“未提供”，不要替用户创造一条原话。

## 每个模式实例至少记录什么

```yaml
pattern_id: color:emotional-objects-neutral-shell
instance_id: lightspark-home-2026-11-17
source_url: https://www.lightspark.com/
reference_url: https://godly.design/website/lightspark/
observed_on: 2026-11-17
surface: homepage-hero
states_observed:
  - desktop-default
  - mobile-default
observation: 可见或可从公开实现确认的事实
interpretation: 我们对作用的解释，不能写成已验证效果
reuse_when: 适合解决的具体问题
adaptation: 迁移时必须重新选择的内容与参数
guardrails: 可读性、输入方式、性能与内容真实性的边界
verification: 实际观察方式，以及没有验证的部分
```

这是记录示例结构；`states_observed` 必须按实际验证状态填写，不能把示例值当成已完成检查。

## 添加或修改标签的规则

1. **先找已有概念。** “客户 Logo 跑马灯”和“合作方 Logo 连续带”优先归到同一模式，在实例里记录静态/移动变体。
2. **一个 ID 记录一组有因果关系的选择。** `inertial-object-field` 包含拖动、惯性和位移反馈，因为它们共同定义一个体验；不要只因某页有动画就套用它。
3. **命名指向机制。** 优先“留白作为层级”，避免“高级感留白”。“高级”可以留在感受层。
4. **解释可被修订。** 新证据可能推翻“为什么有用”的判断；保留来源与修订原因。未经测试不写“提升转化率”。
5. **把使用条件一起保存。** 模式的价值包括不适合哪里，例如比较任务不宜被轮播隐藏。
6. **保留原话与来源。** 用户感受、原站内容、我们的解释分别标明主体。不同网站的案例不能共用一条未经核对的观察。

## 系列如何组织

每个网站用一份学习记录，维护标题、来源、研究日期、原始感受、页面路径、模式实例和验证边界。跨站共用本词表；发现新的模式再添加条目。一次研究不需要覆盖所有命名空间，也不需要达到固定数量。

后续可以直接检索 ID，例如查找 `motion:progressive-brand-contraction` 的所有实例，再比较它们的触发条件、移动端处理和使用边界。不要把不同网站中同名的视觉效果当成同一种交互机制。

## 组件 ID 与设计模式标签

设计模式标签跨网站复用，组件 ID 标识本案例的具体代码实现；两者分别保留。`src/patterns/registry.json` 的 `principles` 字段建立映射。

| 组件 ID | 组件 | 关联模式 |
| --- | --- | --- |
| `lightspark.soft-focus-card` | SoftFocusCard | `color:emotional-objects-neutral-shell`、`shape:continuous-corners` |
| `lightspark.hairline-grid` | HairlineGrid | `layout:hairline-editorial-grid`、`layout:whitespace-as-hierarchy` |
| `lightspark.action-pair` | ActionPair | `conversion:guided-or-self-serve` |
| `lightspark.partner-marquee` | PartnerMarquee | `proof:quiet-logo-rail` |
| `lightspark.section-heading` | SectionHeading | `type:restrained-variable-sans`、`layout:whitespace-as-hierarchy` |

本地 `/study` 页面展示这 5 个实现。其余模式记录在研究笔记中，未声称已经实现独立通用组件。
