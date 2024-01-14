// stores/counter.js
import {
	defineStore
} from 'pinia';

export const useCategory = defineStore({
	id: 'currentCategory',
	state: () => ({
		currentInfo: {
			id: '',
			name: ''
		},
	}),
	getters: {
		category: (state) => {
			console.log('state', state);
			return state.currentInfo
		},
	},
	actions: {
		setCategoryInfo(res) {
			this.currentInfo.id = res.categoryId
			this.currentInfo.name = res.categoryName
			console.log(this.currentInfo, '设置完成后的参数');
			// state.currentInfo.id = res.categoryId;
			// state.currentInfo.name = res.categoryName;
		},
	},
});
