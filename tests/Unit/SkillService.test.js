import SkillService from '../../services/SkillService';

describe('Current level', () => {
    it('Test 0', async () => {
        const level = await SkillService.getCurrentLevel(0);
        expect(level).toEqual(1);
    });

    it('test pre level 2', async () => {
        const level = await SkillService.getCurrentLevel(4);
        expect(level).toEqual(1);
    });

    it('test initial level 2', async () => {
        const level = await SkillService.getCurrentLevel(5);
        expect(level).toEqual(2);
    });
});

describe('XP to next level', () => {
    it('Between 1 & 2', async () => {
        const xpAmount = await SkillService.experienceForNextLevel(1);
        expect(xpAmount).toEqual(5);
    });

    it('Between 2 & 3', async () => {
        const xpAmount = await SkillService.experienceForNextLevel(2);
        expect(xpAmount).toEqual(20);
    });
    it('Between 3 & 4', async () => {
        const xpAmount = await SkillService.experienceForNextLevel(3);
        expect(xpAmount).toEqual(45);
    });
});
