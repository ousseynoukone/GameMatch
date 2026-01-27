import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getGamesByString } from "@/lib/get_games";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import GameCard from "../GameCard/GameCard";

export default function SearchGameModal({ open, setOpen }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [games, setGames] = useState([]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setGames([]);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    getGamesByString(searchTerm.trim()).then((result) => {
      if (!result || result.length === 0) {
        setGames([]);
        setError("No game found with this name.");
      } else {
        setGames(result);
        setError(null);
      }
      setLoading(false);
    });
  }, [searchTerm]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="
          w-[90vw]
          h-[90vh]
          max-w-[90vw]
          max-h-[90vh]
          overflow-y-auto
        "
      >
        <DialogHeader>
          <DialogTitle>Search a game</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter game name"
            className="
              w-full rounded-md border border-gray-300
              px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          />
        </div>

        <div className="mt-4">
          {loading ? (
            <Skeleton count={4} height={80} className="mt-2" />
          ) : (
            <div
              className="
                h-[60vh]
                overflow-y-auto
                rounded-md 
                bg-background text-foreground
                p-4
              "
            >
              {games.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {games.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      onClick={() => setOpen(false)}
                    />
                  ))}
                </div>
              ) : (
                searchTerm.trim() &&
                !error && (
                  <p className="text-sm text-gray-500">
                    No results.
                  </p>
                )
              )}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
