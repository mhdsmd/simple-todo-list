module.exports = {
	'settings': {
		'react': {
			'version': 'detect', // React version. "detect" automatically picks the version you have installed.
		},
	},
	'env': {
		'browser': true,
		'es2020': true
	},
	'globals': {
		'process': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended'
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'@typescript-eslint',
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': 0,
		'global-require': 0,
		'eslint linebreak-style': [0, 'error', 'windows'],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'no-mixed-spaces-and-tabs': 0,
		'@typescript-eslint/camelcase': 0,
		'@typescript-eslint/explicit-function-return-type': 0,
		'@typescript-eslint/interface-name-prefix': 0,
		'no-prototype-builtins': 0,
		'@typescript-eslint/no-explicit-any': ['off']
	},
}