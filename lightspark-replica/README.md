# 001 · Lightspark

对 [Lightspark 当前首页](https://www.lightspark.com/) 的 React 复刻。参照 [Godly 首页与分区拆解](https://godly.design/website/lightspark/)，保留原始字体、插画、响应式网格、首屏物件动效、菜单和轮播。

美灿的第一感受：**“苹果风，现代的，情绪的色彩的，商业的。”**

## 运行

需要 Node.js 22.12+。

```sh
npm ci
npm run dev
```

- 首页：<http://localhost:5173/>
- 元素学习页：<http://localhost:5173/study>
- 构建：`npm run build`
- 资源检查：`npm run check`
- 本地构建预览：`npm run preview`

本案例只提供本地运行，没有启用 GitHub Pages 或其他线上部署。

## 代码结构

```text
src/
  App.jsx                     React 入口组合
  main.jsx                    启动及 hydration
  pages/HomePage.jsx          首页 React 组件
  pages/StudyPage.jsx         组件与 label 展示
  providers/WebsiteProvider.jsx 兼容路由、Head 与图片上下文
  components/CookiePreferences.jsx 本地偏好弹窗
  lib/runtime.js              原始 UI 模块的兼容边界
  lib/navigation.js           二级导航
  data/page-data.json         原站公开的页面数据
  patterns/                   独立重写的可复用 React 模式
public/
  fonts/ images/ brand/       原始视觉素材
  _next/                      保留的原始编译组件和样式
  ...                         二级入口的原站跳转页
index.html                    原始 SSR 首屏，供 React 接管
```

## 还原策略与边界

这是一份以还原度优先的 React 项目。为了保留首屏卡片物理、连续曲率遮罩、菜单过渡等细节，主首页通过兼容层调用原站公开的已编译 React 组件图，使用同一份 React 19.3.1 运行时，避免重复 React 实例导致 Hooks 错误。它不是对原站所有组件的逐行手写 JSX 重构。可阅读、可移植的独立模式另存于 `src/patterns/`，用于系列学习和后续复用。

样式、字体和可见图片均由本地提供。保留完整首页；产品详情、销售预约、登录、API key 和文档入口转到原站对应页面。第三方统计脚本已移除，Cookie preferences 由本地 React 弹窗承接。

## 学习材料

- [设计拆解与个人感受](docs/lightspark-design-study.md)
- [系列 Label 体系](docs/label-taxonomy.md)
- [新案例模板](docs/study-template.md)
- [验证记录](docs/verification.md)
- [素材来源和归属](NOTICE.md)
