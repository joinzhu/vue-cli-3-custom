module.exports = {
    publicPath: '/',
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/assets/css/_variables.scss";`
            }
        }
    },
    productionSourceMap: process.env.NODE_ENV !== 'production'
}