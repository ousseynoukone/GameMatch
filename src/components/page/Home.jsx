import { getGames } from "@/lib/get_games";
import { InputSelect } from "../ui/input_select";
import { useEffect, useState } from "react";
import GameCard from "../ui/GameCard/GameCard";


export default function Home() {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const [games, setGames] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const [loading, setLoading] = useState(false);

  const platformOptions = [
    { value: "pc", label: "PC" },
    { value: "playstation", label: "PlayStation" },
    { value: "xbox", label: "Xbox" },
    { value: "nintendo", label: "Nintendo Switch" },
  ];

  const genreOptions = [
    { value: "action", label: "Action" },
    { value: "adventure", label: "Adventure" },
    { value: "rpg", label: "RPG" },
    { value: "strategy", label: "Strategy" },
  ];

  useEffect(() => {
    const fetchGames = async () => {
      if (loading) return;

      setLoading(true);

      const newGames = await getGames(startIndex,selectedGenre ? [selectedGenre] : [], selectedPlatform);

      console.log(newGames);

      setGames(prevGames => { if(JSON.stringify(prevGames) === JSON.stringify(newGames)) return prevGames; else return [...prevGames, ...newGames] });

      setLoading(false);
    };

    fetchGames();
  }, [startIndex, selectedPlatform, selectedGenre]);

  useEffect(() => {
    setGames([]);
    setStartIndex(0);

  }, [selectedPlatform, selectedGenre]);




  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= fullHeight - 100) {
          setStartIndex((prev) => prev + 20); 
        }
      }, 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div>
      <div className="p-4 flex gap-8">
        <div className="flex gap-3 items-baseline mb-6">
          <h1 className="text-1xl font-medium">Platform:</h1>

          <InputSelect
            selectLabel="Platform"
            selectItems={platformOptions}
            placeholder="Select a platform"
            onValueChange={setSelectedPlatform}
          />
        </div>

        <div className="flex gap-3 items-baseline mb-6">
          <h1 className="text-1xl font-medium">Genre:</h1>

          <InputSelect
            selectLabel="Genre"
            selectItems={genreOptions}
            placeholder="Select a genre"
            onValueChange={setSelectedGenre}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 p-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {loading && (
        <p className="text-center p-4 text-gray-500">
          Loading more games...
        </p>
      )}
    </div>
  );
}
