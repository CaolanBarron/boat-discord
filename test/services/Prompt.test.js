import { describe, it, expect, afterEach, jest } from '@jest/globals';
import PromptService from '../../src/services/PromptService';

describe('Prompt Service Integration', () => {
    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    });
    it('Get Random Prompt', async () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
        const result = await PromptService.getRandomPrompt();

        expect(result.embeds[0].data.description).toEqual(
            'The engine has suddenly stopped working',
        );
    });
    // it('Get Random Prompt with Tag', async () => {
    //     jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
    //     const result = await PromptService.getRandomPrompt();
    //
    //     expect(result.embeds[0].data.description).toEqual(
    //         'The engine has suddenly stopped working',
    //     );
    // });
    it.todo('Choose prompt');
});
