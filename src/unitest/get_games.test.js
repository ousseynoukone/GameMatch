import { describe, it, expect } from 'vitest';

describe('getGames', () => {
    it("should return 20 games", async () => {
        const { getGames } = await import('../lib/get_games.js');
        const games = await getGames(0);
        expect(games).toHaveLength(20);
    });
}
);
