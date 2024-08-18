import { describe, it, afterAll, beforeEach, expect } from '@jest/globals';
import { faker } from '@faker-js/faker';
import db from '../../database/database';
import BoatService from '../../src/services/BoatService';
import GameEventService from '../../src/services/GameEventService';
import { uuid } from 'drizzle-orm/pg-core';

describe('Boat Service Integration', () => {
    afterAll(() => {
        GameEventService.scheduler.stop();
    });

    it('Create boat', async () => {
        await BoatService.create('123456789', 10, 10, 0, 0);
        const boat = db()
            .prepare('SELECT * FROM boat WHERE id = ?')
            .get('123456789');
        expect(boat).not.toBeUndefined();
    });

    it('Delete boat', async () => {
        const boatId = faker.string.uuid();
        db()
            .prepare('INSERT INTO boat VALUES (?, ?, ?, ?, ?)')
            .run(boatId, 10, 10, 10, 10);
        await BoatService.delete(boatId);
        const result = db()
            .prepare('SELECT * FROM boat WHERE id = ?')
            .get(boatId);
        expect(result).toBeUndefined();
    });

    it.todo('introductionNarrativeMessage');

    it.todo('introductionGameplayMessage');

    describe('Sail function', () => {
        let currentBoatId;
        beforeEach(() => {
            currentBoatId = faker.string.uuid();
            db()
                .prepare('INSERT INTO boat VALUES (?, ?, ?, ?, ?)')
                .run(currentBoatId, 10, 10, 0, 0);
        });
        it('Sail North', () => {
            BoatService.sail(currentBoatId, 'NORTH_SAILING');
            const updatedCoords = db()
                .prepare('SELECT x_coord, y_coord FROM boat WHERE id = ?')
                .get(currentBoatId);
            expect(updatedCoords.x_coord).toBe(0);
            expect(updatedCoords.y_coord).toBe(1);
        });
        it('Sail East', () => {
            BoatService.sail(currentBoatId, 'EAST_SAILING');
            const updatedCoords = db()
                .prepare('SELECT x_coord, y_coord FROM boat WHERE id = ?')
                .get(currentBoatId);
            expect(updatedCoords.x_coord).toBe(1);
            expect(updatedCoords.y_coord).toBe(0);
        });
        it('Sail South', () => {
            BoatService.sail(currentBoatId, 'SOUTH_SAILING');
            const updatedCoords = db()
                .prepare('SELECT x_coord, y_coord FROM boat WHERE id = ?')
                .get(currentBoatId);
            expect(updatedCoords.x_coord).toBe(0);
            expect(updatedCoords.y_coord).toBe(-1);
        });
        it('Sail West', () => {
            BoatService.sail(currentBoatId, 'WEST_SAILING');
            const updatedCoords = db()
                .prepare('SELECT x_coord, y_coord FROM boat WHERE id = ?')
                .get(currentBoatId);
            expect(updatedCoords.x_coord).toBe(-1);
            expect(updatedCoords.y_coord).toBe(0);
        });
    });

    it('Current biome', () => {
        const currentBoatId = faker.string.uuid();
        db()
            .prepare('INSERT INTO boat VALUES (?, ?, ?, ?, ?)')
            .run(currentBoatId, 10, 10, 2, 2);

        const result = BoatService.currentBiome(currentBoatId);
        expect(result.biome_key).toEqual('SWAMP');
    });

    it('No biome', () => {
        const currentBoatId = faker.string.uuid();
        db()
            .prepare('INSERT INTO boat VALUES (?, ?, ?, ?, ?)')
            .run(currentBoatId, 10, 10, 0, 0);

        const result = BoatService.currentBiome(currentBoatId);
        expect(result).toBeUndefined();
    });
});
