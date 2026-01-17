# 🌸 FLORA Access - Online Beauty Store

<div align="center">

![FLORA Access](https://img.shields.io/badge/FLORA-Access-pink?style=for-the-badge&logo=shopify&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)

**A modern, elegant e-commerce platform for beauty products in Tunisia**

### 🌐 [Live Demo → http://72.62.176.16:999](http://72.62.176.16:999)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Deployment](#-deployment) • [Author](#-author)

</div>

---

## 📋 Overview

FLORA Access is a fully-featured e-commerce web application designed specifically for the Tunisian beauty market. Built with modern React and industry best practices, it provides a seamless shopping experience with guest checkout, order tracking, and a beautiful responsive design.

## ✨ Features

### 🛍️ E-Commerce Core
- **Product Catalog** - Browse products with filtering, sorting, and search
- **Product Details** - High-quality images, color selection, stock indicators
- **Shopping Cart** - Add/remove items, quantity management, persistent storage
- **Promo Codes** - Apply discount codes with real-time total updates

### 📦 Order Management
- **Guest Checkout** - 3-step checkout flow (Information → Shipping → Review)
- **Cash on Delivery** - Payment on delivery for Tunisian market
- **Order Tracking** - Track orders with verification (captcha protected)
- **Order History** - Status updates with timeline visualization

### 🎨 Design & UX
- **Responsive Design** - Mobile-first approach, works on all devices
- **CSS Modules** - Scoped styling with design tokens
- **Reusable Components** - Button, Input, Modal, Icon system
- **Smooth Animations** - Subtle transitions and micro-interactions

### 🔧 Technical Features
- **React Router v6** - Client-side routing with lazy loading
- **Context API** - Global state management (Cart, Orders)
- **LocalStorage** - Persistent cart and order data
- **Form Validation** - Client-side validation with error messages
- **Captcha Component** - Upgradeable security (math challenge → reCAPTCHA)

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18.3, JavaScript ES6+ |
| **Build Tool** | Vite 5.4 |
| **Routing** | React Router DOM 6 |
| **Styling** | CSS Modules, CSS Custom Properties |
| **Validation** | PropTypes |
| **Containerization** | Docker, Nginx |
| **CI/CD** | GitHub Actions |

## 📁 Project Structure

```
flora-access-shop/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button/
│   │   │   ├── Icon/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   ├── Captcha/
│   │   │   └── ...
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   └── ProductCard/
│   ├── pages/
│   │   ├── HomePage/
│   │   ├── ShopPage/
│   │   ├── ProductPage/
│   │   ├── CartPage/
│   │   ├── CheckoutPage/
│   │   ├── ContactPage/
│   │   └── TrackOrderPage/
│   ├── context/
│   │   ├── CartContext.jsx
│   │   └── OrderContext.jsx
│   ├── constants/
│   ├── utils/
│   └── data/
├── public/
├── .github/workflows/
├── Dockerfile
├── nginx.conf
└── docker-compose.yml
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+
- Docker (optional, for containerized deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/BohBOhTN/flora_access_online_store.git
cd flora_access_online_store

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🐳 Deployment

### Docker Deployment

```bash
# Build and run with Docker
docker build -t flora-access-shop .
docker run -p 999:999 flora-access-shop

# Or with docker-compose
docker-compose up --build
```

### CI/CD Pipeline

The project includes a GitHub Actions workflow that:
1. Builds and tests the application
2. Creates a Docker image
3. Deploys to VPS on push to `master` branch

**Required GitHub Secrets:**
- `VPS_HOST` - Server IP address
- `VPS_USERNAME` - SSH username
- `VPS_SSH_KEY` - Private SSH key
- `VPS_PORT` - SSH port (optional, defaults to 22)

## 🎯 Promo Codes (Demo)

| Code | Discount | Minimum Order |
|------|----------|---------------|
| `FLORA10` | 10% off | None |
| `FLORA20` | 20% off | 150 DT |
| `BIENVENUE` | 15 DT off | 50 DT |
| `LIVRAISON` | Free shipping | None |



## 👨‍💻 Author

<div align="center">

**Baha Eddine Hamdi**

[![GitHub](https://img.shields.io/badge/GitHub-BohBOhTN-181717?style=for-the-badge&logo=github)](https://github.com/BohBOhTN)

</div>

---

## 📄 License

### ⚠️ PROPRIETARY LICENSE - ALL RIGHTS RESERVED

```
Copyright (c) 2026 Baha Eddine Hamdi. All Rights Reserved.

This software and associated documentation files (the "Software") are the 
exclusive property of Baha Eddine Hamdi.

RESTRICTIONS:
- You may NOT use, copy, modify, merge, publish, distribute, sublicense, 
  or sell copies of the Software without explicit written permission from 
  the copyright holder.
- You may NOT use this Software for commercial or non-commercial purposes 
  without prior authorization.
- You may NOT reverse engineer, decompile, or disassemble the Software.
- You may NOT remove or alter any proprietary notices or labels on the Software.

UNAUTHORIZED USE:
Any unauthorized use, reproduction, or distribution of this Software, or any 
portion of it, may result in severe civil and criminal penalties, and will be 
prosecuted to the maximum extent possible under the law.

For licensing inquiries, please contact the author.
```

---

<div align="center">

Made by BohBOhTN 🇹🇳

**FLORA Access Shop** - *Votre destination beauté*

</div>
