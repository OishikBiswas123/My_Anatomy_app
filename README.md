# My Anatomy (3D Human Anatomy Learning Application)

An interactive, 100% offline 3D human anatomy educational application designed for medical students and healthcare trainees.

Built with **React**, **TypeScript**, **Three.js / React Three Fiber**, **Tailwind CSS**, and **Capacitor** for Android.

---

## 🌟 Key Features

- **100% Offline Autonomy:** Zero backend, zero remote database dependencies, and no internet required. All 3D anatomical models and knowledge indexes are bundled locally.
- **Three Core Anatomical Systems:**
  - **Skeletal System:** Complete 3D human skeleton with 206 individually selectable bone meshes derived from Z-Anatomy / BodyParts3D (CC BY-SA 4.0).
  - **Muscular System:** Full-body 3D muscles with origins, insertions, primary actions, motor innervations, and vascular supply.
  - **Ligamentous System:** Joint stabilizers (Knee ACL/PCL/MCL/LCL/patellar, Shoulder glenohumeral, and Ankle ATFL/Deltoid).
- **Interactive 3D Viewport:** Touch-damped rotation, pinch-to-zoom, orientation shortcuts (ANT, POST, LAT L, LAT R), structure isolation, and peeling/hiding.
- **Offline Clinical Search:** Instant search by anatomical name, Latin name, common name, or clinical keyword.
- **Interactive Study & Quiz Mode:** Multiple-choice clinical cases and anatomical knowledge tests with explanations.
- **Offline Bookmarks & Revision:** Save key structures and track study progress locally.
- **Android Ready:** Packaged with Capacitor for native Android APK/AAB distribution with hardware back-button support and haptics.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation & Development
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build
```

### Android Native Workflow
```bash
# Sync web assets to Android
npx cap sync android

# Open project in Android Studio
npx cap open android
```

---

## ⚖️ License & Attribution

- **3D Anatomical Models:** Derived from the open-source **Z-Anatomy** project, based on **BodyParts3D** (The Database Center for Life Science, Japan), licensed under [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/).
- **Application Code:** Licensed under the MIT License.
