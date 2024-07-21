import ItemService from '../services/ItemService.js';
import {
    IncreaseXpBoatRandomUse,
    IncreaseXpPlayerAllUse,
    IncreaseXpPlayerRandomUse,
    IncreaseXpBoatAllUse,
    RepairOneUse,
    RepairAllUse,
    IncreaseSpeedUse,
} from './uses.js';

export default class Item {
    id;
    key;
    name;
    description;
    info;
    consumable;
    useDescription;

    uses = [];

    constructor(itemInfo, itemUses) {
        this.id = itemInfo.id;
        this.key = itemInfo.key;
        this.name = itemInfo.name;
        this.description = itemInfo.description;
        this.info = itemInfo.info;
        this.consumable = itemInfo.consumable;
        this.useDescription = itemInfo.use_description;

        for (const itemUse of itemUses) {
            switch (itemUse.use_key) {
                case 'INC_XP_PLAYER_RANDOM':
                    this.uses.push(
                        new IncreaseXpPlayerRandomUse(itemUse.variable)
                    );
                    break;
                case 'INC_XP_PLAYER_ALL':
                    this.uses.push(
                        new IncreaseXpPlayerAllUse(itemUse.variable)
                    );
                    break;
                case 'INC_XP_BOAT_RANDOM':
                    this.uses.push(
                        new IncreaseXpBoatRandomUse(itemUse.variable)
                    );
                    break;
                case 'INC_XP_BOAT_ALL':
                    this.uses.push(new IncreaseXpBoatAllUse(itemUse.variable));
                    break;
                case 'REPAIR_ONE':
                    this.uses.push(new RepairOneUse(itemUses.variable));
                    break;
                case 'REPAIR_ALL':
                    this.uses.push(new RepairAllUse(itemUse.variable));
                    break;
                case 'INC_SPEED':
                    this.uses.push(new IncreaseSpeedUse(itemUse.variable));
            }
        }
    }

    async use(player) {
        for (const itemUse of this.uses) {
            await itemUse.use(player);
        }
        if (this.consumable) {
            await ItemService.disposeItem(player.boat_id, this.id);
        }
    }
}
