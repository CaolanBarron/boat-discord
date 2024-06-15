import { SlashCommandBuilder } from 'discord.js';
import { stripIndent } from 'common-tags';

export default {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Display helpful information about the game')
        .addStringOption((option) =>
            option
                .setName('topic')
                .setDescription(
                    'Information about a particular part of the game '
                )
                .addChoices({ name: 'Activities', value: 'topic_activities' })
                .addChoices({ name: 'Events', value: 'topic_events' })
                .addChoices({ name: 'Items', value: 'topic_items' })
                .addChoices({ name: 'World', value: 'topic_world' })
                .addChoices({ name: 'The Boat', value: 'topic_boat' })
                .addChoices({ name: 'Fishing', value: 'topic_fishing' })
                .addChoices({ name: 'Cartography', value: 'topic_cartography' })
                .addChoices({ name: 'Repair', value: 'topic_repair' })
                .addChoices({ name: 'Research', value: 'topic_research' })
                .addChoices({ name: 'Sailing', value: 'topic_sailing' })
                .addChoices({ name: 'Salvage', value: 'topic_salvage' })
        ),
    async execute(interaction) {
        let message = 'This help message has not yet been written';
        switch (interaction.options.getString('topic')) {
            case 'topic_activities':
                message = stripIndent`
                    Activities are the main actions that a player will take over the course of a game. There are a number of activities:
                    - fish
                    - map
                    - repair
                    - research
                    - sail
                    
                    Activities take some time to complete, and when they do, they can reward the player with items, knowledge, or game-play effects.
                    
                    Activities reward experience in a skill related to that activity, which will aid in further activities or other parts of the game.
                    Most activities are limited to one player doing them at a time, and most cannot be done while the boat is sailing.
                    
                    If you would like more information on a specific activity, try the following command: \`/help activityname\`
`;
                break;
            case 'topic_events':
                message = stripIndent`
                    Events occur randomly while the game is running. They consist of a prompt with a number of options for how you may respond to the prompt. 
                    If a player does not respond to an event in a certain amount of time, it is automatically failed and skipped, sometimes with negative consequences.

                    Some responses will always succeed, some will always fail, and others will test the player on one of their skills to determine success.
                    Success will sometimes reward the players, and failure will sometimes punish the players.
                    Some events will be related to current activities on the ship.

                    Only one player may respond to an event; all further attempts will be ignored.`;
                break;
            case 'topic_items':
                message = stripIndent`
                    Items can be found through a variety of means, such as events or activities like fishing.
                    All players share one group inventory known as The Boat inventory; this can be viewed using the command \`/inventory\`.

                    Items can be inspected, used, or disposed of using the relevant command.
                    Some items are special or unique and cannot be easily disposed of, while others are used as resources, such as the "Winch" item for the \`/salvage\` command.

                    Items may be transformed or used in activities and events.`;
                break;
            case 'topic_world':
                message = stripIndent`
                    You don't know how you woke up on The Boat, and you have even less of an idea of where The Boat is. Maybe you were a bartender in your past life or an accountant; it hardly seems of importance right now.

                    You woke up alongside strangers seemingly in the same predicament, and you little choice but to trust them. 

                    The ocean stretches on as far as you can see. On the odd chance the fog ever clears up, you still spot no land, just a straight horizon. 
                    Every second thing makes no sense here: fish with gasoline instead of blood, unidentified creatures in the sky, the water, and phantom whispering on the deck at the turn of what can only be presumed to be midnight.

                    Left with no other choice, you must sail on. Explore this new world, study it, harness its unique properties, and perhaps you will find out what caused all of this, and leave.`;
                break;
            case 'topic_boat':
                message = stripIndent`
                    This is The Boat; you do not have any other option.

                    The Boat seems to be a small fisherman's boat, but without much of the equipment you would expect to find on such a vessel.
                    Instead, you have the following:  
                    - A fishing pole  
                    - Equipment for the rudimentary research of biological matter and minerals  
                    - Tools for repair and maintenance  
                    - A scattered array of cryptic documents and maps
                    - Equipment for effective sailing in this alien ocean
                `;
                break;
            case 'topic_fishing':
                message = stripIndent`
                    There is one fishing rod on The Boat and a whole lot of ocean.

                    The fishing activity can be started with the command \`/fish\`. 
                    This activity takes some time to complete, and when it does, the player can be rewarded with an item. 
                    This is often a fish, but you may also end up hooking something less conventional on occasion.

                    Successful completion of the fishing activity will grant you experience points towards your fishing skill. 
                    This will increase your ability to catch rarer and higher-quality fish and items.

                    Only one player can fish at one time, and you cannot fish while The Boat is sailing.  
                `;
                break;
            case 'topic_cartography':
                message = stripIndent`
                    Piles of barely legible documents. How much time have you got?

                    The cartography activity can be started with the command \`/map\`. 
                    This activity takes some time to complete, and when it does, the player can be rewarded with some information about the world around them. 
                    This could be the potential location of a unique biome or the rumored location of a sunken treasure.

                    Successful completion of the cartography activity will grant you experience points towards your cartography skill. 
                    This will increase your ability to discover rarer treasure.

                    Only one player can map at one time, and you cannot map while The Boat is sailing.  
                `;
                break;
            case 'topic_repair':
                message = stripIndent`
                    The engine barely runs, and we don't quite understand how.

                    The repair activity can be started with the command \`/repair\`. 
                    This activity takes some time to complete and rewards the players by either fixing a defect in The Boat or applying a random positive effect to The Boat.

                    Successful completion of the repair activity will grant you experience points towards your repair skill. 
                    This will allow you to apply rarer, more beneficial effects.

                    Only one player can repair at one time, and you cannot repair while The Boat is sailing.
                `;
                break;
            case 'topic_research':
                message = stripIndent`
                    Old physics notebooks may make for good burning. But surely there is something to learn here.

                    The research activity can be started with the command '\/research\'. 
                    The activity takes some time to complete and will return information to the player. If no argument is provided, then the result will be information about the surrounding environment.

                    The player also has the option of passing in the ID of an item in The Boat's inventory. 
                    This will return information about that item most of the time; however, there is also a small chance it will transform the item into a different item.

                    Successful completion of the research activity will grant you experience points towards your research skill. 
                    This will allow you to uncover more information and transform items into rarer items.

                    Only one player can research at one time, and you cannot research while The Boat is sailing.
                `;
                break;
            case 'topic_sailing':
                message = stripIndent`
                    There's no better way to get around! Not anymore.

                    The sailing activity can be started with the command \'/sailing\' followed by a direction: north, south, east, or west. 
                    The activity takes some time to complete, and when it does, The Boat will be in a new location.

                    This activity is different from others because multiple players can take part in it; they just need to use the \'/sailing\' command without a direction argument. 
                    Sailing will take less time for each player who is currently sailing.

                    Successful completion of the sailing activity will grant each player who took part in the activity experience points towards their sailing skill.
                `;
                break;
            case 'topic_salvage':
                message = stripIndent`
                    We must be careful with what comes up under the clutches of the salvage arm.

                    The salvage command allows you to search your current location for treasure. 
                    The salvage arm will descend into the depths via a winch and pluck anything that may be hidden in the depths.

                    The new ocean plays by strange rules, however, and the rope will not survive the trip. 
                    Each time the salvage command is used, a 'Winch' item is used from The Boat's inventory, and the command will not be able to be used if The Boat does not have a 'Winch'.
                `;
                break;
        }
        await interaction.reply({ content: message, ephemeral: true });
    },
};
