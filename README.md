# Jadaa · 艺术家个人简历网站

本提交在仓库根目录添加了一个静态的艺术家个人简历交互网站。

包含文件：
- index.html — 站点主页面（首页 / 生平 / 画廊 / 展览 / 联系）
- styles.css — 样式表，响应式布局与配色
- script.js — 简单交互：导航切换、平滑滚动、画廊模态
- assets/ — 三个占位 SVG 作品图

部署与本地调试：
1. 在本地克隆仓库并切换到 main 分支：
   git clone https://github.com/Jadaa-rou/CV.git
   git checkout main
2. 直接打开 `index.html` 即可预览（推荐使用本地静态服务器）：
   - Python 3: `python -m http.server 8000` 然后打开 http://localhost:8000
3. 若要使用 GitHub Pages：在仓库设置里启用 GitHub Pages，选择 `main` 分支的根目录即可。

配色与字体：使用暖色系为主，结合少量蓝紫作为点缀，字体使用 Google Fonts 的 Playfair Display（标题）和 Inter（正文字体）。

如需我：
- 替换占位图片为真实作品（可批量上传到 assets/），我可以帮你更新缩略图与元数据；
- 添加多语言支持、打印式简历（PDF 导出）、或将联系表单接入后端邮件服务。

已将文件提交到 `main` 分支。
