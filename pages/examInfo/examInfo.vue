<template>
	<view>
		<view>
			<uni-list v-if="list.length>0" v-for="(item,index) in list" :key="index">
				<uni-list-item v-if="item.title" :title="item.title" :note="item.content" />
			</uni-list>
			<view v-else>暂无数据</view>
		</view>
	</view>
</template>

<script setup>
import {
  ref,
  computed,
  reactive,
  getCurrentInstance
} from 'vue';
import {
  onLoad,
  onReady,
  onShow
} from '@dcloudio/uni-app'
onLoad((res) => {
  console.log('res', res);
  getEeamInfo(res.listType)
  const title = {
    examIntroduction: '考试简介',
    examGuid: '报考指南',
    examScope: '考试大纲',
    examArrangements: '考试安排',
    examCertificate: '成绩证书',
    examInformation: '考试资讯'
  }
  uni.setNavigationBarTitle({
    title: title[res.listType]
  })
})
const currentInstance = getCurrentInstance()
const {
  $http
} = currentInstance.appContext.config.globalProperties
let list = ref([])

const getEeamInfo = (type) => {
  let opt = {
    params: {
      categoryId: uni.getStorageSync('currentCategoryId') || uni.getStorageSync('fCurrentCategoryId')
    },
    callBack: (res) => {
      console.log('请求获取的数据', res);
      list.value = res['examInfoContent'][type]
      console.log('list', list);
    }
  }
  $http('getExamInfoList', opt)
}
</script>

<style lang="less">

</style>