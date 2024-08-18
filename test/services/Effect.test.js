import { describe, it, expect } from '@jest/globals';
import EffectService from '../../src/services/EffectService.js';

describe('Effect Service Integration', () => {
    it('Get effect by key', () => {
        const result = EffectService.getByKey('FISH_QUALITY');
        expect(result).toContainKeys(['key', 'name', 'description']);
        expect(result.name).toEqual('Fish Quality Improved');
    });
});
