<template>
	<view class="container">
		<view v-for="(item,key) in messageList" :key="key">
			<uni-list>
				<uni-list-item :title="item.createTime" :note="item.messageContent" />
			</uni-list>
		</view>
		<view v-if="messageList.length===0">
			<text>暂无消息</text>
		</view>
	</view>
</template>

<script>
export default {
  onLoad() {
    console.log('onLa');
    this.getMessage()
  },
  data() {
    return {
      messageList: []
    }
  },
  methods: {
    getMessage() {
      let opt = {
        params: {},
        callBack: (res) => {
          console.log('获取的消息列表', res);
          this.messageList = res.records
          res.records.map(item => {
            if (!item.readFlag) {
              item.messageId && this.viewMessage(item.messageId)
            }
          })
        }
      }
      this.$http('getMessageList', opt)
    },
    viewMessage(id) {

      let opt = {
        params: {
          id,
        },
        callBack: (res) => {
          console.log('获取的消息列表', res);
        }
      }
      this.$http('getMessageViewList', opt)
    }
  }
}
</script>

<style>

</style>