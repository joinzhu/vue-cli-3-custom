module.exports = (api, options, rootOptions) => {
	let scripts = {
		lint: 'vue-cli-service lint',
		serve: 'vue-cli-service serve',
		build: 'vue-cli-service build',
		'test:unit': 'vue-cli-service test:unit',
		'build:beta': 'vue-cli-service build --mode beta',
		'build:dev': 'vue-cli-service build --mode dev',
		'build:prod': 'vue-cli-service build',
		'build:uat': 'vue-cli-service build --mode uat',
	}

	let dependencies = {
		axios: '^0.19.2',
		'core-js': '^3.6.5',
		dayjs: '^1.8.28',
		lodash: '^4.17.15',
	}

	// 加入element-ui
	if (options.uiType) {
		dependencies['element-ui'] = '^2.13.1'
	}

	let eslintConfig = {
		root: true,
		env: {
			node: true,
		},
		extends: ['plugin:vue/essential', 'eslint:recommended'],
		rules: {
			'space-before-function-paren': [
				1,
				{
					anonymous: 'never',
					named: 'never',
				},
			],
			'no-unused-vars': ['warn'],
			'no-console': 'off',
			'no-debugger': 'off',
			'no-empty': [
				'warn',
				{
					allowEmptyCatch: true,
				},
			],
			semi: ['error', 'never'],
			indent: [
				'warn',
				4,
				{
					SwitchCase: 1,
				},
			],
			quotes: [
				1,
				'single',
				{
					allowTemplateLiterals: true,
				},
			],
			'vue/html-indent': 'off',
			'vue/singleline-html-element-content-newline': 'off',
			'vue/max-attributes-per-line': 'off',
			'vue/html-self-closing': 'off',
			'vue/html-closing-bracket-newline': 'off',
			'comma-dangle': [
				'warn',
				{
					arrays: 'always-multiline',
					objects: 'always-multiline',
					imports: 'always-multiline',
					exports: 'always-multiline',
					functions: 'ignore',
				},
			],
		},
		parserOptions: {
			parser: 'babel-eslint',
		},
	}

	api.extendPackage({
		scripts,
		dependencies,
		eslintConfig,
	})
	// 复制template模版
	api.render('./template/pc')

	// 复制静态文件
	api.render({
		'./src/assets/css/_variables.scss': './template/assets/__variables.scss',
		'./src/assets/css/_base.scss': './template/assets/__base.scss',
		'./babel.config.js': './template/assets/babel.config.js',
		'./vue.config.js': './template/assets/vue.config.js',
		'./.env.beta': './template/assets/_env.beta',
		'./.env.dev': './template/assets/_env.dev',
		'./.env.development': './template/assets/_env.development',
		'./.env.production': './template/assets/_env.production',
		'./.env.uat': './template/assets/_env.uat',
		'./.gitignore': './template/assets/_gitignore',
	})

	// 加入element-ui
	if (options.uiType) {
		api.render({
			'./src/plugins/element.js': './template/plugins/element.js',
		})
		// 向入口文件添加需导入的文件，api见下的地址
		// https://cli.vuejs.org/zh/dev-guide/plugin-dev.html#%E6%89%A9%E5%B1%95%E5%8C%85
		api.injectImports(api.entryFile, `import '@/plugins/element.js'`)
	}

	// 加入mixin
	if (options.needMixin) {
		api.render({
			'./src/mixin/index.js': './template/mixin/index.js',
		})
		api.injectImports(api.entryFile, `import mixin from './mixin/index.js'`)
		api.afterInvoke(() => {
			let { EOL } = require('os')
			let fs = require('fs')
			let mainContent = fs.readFileSync(api.resolve(api.entryFile), {
				encoding: 'utf-8',
			})

			let lines = mainContent.split(EOL)
			let reg = /new Vue\(\{/
			let renderIndex = lines.findIndex((line) => reg.test(line))
			lines.splice(renderIndex - 1, 0, `Vue.mixin(mixin)`)

			fs.writeFileSync(api.resolve(api.entryFile), lines.join(EOL), {
				encoding: 'utf-8',
			})
		})
	}
}
