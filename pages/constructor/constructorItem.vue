<template>
	<view class="container">
		<view class="header">
			<text class="top-nav"> {{title}} </text>
			<view class="top-btn">
				<image class="vectorIcon" src="../../static/Vector.png" alt="" />
				<view class="top-text" @click="switchObject()"> 切换科目 </view>
			</view>
		</view>
		<view class="content">
			<view v-for="(item,index) in list" :key="index" class="item">
				<view class="list" @click="jumpQuestionList(item)">
					<view class="icon">
						<uni-icons custom-prefix="iconfont" :type="item.icon" size="34"> </uni-icons>
					</view>
					<view class="nav"> {{item.type}}</view>
				</view>
				<view class="num">({{item.num}})</view>
			</view>
		</view>
		<!---切换 -->
		<view>
			<view class="border-tb tab_nav">
				<view class="navTitle " v-for="(item,index) in navList" :key="index">
					<view :class="{'active':isActive === index}" @click="checked(index)">
						{{item.title}}
					</view>
				</view>
			</view>

			<view v-if="isActive==0">
				<tab-item :exerciseList="exerciseList" :userCollectFlag="userCollectFlag"></tab-item>
			</view>
			<view v-if="isActive==1">
				<tab-item :exerciseList="infoList" :userCollectFlag="userCollectFlag"></tab-item>
			</view>
		</view>

		<!---切换-->
	</view>
</template>
<script>
import tabItem from './tab-Item.vue';
import {
  mapActions
} from 'pinia'
import {
  useCategory
} from '@/store/index.js'
import {
  toRaw
} from 'vue'
export default {
  components: {
    tabItem
  },
  onLoad(option) {
    console.log('option', option)
    let currentIDIsNull = uni.getStorageSync('currentCategoryId')
    if (currentIDIsNull) {
      this.title = option.categoryName
    }
    this.categoryId = option.categoryId
    this.setCategoryInfo(option)
    uni.setNavigationBarTitle({
      title: uni.getStorageSync('currentCategoryDetail').categoryName
    })
  },
  onShow() {
    this.getCategoryTypeList()
  },

  data() {
    return {
      userCollectFlag: false,
      shareList: [],
      title: '',
      categoryId: '',
      trueQuestionChapterFlag: false,
      isActive: 0,
      collectText: '收藏',
      navList: [{
        index: 0,
        title: '题库练习'
      }, {
        index: 1,
        title: "考试信息"
      }],
      list: [{
        id: 11,
        type: '我的错题',
        num: 0,
        icon: "icon-cuowukongxin"
      },
      {
        id: 12,
        type: '我的收藏',
        num: 0,
        icon: "icon-shoucang"
      },
      {
        id: 13,
        type: '我的笔记',
        num: 0,
        icon: "icon-youliaobiji"

      },
        // {
        // 	id: 11,
        // 	type: '在线学习',
        // 	num: 0,
        // 	icon: "icon-zaixianxuexi"
        // },
      ],
      exerciseList: [{
        index: 0,
        title: '顺序练习',
        desc: "1/1000",
        icon: "icon-shoucang",
      }, {
        index: 1,
        title: "模拟考试",
        desc: "随机抽题仿真模拟",
        icon: "icon-zaixianxuexi"
      },
      {
        index: 2,
        title: "高频错题",
        desc: "精选高频易错题",
        icon: "icon-shoucang"
      },
      {
        index: 3,
        title: "随机练习",
        desc: "试题顺序打乱练习",
        icon: "icon-shoucang"
      },
      {
        index: 4,
        title: "题型练习",
        desc: "按题型分类练习",
        icon: "icon-shoucang"
      },
      {
        index: 5,
        title: "章节练习",
        desc: "按章节分类练习",
        icon: "icon-shoucang"
      },
      {
        index: 6,
        title: "历年真题",
        desc: "往年真题/模拟题",
        icon: "icon-shoucang"
      },
      {
        index: 7,
        title: "试题搜索",
        desc: "快速从题库中查找",
        icon: "icon-shoucang"
      },
        // {
        //   index: 8,
        //   title: "练习记录",
        //   desc: "考试学习相关文档",
        //   icon: "icon-shoucang"
        // },
        // {
        //   index: 9,
        //   title: "在线学习",
        //   desc: "考试学习相关文档",
        //   icon: "icon-shoucang"
        // },
      ],

      infoList: [{
        index: 10,
        title: '考试简介',
        desc: "考试用途 发展方向",
        icon: "icon-shoucang"
      }, {
        index: 11,
        title: "报考指南",
        desc: "报考条件 时间流程",
        icon: "icon-shoucang"
      },
      {
        index: 12,
        title: "考试大纲",
        desc: "官方发布 复习导航",
        icon: "icon-shoucang"
      },
      {
        index: 13,
        title: "考试安排",
        desc: "考试科目 题型一览",
        icon: "icon-shoucang"
      },
      {
        index: 14,
        title: "成绩证书",
        desc: "成绩信息 证书领取",
        icon: "icon-shoucang"
      },
      {
        index: 15,
        title: "考试资讯",
        desc: "最新动态 快速浏览",
        icon: "icon-shoucang"
      }
      ]
    };
  },
  methods: {
    ...mapActions(useCategory, ['setCategoryInfo']),
    getCategoryTypeList() {
      // uni.showLoading({
      //   title: '加载中'
      // })
      let opt = {
        params: {
          pid: uni.getStorageSync('fCurrentCategoryId')
        },
        callBack: (res) => {
          // uni.hideLoading()
          console.log('获取的列表', res);
          if (res.length > 0) {
            this.categoryId = res[0].categoryId;
            let currentIDIsNull = uni.getStorageSync('currentCategoryId')
            res.map(item => {
              if (item.categoryId == currentIDIsNull && item.userCollectFlag) {
                console.log('是否收藏', item);
                uni.setStorageSync('currentCategoryDetail', item)
                this.userCollectFlag = true
              } else {
                this.userCollectFlag = false
              }
            })
            // if (!currentIDIsNull) {
            //   this.title = res[0].categoryName
            //   // 判断初次进入是否收藏
            //   if (res[0].userCollectFlag) {
            //     this.userCollectFlag = true
            //   } else {
            //     this.userCollectFlag = false
            //   }
            // } else {

            // }

            this.byGetCategoryIdDetail()
          }

        }
      }
      this.$http('getCategoryType', opt)
    },
    hrefrouterApp() {
      uni.navigateTo({
        url: '../constructor/constructorItem'
      });
    },
    switchObject() {
      let pid = uni.getStorageSync('fCurrentCategoryId')
      uni.redirectTo({
        url: `../subject/subject?categoryId=${pid}`
      })
    },
    checked(index) {
      this.isActive = index
    },
    getList() {
      let opt = {
        params: {
          trueQuestionChapterFlag: this.trueQuestionChapterFlag,
          categoryId: this.categoryId,
        },
        callBack: (res) => {
          console.log('获取参数jjj', res)
        }
      }
      this.$http('getCategoryId', opt)
    },
    //错题 收藏 笔记 跳转
    jumpQuestionList(item) {
      console.log('笔记', item);
      if (item.id == 13) {
        uni.navigateTo({
          // url: `../answer/index?listType=${toRaw(item.id)}`
          url: `../notes/myNotes?listType=${toRaw(item.id)}`
        });
      } else {
        uni.navigateTo({
          url: `../wrong/index?listType=${toRaw(item.id)}`
        });
      }
    },

    // 获取用户刷题页详情数据
    byGetCategoryIdDetail() {
      let opt = {
        params: {
          categoryId: uni.getStorageSync('currentCategoryId') || uni.getStorageSync('fCurrentCategoryId')
        },
        callBack: (res) => {
          uni.hideLoading()
          console.log('获取用户刷题页详情数据', res);
          this.list[0]['num'] = res.errorNum
          this.list[1]['num'] = res.collectNum
          this.list[2]['num'] = res.notesNum
          this.exerciseList[0]['desc'] = `1/${res.questionNum}`
        }
      }
      this.$http('getCategoryIdDetail', opt)
    }
  }
}
</script>

<style lang="scss">
	.container {
		height: calc(100vh - 45px);
		width: 100%;
	}

	.header {
		display: flex;
		align-items: center;
		height: 30px;
		width: 100%;
		padding: 0 40rpx;
		background-color: #fff;
		justify-content: space-between;
		box-sizing: border-box;
		font-weight: 400;
	}

	.top-btn {
		display: flex;
		height: 40rpx;
		align-items: center;
		background-color: #4674F6;
		font-size: 12px;
		color: #fff !important;

		.vectorIcon {
			width: 23rpx;
			height: 23rpx;
			margin: 0 10rpx;
		}

		.btn {
			color: #fff !important;
			font-size: 12rpx !important;
		}
	}

	.top-text {}

	.content {
		display: flex;
		margin-bottom: 20rpx;
		background-color: #fff;
		justify-content: space-around;

		.item {
			display: flex;
			flex-direction: column;
			width: 25%;
			padding: 20rpx 38rpx;
			font-size: 14rpx;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			height: 170rpx;
		}

		.list {
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 50rpx;
		}

		.icon {
			margin-bottom: 10rpx;

			.iconfont {
				color: #4674F6 !important;
				font-size: 50rpx !important;
			}
		}

		.nav {
			font-size: 23rpx;
			margin-bottom: 10rpx;
		}

		.num {
			font-size: 23rpx;
		}
	}

	.tab_nav {
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fff;
		border-bottom: 1px solid #f8f8f8;
	}

	.tab_nav .navTitle {
		height: 90rpx;
		line-height: 90rpx;
		width: 100%;
		text-align: center;
		font-size: 32rpx;
		font-family: Alibaba PuHuiTi;
		color: #333;
	}

	.active {
		position: relative;
		color: #4674F6;
	}

	.active::after {
		content: "";
		position: absolute;
		width: 100rpx;
		height: 8rpx;
		background-color: #4674F6;
		left: 0px;
		right: 0px;
		bottom: 0px;
		margin: auto;
	}
</style>