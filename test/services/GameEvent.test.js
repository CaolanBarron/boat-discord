import { describe, it, beforeAll, afterEach, expect } from '@jest/globals';
import db from '../../database/database';
import GameEventService from '../../src/services/GameEventService';
import { faker } from '@faker-js/faker';

describe('Game Event Service Integration', () => {
    beforeAll(() => {
        db()
            .prepare(
                'INSERT INTO boat VALUES(?, 10, 10, 0, 0), (? , 10, 10, 0, 0)',
            )
            .run(faker.string.uuid(), faker.string.uuid());
    });

    afterEach(() => {
        const jobIds = GameEventService.scheduler.getAllJobs().map((b) => b.id);
        jobIds.forEach((id) => {
            GameEventService.scheduler.removeById(id);
        });
    });

    it('Flavor Intervals', async () => {
        const boats = db()
            .prepare('SELECT * FROM boat')
            .all()
            .map((b) => {
                return b.id;
            });
        await GameEventService.startFlavorIntervals(boats);

        expect(GameEventService.scheduler.getAllJobs().length).toEqual(
            boats.length,
        );
    });

    it('Prompt Intervals', async () => {
        const boats = db()
            .prepare('SELECT * FROM boat')
            .all()
            .map((b) => {
                return b.id;
            });
        await GameEventService.startPromptIntervals(boats);

        expect(GameEventService.scheduler.getAllJobs().length).toEqual(
            boats.length,
        );
    });

    it('Treasure Shuffle Intervals', async () => {
        const boats = db()
            .prepare('SELECT * FROM boat')
            .all()
            .map((b) => {
                return b.id;
            });
        await GameEventService.startTreasureShufflesIntervals(boats);

        expect(GameEventService.scheduler.getAllJobs().length).toEqual(
            boats.length,
        );
    });
});
