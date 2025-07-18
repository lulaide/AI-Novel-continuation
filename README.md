# AI 小说续写器 (AI Novel Continuation Tool)

🎭 一个基于 OpenAI API 的智能小说续写工具，帮助作家和创作者扩展他们的创意写作。

## ✨ 主要功能

- 🤖 **AI 结局生成**: 为您的小说开头生成 4 个不同的创意结局
- ✍️ **智能续写**: 基于选择的结局生成连贯的小说续写内容
- 📏 **长度控制**: 支持短篇(300字)、中篇(500字)、长篇(700字)三种长度
- 🎨 **现代界面**: 响应式设计，支持移动设备，提供优雅的用户体验
- 🔧 **灵活配置**: 支持自定义 OpenAI API 端点和模型选择
- 🔄 **迭代创作**: 支持多轮续写，构建复杂的叙事结构

## 📸 预览

![AI Novel Continuation Tool](https://via.placeholder.com/800x400?text=AI+Novel+Continuation+Tool)

## 🚀 快速开始

### 前端 (React + Vite)
```bash
cd front
npm install
npm run dev
```

### 后端 (Python Flask)
```bash
cd back
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### 访问应用
- 前端: http://localhost:3000
- 后端 API: http://localhost:5000

## 🛠️ 技术栈

### 前端
- **React 19.1.0** - 现代化前端框架
- **Vite 6.3.5** - 快速构建工具
- **Pure CSS** - 自定义样式设计
- **ESLint** - 代码质量保证

### 后端
- **Flask 3.1.1** - 轻量级 Web 框架
- **OpenAI API 1.86.0** - AI 文本生成
- **Session Management** - 安全的配置管理

## 📚 文档

- [📋 详细分析报告](ANALYSIS.md) - 深入的仓库分析和评估
- [🏗️ 架构文档](ARCHITECTURE.md) - 系统架构和设计说明
- [🔌 API 文档](API.md) - 完整的 API 接口说明
- [📖 使用指南](USAGE.md) - 详细的使用说明和示例

## 🎯 使用方法

1. **配置 API**: 点击齿轮图标配置您的 OpenAI API 密钥
2. **输入内容**: 在文本框中输入您的小说开头
3. **生成结局**: 点击箭头按钮生成 4 个不同的结局
4. **选择结局**: 点击选择您喜欢的结局
5. **续写小说**: 选择长度并点击"生成续写"

## 🧪 测试

使用提供的测试脚本验证 API 功能：

```bash
# 设置您的 OpenAI API 密钥
export OPENAI_API_KEY="sk-your-api-key-here"

# 运行测试
python test_api.py
```

## 🌟 特色亮点

### 智能写作助手
- 基于上下文的结局生成
- 保持故事连贯性
- 支持多种文学风格

### 用户友好的界面
- 自动调整高度的文本框
- 优雅的加载动画
- 直观的交互设计

### 灵活的配置
- 支持多种 OpenAI 兼容的 API
- 可调节的生成长度
- 会话级配置管理

## 🔧 开发相关

### 项目结构
```
AI-Novel-continuation/
├── front/              # React 前端应用
│   ├── src/
│   │   ├── App.jsx     # 主应用组件
│   │   ├── App.css     # 样式文件
│   │   └── main.jsx    # 入口文件
│   └── package.json
├── back/               # Flask 后端应用
│   ├── main.py         # 主应用文件
│   └── requirements.txt
├── test_api.py         # API 测试脚本
└── docs/              # 文档文件
```

### 构建生产版本
```bash
# 前端构建
cd front
npm run build

# 后端部署
cd back
pip install -r requirements.txt
python main.py
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📝 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- OpenAI 提供的强大 API 服务
- React 和 Flask 社区的优秀工具
- 所有为开源项目贡献的开发者

## 📞 联系方式

如果您有任何问题或建议，请通过以下方式联系：
- 创建 Issue
- 发送 Pull Request
- 参与讨论

---

⭐ 如果这个项目对您有帮助，请考虑给它一个星标！
