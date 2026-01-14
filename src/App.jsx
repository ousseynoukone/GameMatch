import './App.css'
import Layout from './components/layout/layout.jsx'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Home from './components/page/Home.jsx'

function App() {

  const router = createBrowserRouter(

    [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,            
            element: <Navigate to="/home" replace />
          },
          {
            path: "/home",
            element: <Home/>,
          },

          // {
          //   path: "/detail-jeu/:jeuId",
          //   element: <Home/>,
          // },
        ]
      }
    ]
  )
  return <RouterProvider router={router} />
}

export default App
