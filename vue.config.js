const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	publicPath: './',
	productionSourceMap: false,
	outputDir: 'dist',
	devServer: {
		port: 8000,
		open: true,
		proxy: {
			'/api': {
				target: process.env.VUE_APP_BASE_API,
				secure: false,
				changeOrigin: true
				// pathRewrite: { '^/api': '' }
			}
		},
		disableHostCheck: true
	},
	css: {
		loaderOptions: {
			sass: {
				// 根据自己样式文件的位置调整
				// javascriptEnabled: true,
				prependData: `@import "@/assets/scss/mixins.scss";@import "@/assets/scss/reset.scss";`
			},
			postcss: {
				plugins: [
					require('postcss-plugin-px2rem')({
						rootValue: 312, // 换算基数， 默认100  可以设置为75这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
						// unitPrecision: 5, // 允许REM单位增长到的十进制数字。
						// propWhiteList: [],  // 默认值是一个空数组，这意味着禁用白名单并启用所有属性。
						propBlackList: ['vant'], // 黑名单
						exclude: /(node_module)/, // 默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
						// selectorBlackList: [], //要忽略并保留为px的选择器
						// ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
						// replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
						mediaQuery: false, // （布尔值）允许在媒体查询中转换px。
						minPixelValue: 3 // 设置要替换的最小像素值(3px会被转rem)。 默认 0
					})
				]
			}
		}
	},
	configureWebpack: (config) => {
		if (process.env.NODE_ENV === 'production') {
			config.plugins.push(new BundleAnalyzerPlugin()) // 分析文件大小的插件
			config.plugins.push(
				new UglifyJsPlugin({
					uglifyOptions: {
						// 删除注释
						output: {
							comments: false
						},
						warnings: false,
						compress: {
							drop_console: true, // console
							drop_debugger: true,
							pure_funcs: ['console.log'] // 移除console
						}
					},
					sourceMap: false,
					parallel: true
				})
			)
		}
	},
	chainWebpack(config) {
		// set svg-sprite-loader
		config.module
			.rule('svg')
			.exclude.add(resolve('src/assets/icons'))
			.end()
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/assets/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
			.end()

		// set preserveWhitespace
		config.module
			.rule('vue')
			.use('vue-loader')
			.loader('vue-loader')
			.tap(options => {
				options.compilerOptions.preserveWhitespace = true
				return options
			})
			.end()

		config
			// https://webpack.js.org/configuration/devtool/#development
			.when(process.env.NODE_ENV === 'development',
				config => config.devtool('cheap-source-map')
			)

		config
			.when(process.env.NODE_ENV !== 'development',
				config => {
					config
						.plugin('ScriptExtHtmlWebpackPlugin')
						.after('html')
						.use('script-ext-html-webpack-plugin', [{
							// `runtime` must same as runtimeChunk name. default is `runtime`
							inline: /runtime\..*\.js$/
						}])
						.end()
					config
						.optimization.splitChunks({
						chunks: 'all',
						cacheGroups: {
							libs: {
								name: 'chunk-libs',
								test: /[\\/]node_modules[\\/]/,
								priority: 10,
								chunks: 'initial' // only package third parties that are initially dependent
							},
							elementUI: {
								name: 'chunk-elementUI', // split elementUI into a single package
								priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
								test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
							},
							commons: {
								name: 'chunk-commons',
								test: resolve('src/components'), // can customize your rules
								minChunks: 3, //  minimum common number
								priority: 5,
								reuseExistingChunk: true
							}
						}
					})
					config.optimization.runtimeChunk('single')
				}
			)
	}
}
