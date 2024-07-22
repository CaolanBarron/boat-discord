import db from '../../database/database.js';
import schedule from 'node-schedule';
import ItemService from './ItemService.js';
import { chooseRandomRarity, sqlPlaceholder } from './utils.js';

class EffectService {
    constructor() {
        this.rarityToEffectTranslation = {
            FISH: ['FISH_QUALITY'],
            TREASURE: ['TREASURE_QUALITY'],
            TRANSFORMATION: ['TRANSFORMATION_QUALITY'],
        };
        this.skillsToXPEffect = {
            FISH: ['FISH_XP'],
            SAIL: ['SAIL_XP'],
            RESEARCH: ['RESEARCH_XP'],
            CARTOGRAPHY: ['CARTOGRAPHY_XP'],
            REPAIR: ['REPAIR_XP'],
        };
    }
    getByKey(effectKey) {
        try {
            const effect = db()
                .prepare('SELECT * FROM effect WHERE key = ?')
                .get(effectKey);

            if (!effect) {
                throw new Error(`This key does not exist ${effectKey}`);
            }

            return effect;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async getPositiveWeightedRandom(skillModifier) {
        try {
            let effects;
            let loopChecker = 0;
            while (!effects || effects.length === 0) {
                loopChecker++;
                if (loopChecker > 10) {
                    throw new Error('Potential infinite loop');
                }
                const rarity = await chooseRandomRarity(
                    ItemService.rarities,
                    skillModifier,
                );
                effects = db()
                    .prepare(
                        'SELECT * FROM effect WHERE type = ? AND rarity = ?',
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
                    'SELECT * FROM boat_effect WHERE boat_id = ? AND effect_id = ?',
                )
                .get(guildId, effect_id);
            if (boatAlreadyEffected) return;
            // Apply the effect to The Boat
            db()
                .prepare('INSERT INTO boat_effect VALUES(?, ?)')
                .run(guildId, effect_id);

            const executeTime = Date.now() + 1_000_000;

            schedule.scheduleJob(
                `effect_${effect_id}_${guildId}`,
                executeTime,
                this.removeEffect.bind(this, guildId, effect_id),
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
                    `
                  SELECT * 
                  FROM boat_effect be 
                  JOIN effect e 
                  ON be.effect_id = e.id 
                  WHERE boat_id = ? AND effect_id = ?`,
                )
                .get(guildId, effectId);
            if (!effect) return `The ${effectId} effect is not in use`;

            db()
                .prepare(
                    'DELETE FROM boat_effect WHERE boat_id = ? AND effect_id  =?',
                )
                .run(guildId, effectId);

            return `The ${effect.name} effect has faded away from the boat...`;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async getRarityEffectModifier(boatId, rarityKey) {
        const effects = this.rarityToEffectTranslation[rarityKey];
        const stmt = db()
            .prepare(
                `
        SELECT * 
        FROM boat_effect be 
        JOIN effect e ON be.effect_id = e.id
        WHERE be.boat_id = ?
        AND e.key IN ${sqlPlaceholder(effects.length)}`,
            )
            .all(boatId, effects);

        let modifier = 0;

        if (stmt.find((f) => f.type === 'BUFF')) modifier += -2;
        if (stmt.find((f) => f.type === 'DEBUFF')) modifier += 2;

        return modifier;
    }

    async findBoatDebuffs(guildId) {
        try {
            const stmt = db()
                .prepare(
                    `
                  SELECT * 
                  FROM boat_effect 
                  JOIN effect ON boat_effect.effect_id = effect.id
                  WHERE boat_effect.boat_id = ? AND effect.type = ?
                `,
                )
                .all(guildId, 'DEBUFF');

            return stmt;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async getXPModifierByEffect(skillKey, playerId) {
        // Translate skill keys into effects
        const effects = this.skillsToXPEffect[skillKey];

        const boat = db()
            .prepare('SELECT boat_id FROM player WHERE id = ?')
            .get(playerId);

        const activeEffects = db()
            .prepare(
                `SELECT * FROM boat_effect be 
               JOIN effect e ON be.effect_id = e.id
               WHERE be.boat_id = ? 
               AND e.key IN ${sqlPlaceholder(effects.length)}`,
            )
            .all(boat.boat_id, effects);

        let modifier = 0;

        if (activeEffects.find((f) => f.type === 'BUFF')) modifier += 2;
        if (activeEffects.find((f) => f.type === 'DEBUFF')) modifier -= 2;

        return modifier;
    }
}
export default new EffectService();
