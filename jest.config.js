module.exports = {
  testEnvironment: 'jsdom',
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
  moduleNameMapper: {
    '^d3$': '<rootDir>/node_modules/d3/dist/d3.min.js',
  },
  testMatch: null,
}
