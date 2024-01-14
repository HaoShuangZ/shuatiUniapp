<template>
	<view class="container-box">

		<view class="notes" v-if="noteList.length===0">
			<view class="notes-img">
				<image src="../../static/notes/notes.png" class="img"></image>
			</view>
			<view class="desc">
				<view class="none"> 没有笔记</view>
				<view class="tips"> 没有笔记练习时，可以记录笔记内容，方便记忆理解哦</view>
			</view>
			<view class="btn" @click="goBack"> 去练习</view>
		</view>
		<view v-else>
			<view v-for="(item,index) in noteList" :key="index">
				<view class="note-create">{{item.createTime}}</view>
				<view class="note-content">{{item.notesContent}}</view>
				<view class="item-question">
					<view class="question-type">{{item.question.questionTypeName}}</view>{{item.question.questionTitle}}
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {

  data() {
    return {
      isActive: 0,
      noteList: []
    };
  },

  onLoad() {
    this.getUserNoteList()
  },
  methods: {
    getUserNoteList() {
      let opt = {
        params: {
          categoryId: uni.getStorageSync('currentCategoryId'),
          page: 1,
          size: 50
        },
        callBack: (res) => {
          console.log('获取的笔记', res);
          this.noteList = res.records
        }
      }
      this.$http('getNodeList', opt)
    },
    goBack() {
      uni.navigateBack({
        delta: 1
      })
    },
    hrefrouterApp() {
      uni.navigateTo({
        url: '../wrong/wrongQuestion'
      });
    },
  }
}
</script>

<style lang="scss">
	.container-box {
		height: 1539rpx;
		background-color: #fff;

	}

	.note-create {
		color: #999999;
		font-size: 30rpx;
		margin: 0 30rpx;
	}

	.note-content {
		margin: 0 30rpx;
		font-size: 34rpx;
		font-weight: bold;
	}

	.item-question {

		padding: 20rpx;
		// display: flex;
		// flex-wrap: nowrap;
		// margin: 10rpx 30rpx;
		// background-color: #f7f6f9;
		// text-overflow: ellipsis;
		// overflow: hidden;
		// white-space: nowrap;
	}

	.question-type {
		width: 100rpx;
		color: #fff;
		background-color: #4675f7;
		padding: 0 10rpx;
		margin-right: 10rpx;
		border-radius: 10rpx;
	}

	.notes {

		.notes-img {
			width: 415.14rpx;
			height: 415.14rpx;
			background-color: red;
			margin: auto;

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.desc {
			display: flex;
			flex-direction: column;
			align-items: center;
			//text-align: center;
			height: 100rpx;
			background-color: #fff;

			.none {
				color: #333333;
				font-weight: 400;
				font-size: 33.96rpx;
			}

			.tips {
				padding-top: 10rpx;
				color: #999999;
				font-size: 28rpx;
			}
		}

		.btn {
			display: flex;
			width: 389.4rpx;
			height: 85.8rpx;
			background: #4674F6;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
			padding: 0 30rpx;
			margin: auto;
			color: #fff;
			margin-top: 50.16rpx;
			border-radius: 110.88rpx;
		}
	}
</style>