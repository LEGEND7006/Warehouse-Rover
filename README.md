# 🤖 Warehouse Rover

Welcome to **Warehouse Rover**! This project is a full-stack simulation of an automated warehouse rover. It visualizes the pathfinding and movement of rovers through a grid system in real-time, helping optimize logistics and warehouse operations.

## ✨ Features
- **Interactive Dashboard:** Beautiful, modern UI for monitoring and controlling rover activities.
- **Real-Time Pathfinding:** The backend calculates optimized paths between a start and destination node.
- **Activity Logging:** Keeps track of rover movements and operations.
- **Sleek Design:** Built with React and Tailwind CSS, utilizing a dark-mode glassmorphism aesthetic.

## 🛠 Tech Stack

### Frontend
- **React 19**
- **Vite**
- **Tailwind CSS** (for styling)
- **Lucide React** (for icons)
- **React Router** (for navigation)

### Backend
- **Node.js**
- **Express.js**
- **CORS** 

---

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/LEGEND7006/Warehouse-Rover.git
cd Warehouse-Rover
```

### 2. Setup the Backend
The backend runs an Express server that handles the pathfinding logic.

```bash
cd backend
npm install
node server.js
```
The backend will start running on `http://localhost:3001`.

### 3. Setup the Frontend
The frontend runs the interactive React application. Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```
The frontend will start running, usually on `http://localhost:5173`. Open this URL in your browser to interact with the Warehouse Rover dashboard!

---

## 📂 Project Structure

```
Warehouse-Rover/
├── backend/
│   ├── utils/         # Pathfinding logic and helpers
│   ├── server.js      # Express server entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/# Reusable UI components
    │   ├── pages/     # React router pages
    │   ├── hooks/     # Custom React hooks (e.g., useSimulation)
    │   └── App.jsx    # Main frontend application
    ├── tailwind.config.js
    └── package.json
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! 

## 📝 License
This project is open-source and available under the ISC License.
