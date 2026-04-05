# 💰 Finance Dashboard UI

## 🌐 Live Demo

👉 https://finance-dashboard-shrey.vercel.app/

---

## 📌 Overview

This project is a **responsive finance dashboard** designed to help users track, analyze, and understand their financial activity.

It focuses on **clean UI design, modular component structure, and intuitive user experience**, built entirely on the frontend using mock data.

---

## ✨ Features

### 📊 Dashboard Overview

* Summary cards displaying:

  * Total Balance
  * Total Income
  * Total Expenses
* Time-based visualization (balance trend)
* Category-based visualization (spending breakdown)

---

### 💳 Transactions Section

* Detailed transaction list including:

  * Date
  * Amount
  * Category
  * Type (Income / Expense)
* Features:

  * 🔍 Search functionality
  * 🎯 Filtering (by type/category)
  * 📑 Clean tabular layout
* Recent Transactions preview on dashboard

---

### 🔐 Role-Based UI (Frontend Simulation)

* **Viewer**

  * Can view all data

* **Admin**

  * Can add/manage transactions

* Role switching implemented via UI toggle for demonstration

---

### 💡 Insights Section

* Automatically generated insights such as:

  * Highest spending category
  * Spending trends
  * Useful financial observations

---

### ⚙️ State Management

* Global state handled using **React Context API**

  * Transactions data
  * Filters
  * Selected role

---

### 🎨 UI / UX Highlights

* Clean and modern design
* Glassmorphism-inspired components
* Responsive layout (mobile, tablet, desktop)
* Graceful handling of empty states
* Smooth and intuitive user interactions

---

## 🛠️ Tech Stack

* **Frontend:** Next.js (React)
* **Styling:** Tailwind CSS
* **Charts:** Recharts
* **State Management:** Context API

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

---

## 🧠 Approach

The application is built with a **component-driven architecture**, ensuring modularity and scalability.

* UI is divided into independent reusable components
* Global state is centralized using Context API
* Mock data is used to simulate real-world financial scenarios
* Focus was placed on **clarity, usability, and clean design**

---

## ⚠️ Assumptions

* Data is static (no backend integration)
* Role-based behavior is simulated on the frontend
* Designed primarily to demonstrate frontend architecture and UI thinking

---

## 🔮 Possible Improvements

* Backend integration (API + database)
* Authentication system
* Data persistence (local storage / server)
* Advanced analytics and filters
* Export functionality (CSV/JSON)
* Dark mode toggle

