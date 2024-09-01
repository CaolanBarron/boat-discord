/* eslint-disable */
import {
    describe,
    it,
    jest,
    beforeAll,
    afterEach,
    expect,
} from '@jest/globals';
import ItemService from '../../src/services/ItemService';
import db from '../../database/database';
import { faker } from '@faker-js/faker';

describe('Item Service Integration', () => {
    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    });

    it('Random item by loot tag', async () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.6);
        const result = await ItemService.randomItemByLootTag('FISH');
        expect(result.item_key).toEqual('LONG_SNOUTED_SEAHORSE');
    });

    it('Add to inventory', async () => {
        const boatId = faker.string.uuid();
        db().prepare('INSERT INTO boat VALUES(?, 10, 10, 0, 0)').run(boatId);

        const playerId = faker.number.int();
        db()
            .prepare('INSERT INTO player VALUES(?, ?, ?, ?)')
            .run(playerId, faker.string.uuid(), boatId, 'Add item tester');

        await ItemService.addToInventory(boatId, 'TROUT', playerId);
        const result = db()
            .prepare(
                'SELECT * FROM boat_inventory WHERE boat_id = ? AND item_key = ?',
            )
            .get(boatId, 'TROUT');
        expect(result).not.toBeUndefined();
    });

    it('Display empty inventory', async () => {
        const boatId = faker.string.uuid();
        db().prepare('INSERT INTO boat VALUES(?, 10, 10, 0, 0)').run(boatId);

        const result = await ItemService.displayInventory(boatId);
        expect(result.data.description).toEqual(
            'The Boats inventory is currently empty.',
        );
    });

    it('Display inventory', async () => {
        const boatId = faker.string.uuid();
        db().prepare('INSERT INTO boat VALUES(?, 10, 10, 0, 0)').run(boatId);

        db()
            .prepare(
                'INSERT INTO boat_inventory (boat_id, item_key) VALUES (?, ?)',
            )
            .run(boatId, 'BOOT');

        const result = await ItemService.displayInventory(boatId);
        expect(result.data.description.includes('Boot')).toBeTruthy();
    });

    it('Get Item Info ', async () => {
        const result = await ItemService.itemInfo('BOOT');
        expect(result).toEqual('Size 10 UK');
    });

    it('Get Item Description', async () => {
        const boatId = faker.string.uuid();
        db().prepare('INSERT INTO boat VALUES(?, 10, 10, 0, 0)').run(boatId);

        db()
            .prepare(
                'INSERT INTO boat_inventory (boat_id, item_key) VALUES (?, ?)',
            )
            .run(boatId, 'BOOT');
        const inventoryId = db()
            .prepare(
                'SELECT id FROM boat_inventory WHERE boat_id = ? AND item_key = ?',
            )
            .get(boatId, 'BOOT');
        const result = await ItemService.inspectItem(boatId, inventoryId.id);
        expect(result.content).toEqual(`This is a boot`);
        expect(result.ephemeral).toBeFalsy();
    });

    it('Dispose of item', async () => {
        const boatId = faker.string.uuid();
        db().prepare('INSERT INTO boat VALUES(?, 10, 10, 0, 0)').run(boatId);

        db()
            .prepare(
                'INSERT INTO boat_inventory (boat_id, item_key) VALUES (?, ?)',
            )
            .run(boatId, 'BOOT');
        const inventoryId = db()
            .prepare(
                'SELECT id FROM boat_inventory WHERE boat_id = ? AND item_key = ?',
            )
            .get(boatId, 'BOOT');
        const result = await ItemService.disposeItem(boatId, inventoryId.id);
        expect(result.content).toEqual('The Boot has been disposed of.');
        expect(result.ephemeral).toBeFalsy();
        const afterCheck = db()
            .prepare(
                'SELECT id FROM boat_inventory WHERE boat_id = ? AND item_key = ?',
            )
            .get(boatId, 'BOOT');
        expect(afterCheck).toBeUndefined();
    });
});
