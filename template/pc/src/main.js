import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 自动注册全局组件
const requireComponents = require.context('@/components/Global', false, /\.vue/)
// 遍历出每个组件的路径
requireComponents.keys().forEach((fileName) => {
	// 组件实例
	const reqCom = requireComponents(fileName)
	// 截取路径作为组件名
	const reqComName = fileName.split('/')[1].split('.')[0]
	// 组件挂载
	Vue.component(reqComName, reqCom.default || reqCom)
})

new Vue({
	render: (h) => h(App),
}).$mount('#app')
