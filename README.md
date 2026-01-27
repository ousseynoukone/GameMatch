
# 🎮 GameMatch

GameMatch is a React + Vite web application that allows users to **search, explore, and save video games** using an external game data source. The application focuses on clean UI, component-based architecture, global state management, and user interaction through search and favorites functionality.

The project demonstrates modern front-end development practices with React, reusable UI components, and basic application state handling.

---

## 🎯 Project Goals

- Allow users to search for video games
- Display game information in a clean card-based UI
- Let users save games to a favorites list
- Demonstrate React component architecture
- Practice global state management with React Context
- Build a scalable front-end structure for a real-world use case

---

## ⚙️ Core Functionalities

### 🔍 1. Game Search
Users can search for video games by name.

- Search input field
- Fetches game data from an external API
- Displays matching games dynamically with pagination
- Handles loading and empty results states

Implemented in:
- `SearchGame.jsx`
- `get_games.js`

---

### 🃏 2. Game Display (Game Cards)
Each game is displayed using a reusable card component.

Each card shows:
- Game title
- Game image (if available)
- Game metadata
- Action buttons (ex: favorite)

Implemented in:
- `GameCard.jsx`

---

### ❤️ 3. Favorites System
Users can add and remove games from their favorites list.

Features:
- Add a game to favorites
- Remove a game from favorites
- Global favorites state shared across the app
- Persistent state during session

Implemented with:
- React Context API
- `FavoritesContext.jsx`

---

### 🧠 4. Global State Management
The app uses React Context to manage shared state.

Managed data:
- Favorite games list
- Functions to add/remove favorites

This avoids prop drilling and centralizes logic.

Implemented in:
- `FavoritesContext.jsx`

---

### 🎨 5. Modern UI Components
The project uses a custom UI component system inspired by shadcn/ui.

Reusable UI components:
- Buttons
- Dialogs
- Select inputs
- Form controls

Located in:
- `src/components/ui/`

This demonstrates:
- Reusable design system
- Separation of logic and UI
- Scalable UI architecture

---

## 🧩 Main Components Breakdown

### `App.jsx`
Root application component.

Responsibilities:
- Main layout
- Integration of search and game display
- Wrapping the app with context providers

---

### `SearchGame.jsx`
Handles game searching.

Responsibilities:
- Search input
- Trigger API calls
- Manage search state
- Pass game results to display components

---

### `GameCard.jsx`
Displays individual game information.

Responsibilities:
- Render game details
- Show game image and name
- Favorite button
- UI presentation

---

### UI Components (`src/components/ui/`)
Reusable low-level UI elements:

- `button.tsx` – Custom button component
- `dialog.tsx` – Modal/dialog UI
- `select.tsx` – Select dropdown
- `input_select.jsx` – Custom input/select hybrid

These improve:
- Code reuse
- UI consistency
- Maintainability

---

### `FavoritesContext.jsx`
Global favorites manager.

Responsibilities:
- Store favorites list
- Provide `addToFavorites` and `removeFromFavorites`
- Share favorites across components

---

## 🌐 API & Data Layer

### `get_games.js`
Handles external API communication.

Responsibilities:
- Fetch game data from a game API
- Parse and return usable game objects
- Centralize API logic

This separates:
- UI logic
- Data-fetching logic

---

## 🧪 Testing

### `get_games.test.js`
Unit tests for API/data logic.

Tests cover:
- Fetching game data
- Data formatting
- Basic validation of API responses

This demonstrates:
- Testing practices
- Logic isolation
- Reliability of data layer

---

## 📁 Real Project Structure

```

src/
├── components/
│   ├── GameCard/
│   │   └── GameCard.jsx
│   ├── SearchGame/
│   │   └── SearchGame.jsx
│   └── ui/
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── select.tsx
│       └── input_select.jsx
│
├── context/
│   └── FavoritesContext.jsx
│
├── lib/
│   ├── get_games.js
│   └── utils.ts
│
├── unitest/
│   └── get_games.test.js
│
├── App.jsx
├── App.css
├── main.jsx

```

---

## 🏆 Skills Demonstrated

This project demonstrates:

- React functional components
- React Context API for global state
- API integration and data fetching
- Component-based architecture
- Reusable UI component system
- Basic unit testing
- Modern build tooling with Vite
- Clean project structure

---

## 🚀 Future Improvements

Possible enhancements:

- Pagination for search results
- User authentication
- Persistent favorites using localStorage or backend
- Advanced filters (genre, platform, rating)
- Game details page
- Recommendation system

---
