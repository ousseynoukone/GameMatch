import { Outlet } from 'react-router-dom';
import NavBar from './navbar.jsx';
export default function Layout() {
  return (
    <div className="min-h-screen">
      <NavBar > </NavBar>
    
      <Outlet />
    </div>
  )
}