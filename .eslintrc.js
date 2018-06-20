module.exports = { 
  'extends': 'airbnb',
  'env': {
    'node': true,
    'es6': true
  },
  'rules': {
    'react/forbid-prop-types': 0,
    'camelcase':'off',
    'object-curly-newline':'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'no-restricted-globals': 'off',
    'no-continue': 'off',
    'no-await-in-loop': 'off',
    'class-methods-use-this': 'off',
    'no-console': 'off',
    'func-names': 'off',
    'no-plusplus': 'off'
  },
  'globals': {
    'it': true,
    'expect': true,
    'describe': true,
    'beforeEach': true,
    'afterEach': true,
    'localStorage': true,
    'FileReader': true,
    'document': true,
    'ROOT_URL': true,
    'window': true,
    'jest': true,
  }
}