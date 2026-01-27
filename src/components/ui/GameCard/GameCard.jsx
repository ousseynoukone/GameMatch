import React from "react";
import SearchGameModal from '../SearchGame/SearchGame';
import { useState } from "react";
export default function GameCard({game}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <> 
        <div onClick={() => setIsModalOpen(true)} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300" >    
            <img src={game.thumbnail} alt={game.title} className="w-full h-48 object-cover"/>
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{game.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{game.short_description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{game.genre}</span>
                    <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">{game.platform}</span>
                </div>
            </div>
        </div>
        <SearchGameModal open={isModalOpen} setOpen={setIsModalOpen} game={game} />

        </>
    );
}