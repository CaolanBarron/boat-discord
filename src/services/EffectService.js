import db from '../../database/database.js';
import schedule from 'node-schedule';
import ItemService from './ItemService.js';
import SkillService from './SkillService.js';
import chooseRandomRarity from './utils.js';

class EffectService {
    getByKey(effectKey) {
        try {
            const effect = db()
                .prepare('SELECT * FROM effect WHERE key = ?')
                .get(effectKey);

            if (!effect)
                throw new Error(`This key does not exist ${effectKey}`);

            return effect;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async getPositiveWeightedRandom(skillModifier) {
        try {
            let effects;
            while (!effects || effects.length === 0) {
                const rarity = await chooseRandomRarity(
                    ItemService.rarities,
                    skillModifier
                );
                effects = db()
                    .prepare(
                        `SELECT * FROM effect WHERE effect_type = ? AND rarity = ?`
                    )
                    .all('BUFF', rarity);
            }

            return effects[Math.floor(Math.random() * effects.length)];
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async applyEffect(guildId, effect_id) {
        try {
            // Get the effect
            // Exit if the effect is already applied
            const boatAlreadyEffected = db()
                .prepare(
                    'SELECT * FROM boat_effect WHERE boat_id = ? AND effect_id = ?'
                )
                .get(guildId, effect_id);
            if (boatAlreadyEffected) return;
            // Apply the effect to The Boat
            db()
                .prepare('INSERT INTO boat_effect VALUES(?, ?)')
                .run(guildId, effect_id);
            // TODO: Schedule effect expiration
            const executeTime = Date.now() + 10_000;
            schedule.scheduleJob(
                `effect_${effect_id}_${guildId}`,
                executeTime,
                this.removeEffect.bind(this, guildId, effect_id)
            );
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async removeEffect(guildId, effectId) {
        try {
            const effect = db()
                .prepare(
                    `SELECT * 
        FROM boat_effect be 
        JOIN effect e 
        ON be.effect_id = e.id 
        WHERE boat_id = ? AND effect_id = ?`
                )
                .get(guildId, effectId);
            if (!effect) return `The ${effectId} effect is not in use`;

            db()
                .prepare(
                    'DELETE FROM boat_effect WHERE boat_id = ? AND effect_id  =?'
                )
                .run(guildId, effectId);

            return `The ${effect.name} effect has faded away from the boat...`;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async findBoatDebuffs(guildId) {
        try {
            const stmt = db()
                .prepare(
                    `
                SELECT * 
                FROM boat_effect 
                JOIN effect ON boat_effect.effect_id = effect.id
                WHERE boat_effect.boat_id = ? AND effect.effect_type = ?
                `
                )
                .all(guildId, 'DEBUFF');

            return stmt;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}
export default new EffectService();
