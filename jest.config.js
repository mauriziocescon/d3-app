module.exports = {
  testURL: 'http://localhost',
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
      babelConfig: true,
    },
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'node',
    'ts',
    'tsx',
  ],
  moduleNameMapper: {
    '^.+\\.(less|scss)$': 'babel-jest',
  },
  preset: 'ts-jest',
  testMatch: null,
}
