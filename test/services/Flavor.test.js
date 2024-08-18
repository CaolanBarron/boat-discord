import { describe, it, jest, afterEach, expect } from '@jest/globals';
import { faker } from '@faker-js/faker';
import db from '../../database/database';
import FlavorService from '../../src/services/FlavorService.js';

describe('Flavor Service Integration', () => {
    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    });

    it('Player flavor', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.96);
        const player = {
            name: 'TEST_PLAYER',
        };
        const testContent = 'THIS_IS_TEST_CONTENT';
        const result = FlavorService.getPlayerFlavor(testContent, player);
        expect(result).toEqual(
            '**"THIS_IS_TEST_CONTENT"** TEST_PLAYER announces, to the surprise of no one.',
        );
    });

    it('Boat flavor', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

        const boatId = faker.string.uuid();
        db()
            .prepare('INSERT INTO boat VALUES (?, ?, ?, ?, ?)')
            .run(boatId, 10, 10, 10, 10);
        const result = FlavorService.getBoatFlavor(boatId);
        expect(result.content).toEqual('The ocean looks darker today...');
    });
});
