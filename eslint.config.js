import globals from 'globals';
// import pluginJs from '@eslint/js';
// import tseslint from 'typescript-eslint';

export default [
    {
        languageOptions: {
            globals: globals.node,
        },
        // env: {
        //     jest: true,
        // },
        rules: {
            'no-undef': 'error',
        },
    },
    // pluginJs.configs.recommended,
    // ...tseslint.configs.recommended,
];

// TODO: Fix all of this
