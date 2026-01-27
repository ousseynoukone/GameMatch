import "./App.css";
import Layout from "./components/layout/layout.jsx";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "./components/page/Home.jsx";
import GameDetail from "./components/page/GameDetail.jsx";
import Favoris from "./components/page/Favoris.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Navigate to="/home" replace />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/detail-jeu/:jeuId",
          element: <GameDetail />,
        },
        {
          path: "/about",
          element: <Favoris />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
