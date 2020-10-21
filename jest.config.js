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
    '^.+\\.(css|less|scss)$': 'jest-css-modules',
  },
  preset: 'ts-jest',
  testMatch: null,
}
