import { faker } from '@faker-js/faker';
import {
    describe,
    it,
    expect,
    beforeAll,
    afterEach,
    jest,
} from '@jest/globals';
import db from '../../database/database';
import SkillService from '../../src/services/SkillService';

describe('Skill Service Integration', () => {
    const boatId = faker.string.uuid();
    const playerId = faker.number.int();
    const playerUuid = faker.string.uuid();
    beforeAll(() => {
        db().prepare('INSERT INTO boat VALUES(?, 10, 10, 0, 0)').run(boatId);
        db()
            .prepare('INSERT INTO player  VALUES(?, ?, ?, ?)')
            .run(playerId, playerUuid, boatId, faker.person.fullName());
        db()
            .prepare('INSERT INTO player_skills VALUES(?, ?, ?)')
            .run(playerId, 'FISH', 5);
    });

    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    });

    it('Get skill xp by key', async () => {
        const result = await SkillService.getSkillXP(playerId, 'FISH');
        expect(result).toEqual(5);
    });

    it('Add player XP', async () => {
        await SkillService.addXP(playerId, 'FISH', 5);
        const change = db()
            .prepare(
                'SELECT * FROM player_skills WHERE player_id = ? AND skill_key = ?',
            )
            .get(playerId, 'FISH');
        expect(change.xp).toEqual(10);
    });

    it('Get current level', async () => {
        const result = await SkillService.getCurrentLevel(10);
        expect(result).toEqual(2);
    });

    it('Get random skill', async () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.96);
        const result = await SkillService.getRandomSkill();
        expect(result).toEqual('REPAIR');
    });

    it('Get all skills', async () => {
        const result = await SkillService.getAllSkills();
        expect(result.length).toEqual(5);
    });
});
