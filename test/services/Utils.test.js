import { describe, it, jest, afterEach, expect } from '@jest/globals';
import { chooseRandomRarity } from '../../src/services/Utils';
describe('Utils integration', () => {
    describe('Choose random rarity', () => {
        const rarities = {
            COMMON: 60,
            RARE: 20,
            UNUSUAL: 15,
            ODDITY: 5,
        };
        afterEach(() => {
            jest.spyOn(global.Math, 'random').mockRestore();
        });

        it('Return COMMON rarity', () => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0.6);
            const result = chooseRandomRarity(rarities);
            expect(result).toEqual('COMMON');
        });

        it('Return RARE rarity', () => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0.7);
            const result = chooseRandomRarity(rarities);
            expect(result).toEqual('RARE');
        });

        it('Return UNUSUAL rarity', () => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0.85);
            const result = chooseRandomRarity(rarities);
            expect(result).toEqual('UNUSUAL');
        });

        it('Return ODDITY rarity', () => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0.96);
            const result = chooseRandomRarity(rarities);
            expect(result).toEqual('ODDITY');
        });
    });
    it.todo('Test with modifiers');
});
