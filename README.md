# 📘 Classwork Tracker

A single-page classwork tracking system built with **React (Vite)** and **Node.js (Express)**.

Each user can log in with a unique username (no password required) and manage their personal list of assignments — including adding, editing, filtering, and marking them as complete.

---

## 🚀 Features

- ✅ **User-based login** with session cookie  
- 🗓️ **Add assignments** with title and due date  
- 📋 **View and sort** by nearest due date  
- ✏️ **Edit assignments** (title and date)  
- ✅❌ **Mark as complete/incomplete**  
- 🔍 **Filter by status**: All / Done / Not done  
- 🗑️ **Delete assignments**  
- 💾 **Session persistence** using HTTP-only cookies  
- 🎨 **One CSS file per component** for maintainable styling  
- 🌐 **Fully RESTful backend API** using Express  

---

## 🛠 How to Run

## 1. Development Mode (for local development)
- Run frontend and backend separately for live-reloading and debugging:
# Install dependencies
npm install

# Run Vite frontend dev server (usually on port 5173)
npm run dev

# In a new terminal, run Express backend (usually on port 3000)
npm start

- Make sure the frontend is configured to proxy API requests (see vite.config.js) to the backend.
- Open in browser: http://localhost:5173

## 2. Production Mode (for deployment)
- Build frontend and serve it via Express as static files:
# Install dependencies
npm install

# Build the frontend (outputs to /dist)
npm run build

# Start Express server (serves /dist)
npm start

Then open in your browser:
http://localhost:3000

---

## 📦 Tech Stack

### 🧠 Frontend

- **React** (with Vite) — Building dynamic UI components and SPA
- **useReducer** — Complex state management (centralized reducer logic)
- **fetch API (no async/await)** — Making RESTful service calls
- **Pure CSS (no UI libraries)** — Semantic, component-scoped styling
- **One .css file per component** — Maintainable, organized styles
- **Component structure** — Split into logical units: Form, List, Item, Status, etc.

### ⚙️ Backend

- **Node.js with Express** — Serving REST APIs and static files (Vite build output)
- **cookie-parser** — Handling HTTP-only session cookies for login persistence
- **uuid** — Generating unique IDs for each classwork assignment
- **Custom session system** — Using in-memory `sessions.js` for tracking login state
- **User data management** — Per-user classwork lists stored in server memory

### 🔗 Frontend–Backend Communication

- All services follow **REST principles**
- At least 4 distinct HTTP methods used: `GET`, `POST`, `PATCH`, `DELETE`
- No use of localStorage/sessionStorage (only cookie-based sessions per spec)
- Authorization enforced via session token for all protected routes

### 🧪 Development Tools

- **Vite** — Fast frontend bundling & dev server
- **ESLint + Prettier** — Code formatting and linting
- **npm scripts** — For `build` and `start` commands
- **.gitignore** — Properly ignores `node_modules/` and `dist/`

---

## 🔐 Security Notes

- Usernames must be registered before login — no pre-defined usernames exist.
- The username `dog` is explicitly **denied access** to demonstrate authorization control.
-  All attempts to log in as `dog` are rejected with an appropriate error message and denied session.

---

## 🖼️ Assets and Licensing

- No external images or icons used outside of those permitted.
- If any icons or fonts are added, they will follow these sources:
  - Icons from [Google Fonts Icons](https://fonts.google.com/icons)
  - Fonts via system UI fonts or optionally [Google Fonts](https://fonts.google.com/)
