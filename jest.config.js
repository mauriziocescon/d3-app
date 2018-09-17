module.exports = {
  testURL: 'http://localhost',
  globals: {
    'ts-jest': {
      'useBabelrc': true,
      'enableTsDiagnostics': true,
    }
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  moduleNameMapper: {
    '^.+\\.(less|scss)$': 'babel-jest'
  }
};
