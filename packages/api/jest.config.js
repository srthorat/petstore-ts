module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	rootDir: '.',
	verbose: true,
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1'
	},
    transform: {
        '\\.(js|ts)$': 'ts-jest',
    },
	moduleFileExtensions: ['ts', 'js', 'json'],
	modulePathIgnorePatterns: ['<rootDir>/node_modules/'],
	testMatch: ['<rootDir>/src/**/*.spec.ts'],
	testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    setupFilesAfterEnv: ["jest-expect-message"],
	reporters: [
		'default',
		[
			'jest-junit',
			{
				outputDirectory: 'result',
				outputName: './test-result.xml',
                ancestorSeparator: ' › ',
                uniqueOutputName: 'false',
                suiteNameTemplate: '{filepath}',
                classNameTemplate: '{classname}',
                titleTemplate: '{title}'
			}
		]
	]
};