export const prompts = [
    {
        content: 'The engine has suddenly stopped working',
        actions: [
            {
                content: 'Attempt to fix it',
                challenge_skill: 'REPAIR',
                challenge_value: 3,
                outcomes: [
                    {
                        content: 'The boat is fixed! and improved...',
                        outcomeType: 'SUCCESS',
                        effectId: 1,
                    },
                    {
                        content: 'Well that could have gone better...',
                        outcomeType: 'FAILURE',
                        effectId: 2,
                    },
                ],
            },
            {
                content: 'Ignore it and hope',
                challenge_skill: null,
                challenge_value: null,
                outcomes: [
                    {
                        content: 'The engine only gets worse...',
                        outcomeType: 'FAILURE',
                        effectId: null,
                    },
                ],
            },
            {
                content: 'Study the algae growing on it',
                challenge_skill: 'RESEARCH',
                challenge_value: 6,
                outcomes: [
                    {
                        content:
                            'Perhaps a the unique biological makeup of this strange algae could be used to enhance the engine...',
                        outcomeType: 'SUCCESS',
                        effectId: 1,
                    },
                    {
                        content: 'The algae grows thicker...',
                        outcomeType: 'FAILURE',
                        effectId: 2,
                    },
                ],
            },
        ],
    },
    {
        content: 'A mermaid has been sighted overboard',
        actions: [
            {
                content: 'Take as many notes as you can',
                challenge_skill: 'RESEARCH',
                challenge_value: 6,
                outcomes: [
                    {
                        content: 'This information could prove invaluable...',
                        outcomeType: 'SUCCESS',
                        effectId: 3,
                    },
                    {
                        content: `She doesn't like being looked at...`,
                        outcomeType: 'FAILURE',
                        effectId: 4,
                    },
                ],
            },
            {
                content: 'Turn a blind eye to the creature',
                challenge_skill: null,
                challenge_value: null,
                outcomes: [
                    {
                        content:
                            'The privacy is respectful, When you turn around she is gone...',
                        outcomeType: 'SUCCESS',
                        effectId: null,
                    },
                ],
            },
            {
                content: 'Reach out and help her',
                challenge_skill: null,
                challenge_value: null,
                outcomes: [
                    {
                        content: 'You do not belong in her world...',
                        outcomeType: 'FAILURE',
                        effectId: 4,
                    },
                ],
            },
        ],
    },
    {
        content: 'A strange figure appears on The Boat',
        actions: [
            {
                content: 'Step towards them',
                challenge_skill: null,
                challenge_value: null,
                outcomes: [
                    {
                        content:
                            'A flash of light and a warm feeling... Some just need to be guided to a material place',
                        outcomeType: 'SUCCESS',
                        effectId: 6,
                    },
                ],
            },
            {
                content: 'Find a spot and hide',
                challenge_skill: null,
                challenge_value: null,
                outcomes: [
                    {
                        content:
                            'A dark shadow descends over The Boat... Ignoring problems is not always wise...',
                        outcomeType: 'FAILURE',
                        effectId: 7,
                    },
                ],
            },
        ],
    },
];
