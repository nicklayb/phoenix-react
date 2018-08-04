module.exports = {
    'extends': 'airbnb',
    'parser': 'babel-eslint',
    'env': {
        'browser': true,
        'node': true
    },
    'rules': {
        'jsx-quotes': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'prefer-promise-reject-errors': 0,
        'react/forbid-prop-types': ['error', { forbid: ['array', 'object'] }],
        'react/require-default-props': 0,
        'semi': ["error", "never"],
        'import/prefer-default-export': 0,
        'react/sort-comp': 0,
        'class-methods-use-this': 0,
        'no-underscore-dangle': 0,
        'react/no-array-index-key': 0
    }
};
