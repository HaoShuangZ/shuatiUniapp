<template>
	<view class="content" v-if="isVip ===1000">
		<!-- <view class="ad-view">
			<ad adpid="128492140605" @load="onload" @close="onclose" @error="onerror" ad-intervals="30"></ad>
		</view> -->
	</view>
</template>

<script>
export default {
  data() {
    return {
      title: 'ad',
      isVip: uni.getStorageSync('userInfo')['vipFlag']
    }
  },
  mounted() {
    console.log('isVip', uni.getStorageSync('userInfo')['vipFlag']);
  },
  methods: {
    onload(e) {
      console.log("onload");
    },
    onclose(e) {
      console.log("onclose: " + e.detail);
    },
    onerror(e) {
      console.log("onerror: " + e.detail.errCode + " message:: " + e.detail.errMsg);
    }
  }
}
</script>

<style>
	.content {
		background-color: #DBDBDB;
		padding: 10px;
	}

	.ad-view {
		background-color: #FFFFFF;
		margin-bottom: 10px;
	}
</style>