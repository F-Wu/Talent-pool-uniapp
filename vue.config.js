module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target:'http://localhost:8081/Recruit/api',
                changeOrigin:true,
                pathRewrite:{
                    '^/api':""
                }
            }
        }
    }
}