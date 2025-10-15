# Gank Tools Suite 🛠️

A professional toolbox of browser monitoring utilities with multiple practical detection features.

> 🚀 **Main Site**: [https://www.gankinterview.cn](https://www.gankinterview.cn) – a dedicated technical interview platform

## 🌟 Try It Online

Visit [https://tools.gankinterview.cn](https://tools.gankinterview.cn) to launch every tool in the suite.

## 📋 Tool Catalog

#### 📱 Screen Switch Detector
- **Purpose**: Monitor page focus in real time and detect tab switching
- **Highlights**:
  - Live screen-switch notifications
  - Detailed usage duration analytics
  - Focus percentage tracking
  - Exportable session history
  - Customizable audio and visual alerts
  - Fullscreen mode support
- **Path**: `/screen_switch_detection/`

#### 🎥 Screen Share Demo
- **Purpose**: WebRTC-based screen sharing showcase
- **Highlights**:
  - Share fullscreen or a specific window
  - HD real-time streaming
  - Local and remote preview panes
  - Audio capture synchronization
  - Robust error reporting
  - Cross-browser support
- **Path**: `/video_detection/screen-share-demo.html`

## 🚀 Deploying to Tencent Cloud EdgeOne Pages

### Option 1: Deploy from GitHub

1. Fork this repository to your GitHub account.
2. Sign in to the [Tencent Cloud EdgeOne Console](https://console.cloud.tencent.com/edgeone).
3. Open the Pages service and choose “Import from Git repository”.
4. Connect your GitHub account and pick the forked repository.
5. Deployment settings:
   - **Build Command**: leave blank
   - **Output Directory**: `.`
   - **Node.js Version**: not required

### Option 2: Manual Upload

1. Download every file from this repository.
2. Sign in to the Tencent Cloud EdgeOne Console.
3. Create a new Pages project.
4. Upload the files to the project root.
5. Finish the configuration and the site is ready to access.

### Configuration Notes

The project ships with an `.edgeonerc` file to automate:
- Route rewrites
- Security headers
- Static asset delivery

## 🛠️ Local Development

```bash
# Clone the repository
git clone https://github.com/mikezhouhan/gank-tools.git
cd gank-tools

# Serve with any HTTP server
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js (requires http-server)
npx http-server

# Option 3: PHP
php -S localhost:8000

# Browse http://localhost:8000
```

## 📁 Project Structure

```
gank-tools/
├── index.html                 # Main navigation hub
├── .edgeonerc                 # EdgeOne Pages configuration
├── CLAUDE.md                  # Claude Code contribution guide
├── README.md                  # Project overview
├── screen_switch_detection/   # Screen switch monitoring tool
│   ├── index.html
│   ├── script.js
│   └── styles.css
└── video_detection/           # Screen sharing demo
    └── screen-share-demo.html
```

## 🔧 Technical Highlights

- **Zero dependencies**: no external libraries or build steps required
- **Responsive design**: polished layouts on desktop and mobile
- **Modern APIs**: built with the latest browser capabilities
- **Progressive enhancement**: graceful fallbacks in unsupported browsers
- **Security first**: follows web security best practices

## 🌐 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📄 License

MIT License – see [LICENSE](LICENSE) for details.

## 🤝 Contributing

Issues and pull requests are always welcome!

## 📞 Contact

- GitHub Issues: [Report a problem](https://github.com/mikezhouhan/gank-tools/issues)
- Email: support@mail.gankinterview.cn
