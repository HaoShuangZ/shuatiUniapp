// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import oilUni from './oil-uni/index.js'
import {
	request
} from '@/utils/http.js'
const pinia = createPinia()
Vue.config.productionTip = false
App.mpType = 'app'
console.log(1);
const app = new Vue({
	...App
})
app.config.globalProperties.$http = request
app.use(oilUni)
app.use(pinia)
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import {
	request
} from '@/utils/http.js'
import {
	createPinia
} from 'pinia';
// import oilUni from './oil-uni/index.js'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	const pinia = createPinia()
	app.use(pinia)

	console.log(2);
	app.config.globalProperties.$http = request
	// app.config.globalProperties.$oilUni = oilUni
	return {
		app,
	}
}
// #endif
