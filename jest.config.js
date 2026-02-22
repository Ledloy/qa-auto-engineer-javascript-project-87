/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).[jt]s?(x)'],
  transform: {},
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  transformIgnorePatterns: [
    'node_modules/(?!es-toolkit|test-exclude|glob|jest-config|@jest/transform)'
  ],

  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],

  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/**/*.config.js',
    '!src/gendiff.js'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/minimatch/',
    '/node_modules/test-exclude/'
  ],

  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'coverage',
      outputName: 'sonar-report.xml',
      ancestorSeparator: ' › ',
      usePathForSuiteName: 'true'
    }]
  ]
}
