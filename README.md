# Vue 3 + TypeScript + Tailwind CSS Project

A modern Vue 3 application starter configured with Vite, TypeScript, Vue Router, Pinia, and Tailwind CSS v4.

## 🚀 Features

- **Vue 3**: Composition API with `<script setup>`
- **Vite**: Ultra-fast build tool and development server
- **TypeScript**: Strict type-checking with modern TS config
- **Tailwind CSS v4**: Zero-configuration utility-first CSS engine
- **Vue Router**: Official routing with lazy-loaded views
- **Pinia**: Intuitive, type-safe state management
- **Path Aliasing**: `@/` maps directly to `./src`

## 📁 Project Structure

```text
src/
├── assets/         # Static assets and icons
├── components/     # Reusable Vue components
├── router/         # Vue Router configuration
│   └── index.ts
├── stores/         # Pinia state stores
│   └── counter.ts
├── views/          # Route page views (HomeView, AboutView)
│   ├── HomeView.vue
│   └── AboutView.vue
├── App.vue         # Root application component
├── main.ts         # App initialization & plugin registration
└── style.css       # Tailwind CSS v4 entrypoint
```

## 🛠️ Getting Started

### Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```
# personal-portfolio
