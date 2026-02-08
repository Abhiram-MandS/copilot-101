# GitHub Copilot Training Dashboard

An interactive React-based training platform for learning GitHub Copilot features and best practices.

## 🚀 Features

- **Interactive Roadmap**: Visual journey through 3 training modules
- **Progress Tracking**: Persistent progress saved in localStorage
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Interactive Demos**:
  - CLI Terminal Simulator
  - AI Context Window Simulator
  - Token Visualizer
  - Feature Quiz

## 📚 Training Modules

### Module 1: Where Does Copilot Live?
Explore IDE, web, and CLI integrations with interactive demonstrations.

### Module 2: Understanding AI Context
Learn about tokens, context windows, and system prompts with hands-on simulators.

### Module 3: Mastering Copilot
Discover 12 advanced features with searchable cards and knowledge quiz.

## 🛠️ Tech Stack

- **React 18** - UI framework
- **React Router** - SPA navigation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool

## 🏃 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### GitHub Pages

1. Update `vite.config.js` with your repository name:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/',
});
```

2. Build and deploy:
```bash
npm run build
gh-pages -d dist
```

## 📁 Project Structure

```
copilot-training/
├── src/
│   ├── components/
│   │   ├── shared/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Badge.jsx
│   │   └── Roadmap.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── WherePage.jsx
│   │   ├── ContextPage.jsx
│   │   └── MasteringPage.jsx
│   ├── hooks/
│   │   └── useProgress.js
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
└── package.json
```

## 🎯 Usage

1. Navigate to the dashboard
2. Click on any module to start learning
3. Complete interactive exercises
4. Mark modules as complete
5. Track your overall progress

Progress is automatically saved to your browser's localStorage.

## 🎨 Customization

### Colors
Edit `src/styles/globals.css` to customize the design system:
```css
:root {
  --primary-blue: #0969da;
  --primary-purple: #8250df;
  /* ... */
}
```

### Content
Module content is defined directly in the page components:
- `src/pages/WherePage.jsx` - Module 1 content
- `src/pages/ContextPage.jsx` - Module 2 content
- `src/pages/MasteringPage.jsx` - Module 3 features

## 📝 License

This is an educational resource created for training purposes.

## 🤝 Contributing

This is an internal training module. For suggestions or improvements, please reach out to the team.

## 📧 Contact

For questions or support, contact the Learning & Development team.

