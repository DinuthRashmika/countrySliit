
# 🌐 World Countries Explorer

**Live Demo**: [https://dinuth-rashmika-country.vercel.app/](https://dinuth-rashmika-country.vercel.app/)
---
**Deploy Site**:[ vercel.com](https://vercel.com/)

A beautifully designed, responsive web application for exploring countries around the world. Discover cultural diversity, geography, and statistics — all in one platform.

---

![App Screenshot](./Screenshot%202025-05-04%20151840.png)

---

## ✨ Features

- 🌍 **Browse Countries** – View all countries with flags and stats
- 🔍 **Search** – Find countries by name
- 🌐 **Filter** – Filter countries by region
- 📊 **Statistics** – Display total number of countries, languages, and regions
- ❤️ **Favorites** – Add/remove countries to a favorites list (with persistent local storage)
- 💡 **Dark Mode** – Toggle-friendly modern dark mode interface
- 📱 **Responsive** – Works great on mobile, tablet, and desktop

---

## 🛠️ Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **API**: [REST Countries API](https://restcountries.com/)
- **Storage**: LocalStorage for persisting favorites
- **Backend (Auth)**: Spring Boot user management service

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v16 or above)
- npm or yarn

### 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-DinuthRashmika.git

# Navigate into the project directory
cd rest-countries-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 🔨 Build for Production

```bash
npm run build
```

### 🧪 Run Tests

```bash
npm run test
```

---

## 💡 Usage Guide

- Use the **search bar** to quickly find countries by name
- Filter by **region** using the dropdown
- Click the **heart icon** 💖 on any country to add/remove from your favorites
- Use the **"Show Favorites"** button to view only your favorited countries
- Switch between **dark and light modes** for a personalized experience

---

## 📡 API Reference

Using the [REST Countries API](https://restcountries.com/):

- `GET /all` – Retrieve all countries
- `GET /name/{name}` – Search by country name
- `GET /region/{region}` – Filter by region
- `GET /alpha/{code}` – Get full country details by alpha code

---

## 👤 Authentication

- Spring Boot backend handles user registration and login
- Logged-in users are greeted by name
- Logout functionality clears the session

---

## 👏 Credits

Created by **Dinuth Rashmika**  
For educational purposes – Software Engineering Group Project (AF Module)

---

## 📸 Screenshot Preview

> Homepage showing statistics, region filters, search bar, and favorites functionality:

![App Screenshot](./Screenshot%202025-05-04%20151840.png)

---

## 📜 License

This project is licensed under the MIT License.
