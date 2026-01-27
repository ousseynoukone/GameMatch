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
    { value: "browser", label: "Browser" },
    { value: "all", label: "All Platforms" },
  ];

    const genreOptions = [
    { value: "mmorpg", label: "MMORPG" },
    { value: "shooter", label: "Shooter" },
    { value: "strategy", label: "Strategy" },
    { value: "moba", label: "MOBA" },
    { value: "racing", label: "Racing" },
    { value: "sports", label: "Sports" },
    { value: "social", label: "Social" },
    { value: "sandbox", label: "Sandbox" },
    { value: "open_world", label: "Open World" },
    { value: "survival", label: "Survival" },
    { value: "pvp", label: "PvP" },
    { value: "pve", label: "PvE" },
    { value: "pixel", label: "Pixel" },
    { value: "voxel", label: "Voxel" },
    { value: "zombie", label: "Zombie" },
    { value: "turn_based", label: "Turn-Based" },
    { value: "first_person", label: "First-Person" },
    { value: "third_person", label: "Third-Person" },
    { value: "top_down", label: "Top-Down" },
    { value: "tank", label: "Tank" },
    { value: "space", label: "Space" },
    { value: "sailing", label: "Sailing" },
    { value: "side_scroller", label: "Side-Scroller" },
    { value: "superhero", label: "Superhero" },
    { value: "permadeath", label: "Permadeath" },
    { value: "card", label: "Card" },
    { value: "battle_royale", label: "Battle Royale" },
    { value: "mmo", label: "MMO" },
    { value: "mmofps", label: "MMOFPS" },
    { value: "mmotps", label: "MMOTPS" },
    { value: "3d", label: "3D" },
    { value: "2d", label: "2D" },
    { value: "anime", label: "Anime" },
    { value: "fantasy", label: "Fantasy" },
    { value: "sci_fi", label: "Sci-Fi" },
    { value: "fighting", label: "Fighting" },
    { value: "action_rpg", label: "Action RPG" },
    { value: "action", label: "Action" },
    { value: "military", label: "Military" },
    { value: "martial_arts", label: "Martial Arts" },
    { value: "flight", label: "Flight" },
    { value: "low_spec", label: "Low Spec" },
    { value: "tower_defense", label: "Tower Defense" },
    { value: "horror", label: "Horror" },
    { value: "mmorts", label: "MMORTS" }
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
