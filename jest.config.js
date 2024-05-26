module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '\\.[jt]sx?$': ['babel-jest', { configFile: './jest.babel.config.js' }],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@assets/(.*)$': '<rootDir>/assets/$1',
    '^@common/(.*)$': '<rootDir>/styles/common/$1',
    '^@styles/(.*)$': '<rootDir>/styles/$1',
    '^@containers/(.*)$': '<rootDir>/containers/$1',
    '^@lib/(.*)$': '<rootDir>/lib/$1',
    '^@modules/(.*)$': '<rootDir>/styles/modules/$1',
    '^@pages/(.*)$': '<rootDir>/pages/$1',
    '^@src/(.*)$': '<rootDir>/$1',
    '^@~/(.*)$': '<rootDir>/$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};
