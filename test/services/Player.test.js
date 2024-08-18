import { faker } from '@faker-js/faker';
import { describe, it, expect } from '@jest/globals';
import db from '../../database/database';
import PlayerService from '../../src/services/PlayerService';

describe('Player Service Integration', () => {
    it('Get player by id', async () => {
        const boatId = faker.string.uuid();
        db().prepare('INSERT INTO boat VALUES(?, 10, 10, 0, 0)').run(boatId);

        const playerId = faker.number.int();
        const playerUuid = faker.string.uuid();
        db()
            .prepare('INSERT INTO player VALUES(?,?,?,?)')
            .run(playerId, playerUuid, boatId, 'TEST_USER');

        const result = await PlayerService.getById(playerUuid, boatId);

        expect(result).toBeTruthy();
        expect(result.name).toEqual('TEST_USER');
    });

    it('Get all players on a boat', async () => {
        const boatId = faker.string.uuid();
        db().prepare('INSERT INTO boat VALUES(?, 10, 10, 0, 0)').run(boatId);

        db()
            .prepare('INSERT INTO player VALUES(?,?,?,?),(?,?,?,?)')
            .run(
                faker.number.int(),
                faker.string.uuid(),
                boatId,
                faker.person.fullName(),
                faker.number.int(),
                faker.string.uuid(),
                boatId,
                faker.person.fullName(),
            );
        const result = await PlayerService.getAllPlayersByBoat(boatId);
        expect(result.length).toEqual(2);
    });
});
