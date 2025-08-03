# Gank工具集 🛠️

专业的网页监控检测工具箱，提供多种实用的监控和检测功能。

> 🚀 **主站地址**: [https://www.gankinterview.cn](https://www.gankinterview.cn) - 专业的技术面试平台

## 🌟 在线体验

访问 [https://your-domain.pages.dev](https://your-domain.pages.dev) 体验所有工具

## 📋 工具列表

### ✅ 可用工具

#### 📱 切屏检测器
- **功能**: 实时监控页面焦点状态，检测用户切屏行为
- **特性**: 
  - 实时切屏检测和提醒
  - 详细的使用时间统计
  - 专注度百分比计算
  - 历史记录导出功能
  - 可自定义声音和视觉提醒
  - 全屏模式支持
- **访问**: `/screen_switch_detection/`

#### 🎥 视频检测演示
- **功能**: 基于 WebRTC 技术的屏幕共享演示
- **特性**:
  - 全屏或窗口选择性共享
  - 高清实时视频传输
  - 本地和远程双重预览
  - 音频同步传输
  - 智能错误处理
  - 跨浏览器兼容性
- **访问**: `/video_detection/screen-share-demo.html`

### 🚧 即将推出

- **🔊 音频检测器**: 检测和分析用户麦克风使用情况
- **🖱️ 行为检测器**: 监控用户的鼠标和键盘活动模式

## 🚀 部署到腾讯云 EdgeOne Pages

### 方式一：GitHub 连接部署

1. Fork 本仓库到你的 GitHub 账户
2. 登录 [腾讯云 EdgeOne 控制台](https://console.cloud.tencent.com/edgeone)
3. 进入 Pages 服务，选择 "从 Git 仓库导入"
4. 连接你的 GitHub 账户并选择 fork 的仓库
5. 部署配置：
   - **构建命令**: 留空
   - **输出目录**: `.`
   - **Node.js 版本**: 不需要

### 方式二：手动上传部署

1. 下载本仓库所有文件
2. 登录腾讯云 EdgeOne 控制台
3. 创建新的 Pages 项目
4. 上传所有文件到项目根目录
5. 配置完成后即可访问

### 配置说明

项目包含 `.edgeonerc` 配置文件，自动配置：
- 路由重写规则
- 安全头设置
- 静态文件服务

## 🛠️ 本地开发

```bash
# 克隆仓库
git clone https://github.com/mikezhouhan/gank-tools.git
cd gank-tools

# 使用任意 HTTP 服务器运行
# 方式1: Python
python -m http.server 8000

# 方式2: Node.js (需要先安装 http-server)
npx http-server

# 方式3: PHP
php -S localhost:8000

# 访问 http://localhost:8000
```

## 📁 项目结构

```
gank-tools/
├── index.html                 # 主导航页面
├── .edgeonerc                 # EdgeOne Pages 配置
├── CLAUDE.md                  # Claude Code 开发指南
├── README.md                  # 项目说明
├── screen_switch_detection/   # 切屏检测工具
│   ├── index.html
│   ├── script.js
│   └── styles.css
└── video_detection/           # 视频检测工具
    └── screen-share-demo.html
```

## 🔧 技术特性

- **零依赖**: 不需要任何外部库或框架
- **响应式设计**: 完美适配桌面和移动设备
- **现代技术**: 使用最新的 Web API
- **渐进增强**: 在不支持的浏览器中优雅降级
- **安全优先**: 遵循 Web 安全最佳实践

## 🌐 浏览器支持

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

- GitHub Issues: [问题反馈](https://github.com/mikezhouhan/gank-tools/issues)
- Email: support@mail.gankinterview.cn