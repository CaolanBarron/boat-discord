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
    {
        content:
            'A bolt of lightning strikes the Boat leaving a strange symbol',
        tagKey: 'STORM',
        actions: [
            {
                content: 'Take notes and sketches of the symbol',
                challenge_skill: null,
                challenge_value: null,
                outcomes: [
                    {
                        content:
                            'You successfully document the symbol... within moments the symbol fades away',
                        outcomeType: 'SUCCESS',
                        effectId: null,
                    },
                ],
            },
            {
                content: 'Touch the symbol',
                challenge_skill: null,
                challenge_value: null,
                outcomes: [
                    {
                        content:
                            'You feel a sudden jolt of pain as electricity shoots through your arm, when you recover the symbol is gone and you cannot remember what it looks like.',
                        outcomeType: 'Failure',
                        effectId: null,
                    },
                ],
            },
        ],
    },
    {
        content:
            'The water around the Boat suddenly becomes a pitch black perfect circle, that follows the vessel seamlessly',
        tagKey: 'VOID',
        actions: [
            {
                content:
                    'Steer the boat slowly toward the edge of the black circle to investigate it calmly',
                challenge_skill: null,
                challenge_value: null,
                outcomes: [
                    {
                        content:
                            'The black circle ripples harmlessly, and a strange glowing fish leaps aboard, providing a soft light for the journey ahead',
                        outcomeType: 'SUCCESS',
                        effectId: null,
                    },
                ],
            },
            {
                content:
                    'Speed up and try to outrun the black circle, hoping to escape it',
                challenge_skill: null,
                challenge_value: null,
                outcomes: [
                    {
                        content:
                            'The black circle expands and briefly catches the boat, slowing its speed. A small crack forms in the hull',
                        outcomeType: 'FAILURE',
                        effectId: null,
                    },
                ],
            },
        ],
    },
    {
        content:
            'A thick, foul-smelling sludge starts bubbling up from beneath the boat, slowly rising and threatening to engulf the deck.',
        tagKey: 'SLUDGE',
        actions: [
            {
                content:
                    'Grab a bucket and start bailing the sludge off the deck to prevent it from overwhelming the boat.',
                challenge_skill: null,
                challenge_value: null,
                outcomes: [
                    {
                        content:
                            'You manage to clear most of the sludge before it becomes a problem. Among the muck, you find a small, shiny object—a mysterious key coated in sludge.',
                        outcomeType: 'SUCCESS',
                        effectId: null,
                    },
                ],
            },
            {
                content:
                    'Ignore the rising sludge and focus on navigating the boat out of the area quickly.',
                challenge_skill: null,
                challenge_value: null,
                outcomes: [
                    {
                        content: `The boat becomes sluggish as the rising sludge slows your escape. 
                            Some of the equipment gets coated and will need to be cleaned later, or it may stop working properly.`,
                        outcomeType: 'FAILURE',
                        effectId: null,
                    },
                ],
            },
        ],
    },
    {
        content: `A sudden burst of warm, tropical wind carries with it vibrant, multicolored butterflies that begin to swarm the boat. 
            Their delicate wings glitter in the sunlight, but their sheer number is starting to obscure your vision.`,
        tagKey: 'TROPICAL',
        actions: [
            {
                content:
                    'Slow the boat and let the wind settle, allowing the butterflies to naturally disperse.',
                challenge_skill: null,
                challenge_value: null,
                outcomes: [
                    {
                        content: `The butterflies flutter away, revealing a clear path ahead. One stays behind and lands on your shoulder, 
                            bringing a strange sense of calm and clarity, improving your focus for upcoming challenges.`,
                        outcomeType: 'SUCCESS',
                        effectId: null,
                    },
                ],
            },
            {
                content:
                    'Push forward at full speed, trying to power through the butterfly swarm and outpace them.',
                challenge_skill: null,
                challenge_value: null,
                outcomes: [
                    {
                        content: `As you push through, the butterflies become agitated, fluttering into the boat’s cabin and causing confusion. 
                            In the chaos, some of your supplies are knocked overboard, leading to a minor loss of resources.`,
                        outcomeType: 'FAILURE',
                        effectId: null,
                    },
                ],
            },
        ],
    },
    {
        content:
            "A sudden electrical storm causes a series of flickering lights and buzzing sounds to emanate from the boat's electronic systems. Sparks begin to fly from some of the equipment.",
        tagKey: 'Electronic',
        actions: [
            {
                content:
                    'Quickly shut down all non-essential electronic systems and inspect the equipment for damage.',
                challenge_skill: null,
                challenge_value: null,
                outcomes: [
                    {
                        content: `You successfully minimize the damage by shutting down unnecessary systems. 
                            After a brief inspection, you find a damaged circuit board that you can easily repair with the spare parts on hand, restoring full functionality to the boat’s electronics.`,
                        outcomeType: 'SUCCESS',
                        effectId: null,
                    },
                ],
            },
            {
                content:
                    "Attempt to weather the storm and keep all systems running to maintain the boat's course.",
                challenge_skill: null,
                challenge_value: null,
                outcomes: [
                    {
                        content: `The storm overwhelms the electronic systems, causing several devices to malfunction. 
                            The boat’s navigation system becomes unreliable, and you’ll need to recalibrate or replace the affected equipment later.`,
                        outcomeType: 'FAILURE',
                        effectId: null,
                    },
                ],
            },
        ],
    },
    {
        content: `As the boat drifts through a dense fog, a strange phenomenon occurs: 
            the fog begins to solidify into a series of animated, fleshy shapes that resemble both abstract forms and familiar creatures. 
            These forms float alongside the boat, occasionally reaching out with tendrils made of mist and flesh.`,
        tagKey: 'FLESH',
        actions: [
            {
                content:
                    'Engage the fleshy shapes in conversation using an old language book you found, hoping to communicate and understand their intentions.',
                challenge_skill: null,
                challenge_value: null,
                outcomes: [
                    {
                        content: `The shapes respond with a series of melodic hums and then disperse, 
                            leaving behind a trail of glowing mist that guides the boat to a hidden, serene lagoon filled with rare resources and artifacts.`,
                        outcomeType: 'SUCCESS',
                        effectId: null,
                    },
                ],
            },
            {
                content:
                    'Try to avoid the fleshy shapes by maneuvering the boat swiftly through the fog, attempting to escape their influence.',
                challenge_skill: null,
                challenge_value: null,
                outcomes: [
                    {
                        content: `In your haste, the boat becomes disoriented and drifts off course. 
                            You eventually find yourself in a treacherous part of the waters with jagged rocks, requiring a detour and extra caution to navigate safely.`,
                        outcomeType: 'FAILURE',
                        effectId: null,
                    },
                ],
            },
        ],
    },
    {
        content: `As you sail, the boat enters a region where the air itself seems to turn into a series of shimmering, mirrored surfaces. 
            These mirrors create a labyrinthine effect, causing the boat to appear in multiple reflections and distorting your sense of direction.`,
        tagKey: 'MIRROR',
        actions: [
            {
                content:
                    'Use a compass and map to navigate through the mirrored labyrinth, relying on traditional tools to stay on course.',
                challenge_skill: null,
                challenge_value: null,
                outcomes: [
                    {
                        content: `Despite the confusing reflections, you successfully use the compass and map to navigate through the labyrinth. 
                            The experience sharpens your navigation skills, making future journeys through similar areas easier.`,
                        outcomeType: 'SUCCESS',
                        effectId: null,
                    },
                ],
            },
            {
                content:
                    'Follow the reflections of landmarks and objects in the mirrored surfaces, trying to use visual cues to guide the boat through the maze.',
                challenge_skill: null,
                challenge_value: null,
                outcomes: [
                    {
                        content: `The reflections are deceptive and lead you astray, causing the boat to become disoriented and temporarily stuck in the mirrored maze. 
                            It takes extra time to realign your course and get back on track.`,
                        outcomeType: 'FAILURE',
                        effectId: null,
                    },
                ],
            },
        ],
    },
];
