export default function NavBar() {
  return (
    <nav className="bg-gray-800 p-4 text-white shadow-lg">
      <ul className="flex items-center justify-between">
        
        <li className="flex items-center ">
          <i className="fa-brands fa-fantasy-flight-games text-3xl "></i>
          <a href="/" className="font-bold text-2xl">
            GameMatch
          </a>

          <a href="/home" className="hover:underline ml-9 mr-4">Home</a>
          <a href="/about" className="hover:underline">Favoris</a>
        </li>

        <li className="flex gap-4 items-center">

          <button className="cursor-pointer">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </li>

      </ul>
    </nav>
  )
}
