# 设计与代码资源的记录约定

沿用已存在的系列结构，不为满足模板迁移旧案例。当前系列是 `FionaMMC/website-recreation-studies`，首例位于 `lightspark-replica/`。根 `studies.json` 与 README 是索引，案例里保留页面、patterns、docs 和截图。

## 案例记录

索引至少能找到网站、原始链接、参考链接、观察日期、案例目录、感受原话、笔记与组件注册表。日期以用户时区为准。给来源时点，避免原站更新后无法解释差异。

```json
{
  "id": "002-example",
  "name": "Example",
  "observedOn": "YYYY-MM-DD",
  "source": "https://example.com/",
  "directory": "example-replica",
  "framework": "React + Vite",
  "userImpression": null,
  "designStudy": "example-replica/docs/design-study.md",
  "patternRegistry": "example-replica/src/patterns/registry.json"
}
```

`userImpression: null` 表示没有提供，不等同于没有感受。其他索引字段按项目实际延续。没有要求发布，不填猜测出来的线上 URL。

## 把感受变成可讨论的记录

每个学习点包含：

1. 感受原话或与之相关的主观索引。
2. 可观察事实：具体区块、状态、输入、设备和来源。
3. 我们的解释：它如何影响层级或体验；明确是解释。
4. 可复用关系：解决什么问题，哪些参数需换成自己的。
5. 适用边界与验证状态。

“好看、苹果风、现代、商业”可以保留，但不是技术规格或效果证据。不要把客户规模当成产品提升结果、把观感推断为提升转化率，或替用户创作感受原话。

## 标签与组件分开

- 跨站设计模式：`namespace:lower-kebab-case`，例如 `layout:whitespace-as-hierarchy`、`motion:inertial-object-field`。
- 案例组件 ID：`site.component-name`，例如 `lightspark.soft-focus-card`。
- 感受索引：`impression:apple-like` 等，保持主观属性，不与模式混为一谈。

先检索已有词表，再新增真正不同的机制。已发布 ID 保持稳定；文字名称可以改进。有本质变化就建新 ID 并保留替代关系。

注册表示例：

```json
{
  "schemaVersion": 1,
  "collection": "example",
  "patterns": [{
    "id": "example.quiet-grid",
    "label": "轻量信息网格",
    "component": "QuietGrid",
    "source": "src/patterns/QuietGrid.jsx",
    "description": "用对齐、间距和必要细线建立内容关系。",
    "principles": ["layout:hairline-editorial-grid"]
  }]
}
```

未写成组件的原则只放研究笔记，不填不存在的源文件。不要为了统一数量硬拆或凑组件。

## 组件何时可以称为可复用

代码需能脱离原站特定运行图使用：

- 内容、图片、动作、主题等通过 props / tokens 输入；不用原站客户、营销文案或路由作为硬编码默认值。
- 不依赖原站 webpack 编号、全局私有对象或特定页面 DOM。
- 独立命名空间样式、依赖说明、使用例子；对触控、键盘、长文案、减少动态效果有合理处理。
- 在学习页用真实示例展示并运行，不以孤立 snippet 代表验证完成。

若案例为了保真共享 vendor React，独立模式移植示例应使用正常 React 导入并验证。不要让下一个项目为了一个小组件必须复制原站全部运行时。已有首例的 patterns 可以作参考，先核对适用条件、改为项目自身依赖，再复制必要文件；不强制保留 Suisse、柔焦或暖白色。

## 来源与自有资产边界

`public/reference`、`vendor` 等原始材料保留归属与用途，`src/patterns`、tokens 和研究文本标明新写部分。路径可沿用旧结构，归属说明必须清楚。

不要把商业字体、插画、客户 Logo 和编译模块标成我们的原创或统一套上开源许可证。可迁移的是重写的实现和提炼的机制；品牌素材是否可复用另行判断。公开提交前只包含任务相关内容，排除本地凭据、统计配置、下载缓存、node_modules、临时产物和私有上下文。

## 学习页与交付

本地学习页可按组件显示预览、稳定 label、关联原则与简短使用代码，支持查看状态和基本输入。不能为了学习页改动忠实复刻的原站 UI。截图贴近对应说明，附尺寸与状态；保留源代码与笔记链接。

验证记录区分“看过的行为”“脚本检查”“未覆盖范围”。系列索引添加新案例，保持已有记录。只有上传授权成立时推送同一仓库；技能本身不扩大外部写入权限。网站部署仍独立且默认关闭。
