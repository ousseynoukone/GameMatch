import { getGames } from "@/lib/get_games";
import { InputSelect } from "../ui/input_select";

import { useEffect, useState } from "react";

export default function Home() {

    const [selectedPlatform,setSelectedPlatform] = useState(null);
    const [selectedGenre,setSelectedGenre] = useState(null);

    const [games,setGames] = useState([]);

    const platformOptions = [
        { value: "pc", label: "PC" },
        { value: "playstation", label: "PlayStation" },
        { value: "xbox", label: "Xbox" },
        { value: "nintendo", label: "Nintendo Switch" }
    ];

    const genreOptions = [
        { value: "action", label: "Action" },
        { value: "adventure", label: "Adventure" },
        { value: "rpg", label: "RPG" },
        { value: "strategy", label: "Strategy" }
    ];

    useEffect(() => {
        const fetchGames = async () => {
            let games = await getGames(0);
            setGames(games);
            console.log("Fetched games:", games);
        };
        fetchGames();
    }, [selectedPlatform, selectedGenre]);


    




  return (
    <div className="p-4 flex gap-8">

      <div className="flex gap-3 items-baseline mb-6">
        <h1 className="text-1xl font-medium">Platform: </h1>
        <InputSelect selectLabel="Platform" selectItems={platformOptions} placeholder="Select a platform " onValueChange={setSelectedPlatform}/>
      </div>

      <div className="flex gap-3 items-baseline mb-6">
        <h1 className="text-1xl font-medium">Genre: </h1>
        <InputSelect selectLabel="Genre" selectItems={genreOptions} placeholder="Select a genre" onValueChange={setSelectedGenre}/>
      </div>

    </div>
  )
}