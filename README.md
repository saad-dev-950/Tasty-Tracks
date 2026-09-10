# 🍔 Tasty Tracks by SJ

> A premium, modern, and interactive Food Ordering & Delivery Web Application crafted with high-performance animations, sleek glassmorphism UI, and real-time state management.

---

## 🌟 Overview

**Tasty Tracks by SJ** is an end-to-end digital food ordering platform designed to offer a seamless, immersive, and visually captivating dining experience. Built using **React 19** and **Vite**, the application features a dark luxury aesthetic, dynamic menu filtering, interactive cart & checkout systems, live order tracking, and a comprehensive admin management dashboard.

---

## ✨ Key Features

- **🎨 Premium Visuals & Micro-Interactions**: Dark glassmorphism theme, custom glowing cursor, 3D card tilt effects, staggered typography, and smooth page transitions powered by Framer Motion.
- **🍕 Interactive Menu & Category Filtering**: Browse dishes filtered by categories (Burgers, Pizza, Pasta, Desserts, Beverages) with real-time search and item quick views.
- **🛒 Dynamic Cart & Checkout System**: Seamlessly add items to cart, adjust quantities, apply discount promo codes, and place orders with instant validation.
- **📦 Real-time Order Tracking**: Track active and past food orders with dynamic progress updates (Order Placed ➔ Preparing ➔ Out for Delivery ➔ Delivered).
- **👤 User Authentication & Persistence**: Complete user signup, login, and profile session management persisted via browser `LocalStorage`.
- **⚙️ Admin Management Dashboard**: Full admin capabilities to add, edit, or delete menu items, monitor revenue metrics, update live order statuses, and filter customer records.
- **🎉 Interactive FX**: Celebratory confetti effects upon placing an order and dark-themed toast notifications (`React Toastify`).
- **📱 Fully Responsive Layout**: Tailored for desktop, tablet, and mobile displays with dynamic navigation bars and drawers.

---

## 🛠️ Tech Stack

### **Frontend & Core**
- **React 19** (`react`, `react-dom`) - UI Component Architecture
- **Vite** (`vite`, `@vitejs/plugin-react`) - Lightning-fast Build Tool & HMR Server
- **React Router DOM (v7)** - Client-side Routing & Page Navigation

### **UI Components & Styling**
- **Ant Design (`antd`)** - Modular UI Component Library
- **Ant Design Icons** - Vector Icon Sets
- **Custom Vanilla CSS** - Tailored Design System with CSS Variables & Glassmorphism Effects

### **State Management & Persistence**
- **React Context API**:
  - `AuthContext`: User registration, authentication, and session state
  - `CartContext`: Shopping cart items, total calculation, and promo codes
  - `MenuContext`: Dynamic product list, filtering, and admin CRUD state
  - `OrderContext`: Customer order histories and live order status tracking
- **Browser LocalStorage**: Persistent client-side state across reloads

### **Animations & Effects**
- **Framer Motion** - Page transitions, modal animations, and list staggering
- **React Tilt** - Interactive 3D tilt effects on product cards
- **Canvas Confetti** - Visual celebration effects for successful orders

### **Notifications & Tooling**
- **React Toastify** - Custom dark toast notifications
- **Oxlint** - High-performance JavaScript/JSX code linter

---

## 📁 Project Structure

```text
Tasty Tracks by SJ/
├── public/                  # Static assets & favicon
├── src/
│   ├── assets/              # Images, banners, and logos
│   ├── components/          # Reusable UI components
│   │   ├── AdminProductModal.jsx
│   │   ├── BackToTop.jsx
│   │   ├── CategoryNav.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── HeroCarousel.jsx
│   │   ├── InitialLoader.jsx
│   │   ├── PageTransition.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductModal.jsx
│   │   ├── SkeletonCard.jsx
│   │   └── ...
│   ├── context/             # React Context Providers
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── MenuContext.jsx
│   │   └── OrderContext.jsx
│   ├── data/                # Mock data & menu items catalog
│   │   └── menuData.js
│   ├── pages/               # Application Pages / Routes
│   │   ├── About.jsx
│   │   ├── Admin.jsx
│   │   ├── Checkout.jsx
│   │   ├── Contact.jsx
│   │   ├── Gallery.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── OrderTracking.jsx
│   │   └── Signup.jsx
│   ├── utils/               # Helper utilities & formatters
│   ├── App.jsx              # Main App component & route configuration
│   ├── index.css            # Global CSS styles & design tokens
│   └── main.jsx             # React DOM entry point & context wrapper
├── index.html               # HTML5 entry template
├── package.json             # NPM dependencies & scripts
├── vite.config.js           # Vite build configuration
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

Follow these steps to run **Tasty Tracks by SJ** locally on your machine.

### **Prerequisites**
Ensure you have the following installed on your system:
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### **Installation**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/saad-dev-950/Tasty-Tracks.git
   cd Tasty-Tracks
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` (or the URL shown in your terminal).

---

## 📜 Available Scripts

In the project directory, you can run:

- **`npm run dev`**: Starts the local Vite development server with HMR.
- **`npm run build`**: Compiles and bundles the application for production in the `dist/` directory.
- **`npm run preview`**: Previews the production build locally.
- **`npm run lint`**: Runs Oxlint to inspect code for syntax and style issues.

---

## 👨‍💻 Developer Information

- **Developer Name**: Saad Nadeem
- **Platform / Brand**: Saad Dev Hub 🚀
- **Role**: Full-Stack Developer | MERN Stack
- **Mission**: Building clean, modern, high-performance, and user-centric web applications.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
