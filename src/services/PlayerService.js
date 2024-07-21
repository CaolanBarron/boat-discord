import db from '../../database/database.js';

class PlayerService {
    async getById(playerId, guildId) {
        try {
            const character = db().prepare(
                'SELECT * FROM character WHERE user_id = ? AND boat_id = ?'.get(
                    playerId,
                    guildId
                )
            );
            if (!character)
                throw new Error(
                    `This player could not be found: ${playerId}, ${guildId}`
                );

            return character;
        } catch (error) {
            console.error(error);
        }
    }
    async getAllPlayersByBoat(boatId) {
        return db()
            .prepare('SELECT * FROM player WHERE boat_id = ?')
            .all(boatId);
    }
}

export default new PlayerService();
