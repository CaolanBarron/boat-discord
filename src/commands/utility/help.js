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
                .addChoices({ name: 'events', value: 'topic_events' })
                .addChoices({ name: 'items', value: 'topic_items' })
                .addChoices({ name: 'world', value: 'topic_world' })
                .addChoices({ name: 'world', value: 'topic_world' })
                .addChoices({ name: 'the boat', value: 'topic_boat' })
                .addChoices({ name: 'fishing', value: 'topic_fishing' })
                .addChoices({ name: 'cartography', value: 'topic_cartography' })
                .addChoices({ name: 'repair', value: 'topic_repair' })
                .addChoices({ name: 'research', value: 'topic_research' })
                .addChoices({ name: 'sailing', value: 'topic_sailing' })
                .addChoices({ name: 'salvage', value: 'topic_salvage' })
        ),
    async execute(interaction) {
        let message = 'This help message has not yet been written';
        switch (interaction.options.getString('topic')) {
            case 'topic_activities':
                message = stripIndent`
                    Activities are the main action that a player will take over the course of a game. There are a number of activities:
                    - fish
                    - map
                    - repair
                    - research
                    - sail
                    
                    Activities take some amount of time to complete and when they do they can reward the player with items, knowledge or game play effects.
                    
                    Activities reward experience in a skill related to that activity which will aid in further activities or other parts of the game
                    Most activities are limited to one player doing them at a time and most cannot be done while the boat is sailing.
                    
                    If you would like more information on a specific activity try the following command: \`/help activityname\`
`;
                break;
            case 'topic_events':
                message = stripIndent`
                    Events occur randomly while the game is running. They consist of a prompt with a number of options in how you may respond to the prompt. 
                    If a player does not respond to an event in a certain amount of time it is automatically failed and skipped, sometimes with negative consequences.

                    Some responses will always succeed, some will always fail and other will test the player on one of their skills to determine success.
                    Success will sometimes reward the players and failure will sometimes punish the players.
                    Some events will be related to current on goings on the ship such as activities.

                    Only one player may respond to an event all further attempts will be ignored.`;
                break;
            case 'topic_items':
                message = stripIndent`
                    Items can be found through a variety of means such as events or activities like fishing.
                    All players share one group inventory known as The Boat inventory; this can be viewed using the command \`/inventory\`.

                    Items can be inspected, used or disposed of using the relevant command.
                    Some items are special or unique and cannot be so easily disposed of and others are used as a resource such as the "Winch" item for the \`/salvage\` command.

                    Items may be transformed or used in activities and events.`;
                break;
            case 'topic_world':
                message = stripIndent`
                    You don't know how you woke up on The Boat and you have even less of an idea on where The Boat is. Maybe you were a bartender in your past life or an accountant it hardly seems of importance right now.

                    You woke up alongside strangers seemingly in the same predicament and you little other choice than to trust them. 

                    Ocean stretches on as far as you can see. In the odd chance the fog ever clears up you still spot no land just a straight horizon. 
                    Every second thing makes no sense here: Fish with gasoline instead of blood, unidentified creatures in the sky as well as the water and phantom whispering on the deck at the turn of what can only be presumed to be midnight.

                    Left with no other choice you must sail on. Explore this new world, study it, harness its unique properties and perhaps you may find out what caused all of this, and leave.`;
                break;
            case 'topic_boat':
                break;
            case 'topic_fishing':
                break;
            case 'topic_cartography':
                break;
            case 'topic_repair':
                break;
            case 'topic_research':
                break;
            case 'topic_sailing':
                break;
            case 'topic_salvage':
                break;
        }
        await interaction.reply({ content: message, ephemeral: true });
    },
};
