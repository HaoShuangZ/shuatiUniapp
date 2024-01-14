import Vue from 'vue';
import Request from '@/js_sdk/luch-request/luch-request/index';
import $Router from "@/utils/router";
import $Store from "@/store/index";
const http = new Request();
const isDev = process.env.NODE_ENV === 'development'; 
Vue.prototype.$http = http;
http.setConfig((config) => { /* config 为默认全局配置*/  
  config.baseURL = 'https://sfba.sendcloud.net/tyzx/wx'; /* online 根域名 */ 
  // config.baseURL = 'https://sfba-test.sendcloud.net/tyzx/wx'; /* test 根域名 */ 
  config.header["Content-Type"] = "application/x-www-form-urlencoded";
  config.custom = {  
	// 默认有loading,针对特定接口不需要loading ，则单个接口传入自定义参数custom:{ loading :false }即可 ,
	//例如 http.get(url,{ custom:{ loading :false } }); http.post(url, {post data参数},custom:{ loading :false } )
    loading: true 
  }
  return config  
})  
http.interceptors.request.use((config) => { /* 请求之前拦截器,发起请求前需要做点什么 */ 
	const token = uni.getStorageSync('token');
	config.header = {  
		...config.header,
		"X-SF-Token":token
	}
	if(config.method === 'GET'){
		config.header["Content-Type"] = "application/json";
	}
  // custom自定义参数使用  
  if (config.custom.loading) {  
    uni.showLoading({
		title:"加载中..."
	})  
  }  
  return config  
}, (config) => {  
  return Promise.reject(config)  
})  

http.interceptors.response.use(async (response) => { /* 请求之后拦截器。请求之后需要对接口响应做点什么  */  
	uni.stopPullDownRefresh();
	const { data: { status } } = response;
	if (response.config.custom.loading) {
	  uni.hideLoading()  
	} 
  if (response.data.status !== 200) { // 服务端返回的状态码不等于200，则reject()  
		switch(Number(status)){
			case 400 :
				//400 参数错误
				uni.showToast({
					title:response.data.message,
					icon:"error",
				});
				break;
			case 401 : 
				// 401未登录
				uni.showToast({
					title:response.data.message,
					icon:"error",
					duration:1500,
					complete() {
						$Store.dispatch('logout');
						setTimeout(()=>{
							uni.hideToast();
							uni.switchTab({
								url:'/pages/myZone/index'
							});
						},1510)
					}
				});
				break;
			case 410 : 
				// 410 未绑定手机号
				uni.showToast({
					title:'请先绑定手机号',
					icon:"error",
					duration:1500,
					complete() {
						setTimeout(()=>{
							uni.hideToast();
							uni.navigateTo({
								url:'/pages/authorize/index?authorPhone=true'
							});
						},1510)
					}
				});
				break;
			default : 
				uni.showToast({
					title:response.data.message,
					icon:"error",
				});
				break;
		}
		return Promise.reject(response)  
  }   
  return response  
}, (response) => { // 请求错误需要做的响应处理 
  uni.stopPullDownRefresh();
  if (response.config.custom.loading) {  
    uni.hideLoading()  
  }
  return Promise.reject(response)  
})  