import { useState } from "react";
import { Link } from "react-router-dom";
import SearchGameModal from "../ui/SearchGame/SearchGame.jsx";

export default function NavBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 text-white shadow-lg">
      <ul className="flex items-center justify-between">
        <li className="flex items-center ">
          <i className="fa-brands fa-fantasy-flight-games text-3xl "></i>
          <Link to="/" className="font-bold text-2xl">
            GameMatch
          </Link>

          <Link to="/home" className="hover:underline ml-9 mr-4">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            Favoris
          </Link>
        </li>

        <li className="flex gap-4 items-center">
          <button
            className="cursor-pointer"
            type="button"
            onClick={() => setIsSearchOpen(true)}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </li>
      </ul>

      <SearchGameModal open={isSearchOpen} setOpen={setIsSearchOpen} />
    </nav>
  );
}
