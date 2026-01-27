import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getGameById } from "@/lib/get_games";
import { useEffect, useState } from "react";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function SearchGameModal({ open, setOpen , gameId}) {

    const [game, setGame] = useState(null);


    useEffect( () => {
        if (gameId) {
            getGameById(gameId).then(setGame);
        }
    }, [gameId]);


  return (
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{game?.title ?? <Skeleton  />}</DialogTitle>
      <DialogDescription>
        {game?.description ?? <Skeleton count={1} />}
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>);
}




