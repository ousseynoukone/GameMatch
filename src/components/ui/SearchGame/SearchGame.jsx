import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getGamesByName } from "@/lib/get_games";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchGameModal({ open, setOpen }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const game = await getGamesByName(searchTerm.trim());
      console.log(searchTerm);

      if (!game) {
        setError("No game found with this name.");
      } else {
        setOpen(false);
        navigate(`/detail-jeu/${game.id}`);
      }
    } catch (err) {
      setError("An error occurred while searching. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search a game</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter game name"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Searching..." : "Search"}
          </button>
          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
