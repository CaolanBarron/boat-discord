import db from '../../database/database.js';

class EffectService {
    getByKey(effectKey) {
        try {
            const effect = db()
                .prepare('SELECT * FROM effect WHERE key = ?')
                .get(effectKey);

            if (!effect)
                throw new Error(`This key does not exist ${effectKey}`);

            return effect;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

export default new EffectService();
