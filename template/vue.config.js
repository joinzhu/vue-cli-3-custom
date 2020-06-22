/**
 * vue.config.js
 *
 * @Author
 * @DATE    create on
 * @DESC
 */
module.exports = {
    publicPath: '/',
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/assets/css/_variables.scss";`,
            },
        },
    },
    productionSourceMap: process.env.NODE_ENV !== 'production',
    devServer: {
        port: 8080,
        proxy: {
            
        },
    },
}
