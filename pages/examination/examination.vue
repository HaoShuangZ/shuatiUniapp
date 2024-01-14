<template>
	<!-- <page-meta :root-font-size="getRootFontSize()"></page-meta> -->
	<page-meta :page-style="'overflow:'+(show?'hidden':'visible')"></page-meta>
	<!-- <uni-nav-bar :style="{'height':navigationBarAndStatusBarHeight,display:'flex',width:'100%'}" left-icon="left"
		:status-bar="true" :leftWidth="0" :title="''" @clickLeft="back">
		<view class="button-group">
			<button class="type-button mini-btn" type="default" size="mini">答题</button>
			<button class="type-button mini-btn" type="default" size="mini">背题</button>
		</view>
	</uni-nav-bar> -->
	<uni-nav-bar :style="{'height':navigationBarAndStatusBarHeight,display:'flex',width:'100%'}" :status-bar="true"
		:title="''">
		<block v-slot:left>
			<uni-icons @click="back" type="back" color="#000" size="24" />
		</block>

		<!-- <view class="input-view">
			<input confirm-type="search" class="nav-bar-input" type="text" placeholder="输入搜索关键词" @confirm="confirm" />
		</view> -->
		<view class="input-view">
			<button class="type-button mini-btn" @click="switchQuestion(0)"
				:class="{'active-btn':!questionType}">答题</button>
			<button class="type-button mini-btn" @click="switchQuestion(1)"
				:class="{'active-btn':questionType}">背题</button>
		</view>
		<!-- <block>
			<view class="input-text">
				搜索
			</view>
		</block> -->

	</uni-nav-bar>
	<view class="container" page-font-size="{{pageFontSize}}" root-font-size="{{rootFontSize}}">
		<swiper class="swiper" :current="current" @change="swiperChange">
			<swiper-item v-for="(question, index) in list" :key="index">
				<view>
					<view class="question" style="padding: 0 20rpx;">
						<view class="question-title">
							<text class="option-tag">
								{{question.difficulty}}
							</text>
							{{index+1}}、
							{{ question.questionTitle }}
						</view>
						<!-- 单选题逻辑 -->
						<view class="question-options" v-if="question.questionTypeName === '单选题' && questionType ===0">
							<view class="question-option" v-for="(option, optionIndex) in question.optionsList"
								:key="optionIndex" @tap="selectOption(option,optionIndex,question)">
								<text class="option"
									:class="{ 'option-right': question.isSelected === true && option.isRight,'option-error':option.isChecked === true && option.isChecked !== option.isRight }">
									<!-- 如果已经选中 则判断是否选中正确答案 -->
									<text
										v-if="!(question.isSelected) || !option.isChecked ">{{optionTag[optionIndex]}}</text>
									<!-- <text else>{{optionTag[optionIndex]}}</text> -->
								</text>
								<text class="option-item"
									:class="{ 'option-right-text': question.optionsList.isSelected === true && option.isRight,'option-error-text':option.isChecked === true && option.isChecked !== option.isRight }">{{option['label']}}
								</text>
							</view>
						</view>
						<!-- 多选题逻辑 -->
						<view v-if="question.questionTypeName === '多选题' && questionType ===0">
							<view class="question-option" v-for="(option, optionIndex) in question.optionsList"
								:key="optionIndex" @tap="selectOption(option,optionIndex,question)">
								<text class="option"
									:class="{'more-option-select':option.isChecked ||question.isSelected === true && option.isRight, 'more-option-error': question.isSelected === true &&option.isChecked === true && option.isChecked !== option.isRight }">
									<!-- 如果已经选中 则判断是否选中正确答案 -->
									<text>{{optionTag[optionIndex]}}</text>
									<!-- <text else>{{optionTag[optionIndex]}}</text> -->
								</text>
								<text class="option-item"
									:class="{ 'option-right-text': option.isChecked ,'option-error-text':question.isSelected === true && option.isChecked &&option.isChecked !== option.isRight }">{{option['label']}}
								</text>
							</view>
						</view>
						<!-- 背题逻辑 -->
						<view v-if="questionType ===1">
							<view class="question-options" v-if="question.questionTypeName === '单选题'">
								<view class="question-option" v-for="(option, optionIndex) in question.optionsList"
									:key="optionIndex">
									<text class="option"
										:class="{ 'option-right':  option.isRight,'option-error':option.isChecked === true && option.isChecked !== option.isRight }">
										<!-- 如果已经选中 则判断是否选中正确答案 -->
										<text
											v-if="!(question.isSelected) || !option.isChecked ">{{option.isRight?null:optionTag[optionIndex]}}</text>
										<!-- <text else>{{optionTag[optionIndex]}}</text> -->
									</text>
									<text class="option-item"
										:class="{ 'option-right-text': option.isRight,'option-error-text':option.isChecked === true && option.isChecked !== option.isRight }">{{option['label']}}
									</text>
								</view>
							</view>
							<!-- 多选题逻辑 -->
							<view v-if="question.questionTypeName === '多选题'">
								<view class="question-option" v-for="(option, optionIndex) in question.optionsList"
									:key="optionIndex">
									<text class="option"
										:class="{'more-option-select': option.isRight, 'more-option-error': question.isSelected === true &&option.isChecked === true && option.isChecked !== option.isRight }">
										<!-- 如果已经选中 则判断是否选中正确答案 -->
										<text>{{optionTag[optionIndex]}}</text>
									</text>
									<text class="option-item"
										:class="{ 'option-right-text': option.isRight ,'option-error-text':question.isSelected === true && option.isChecked &&option.isChecked !== option.isRight }">{{option['label']}}
									</text>
								</view>
							</view>
						</view>
						<button class="post-answer"
							v-if="questionType ===0 &&question.questionTypeName == '多选题' &&  !question.isSelected"
							@click="moreAnswer(option,optionIndex,question)">提交答案</button>
						<!-- :style="{width:winWidth}" -->
						<!--  -->
						<view class="answer" v-if="question.isSelected || questionType==1">
							<text style="font-weight: 500;">答案&nbsp;</text>
							<text style="color:#4674f7" v-for="(item,index) in question.options" :key="index">
								<text v-for="(it,dix) in question.rightOptions" :key="it">
									{{item == it?optionTag[index]:''}}
								</text>
							</text>
							<text style="color:#4674f7">{{currentQuestionRightItem}}</text>
							<text style="color:#4674f7;float: right;" @click="errAnswerPost(question)">报错</text>
						</view>
					</view>

					<view v-if="question.isSelected || questionType==1"
						style="width: 100%;height: 20rpx;background-color: #f3f3f3;">
					</view>
					<!-- 解析 -->
					<!--  -->
					<view class="bottom-content" v-if="question.isSelected || questionType==1">
						<view class="analysis">
							<view style="width: 100%;height: 60rpx;">
								<text class="answer-info">解析</text>
								<image src="../../static/answer/anwser.png"
									style="width: 35rpx;height: 35rpx;margin-right: 10rpx;" alt="" />
								<image src="../../static/answer/vip.png"
									style="width: 50rpx;height: 25rpx;margin-right: 10rpx;" alt="" srcset="" />
							</view>
							<view style="width: 100%;min-height: 50rpx;line-height:50rpx;display: inline-block;">
								{{question.analysis}}
							</view>
						</view>
						<view class="note">
							<text class="answer-info">笔记</text>
							<text style="color:#4674f7;float: right;" @click="toggle('notes')">添加笔记</text>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="foote">
			<view>
				<!-- <button class="button" type="primary"><text class="button-text">底部</text></button> -->
				<!-- 普通弹窗 -->
				<view class="popup-header">
					<view class="popup-left">
						<view class="icon-item" @click="collectAdd(collageTag)">
							<image v-if="!collageTag" class="img" src="../../static/answer/college-f.png" alt="收藏"
								srcset="" />
							<div v-else>
								<image class="img" src="../../static/answer/college-t.png" alt="收藏" srcset="" />
								<text>收藏</text>
							</div>

						</view>
						<view class="icon-item">
							<image class="img" src="../../static/answer/delete.png" alt="删除" srcset="" />
							<text>删除</text>
						</view>
					</view>

					<view class="popup-right">
						<view class="icon-item">
							<image class="img" src="../../static/answer/isRight.png" alt="正确" />
							<text>{{isRight}}</text>
						</view>
						<view class="icon-item">
							<image class="img" src="../../static/answer/error.png" alt="错误" />
							<text>{{error}}</text>
						</view>
						<view class="icon-item" @click="toggle('card')">
							<image class="img" src="../../static/answer/pannel.png" alt="面板" />
							<text>答题卡</text>
						</view>
					</view>

				</view>
				<uni-popup ref="popup" background-color="#fff" @change="change">
					<view v-if="popupType === 'card'" class="popup-content"
						:class="{ 'popup-height': type === 'left' || type === 'right' }">
						<view v-for="(item,index) in list" :key="index">
							{{item.isSelectRight}}
							<!-- 'item-list-error':!item.isSelectRight -->
							<view class="item-list"
								:class="{'item-list-isRight':item.errorHistoryFlag,'item-list-error':item.errorHistoryFlag,'item-list-current':current == index}"
								@click="changeQuestionCurrentIndex(index)">
								{{index+1}}
								<image v-if="item.collectFlag" class="item-icon" src="../../static/answer/college.png"
									alt="" />
							</view>
						</view>
					</view>
					<!-- 添加笔记 -->
					<view v-if="popupType === 'notes'">
						<view
							style="padding: 0 10rpx;line-height: 80rpx;height: 80rpx;background-color: #f2f2f2;display: flex;justify-content: space-between;">
							<uni-icons type="closeempty" size="20" @click="closePopup"></uni-icons>
							<view style="color: #4674F6;" @click="addNotesButton">确认</view>
						</view>
						<textarea class="width:100%;height:100rpx" type="textarea" v-model="notesText"
							placeholder="请输入笔记" />
					</view>

				</uni-popup>


			</view>
		</view>
	</view>
</template>


<script setup>
import {
  ref,
  computed,
  reactive,
  getCurrentInstance
} from 'vue'
import {
  onLoad,
  onReady,
  onHide,
  onUnload
} from '@dcloudio/uni-app'
import {
  useCategory
} from '@/store/index.js'
import {
  mapStores
} from 'pinia'
// import common from '@/utils/common.js'
const winWidth = uni.getWindowInfo().windowWidth + "px"
const winHeight = uni.getWindowInfo().windowHeight + "px"
const info = useCategory()
const answerType = ref(1) // 1刷题 2背题  3语音  4考试
const collage = ref(true)
const isRight = ref(0)
const error = ref(0)
const type = '单选'
let questionType = ref(0) // 0刷题 1 背题
// 引入全局定义的$http
const currentInstance = getCurrentInstance()
const {
  $http
} = currentInstance.appContext.config.globalProperties
// 状态栏高度
const statusBarHeight = wx.getStorageSync('statusBarHeight') + 'px'
// 导航栏高度
const navigationBarHeight = wx.getStorageSync('navigationBarHeight') + 'px'
// 胶囊按钮高度
const menuButtonHeight = wx.getStorageSync('menuButtonHeight') + 'px'
// 导航栏和状态栏高度
const navigationBarAndStatusBarHeight = wx.getStorageSync('statusBarHeight') +
		wx.getStorageSync('navigationBarHeight') +
		'px'
const back = () => {
  console.log('123');
  uni.navigateBack({
    delta: 1
  })
}
const popup = ref(null)
let popupType = ref('card')
const toggle = (type) => {
  // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
  if (type == 'notes') {
    popupType.value = type
  } else {
    popupType.value = type
  }
  popup.value.open('bottom')
}
// 当前题目所在的index坐标
let current = ref(0)
const changeQuestionCurrentIndex = (index) => {
  current.value = index
  //好像是防止穿透的控制
  show.value = false
  popup.value.close()
}
const switchQuestion = (type) => {
  questionType.value = type
  console.log(questionType, 'questionType');
}
const show = ref(false)
const change = (e) => {
  show.value = e.show
  // popupType.value = 'card'
}
const closePopup = () => {
  show.value = false
  popup.value.close()
}

// 添加笔记
let notesText = ref('')
const addNotesButton = () => {
  let opt = {
    params: {
      notesContent: notesText.value,
      categoryId: list['value'][current.value].categoryId,
      questionId: list['value'][current.value].questionId,
      userId: wx.getStorageSync('userInfo').userId,
      question: list[current.value]
    },
    callBack: (e) => {
      console.log('笔记添加成功', e);
      show.value = false
      popup.value.close()
      notesText.value = ''
      uni.showToast({
        title: '笔记添加成功',
        icon: 'none',
        duration: 2000
      })
    }
  }
  $http('addNotes', opt)
}
const mode = 'round'
//#region 页面操作和小功能集合
const infoData = ref([{
  content: '内容 A'
}, {
  content: '内容 B'
}, {
  content: '内容 C'
}])
let collageTag = ref(false)
//分页滑动
const swiperChange = (e) => {
  current.value = e.detail.current;
  collageTag.value = list['value'][e.detail.current]['collectFlag']
}
// 选择选项 option 选择的信息  optionIndex 题目的索引  list 为当前题目的详情
const selectOption = (option, optionIndex, list) => {
  console.log('选择题选择的时候', option, optionIndex, list);
  console.log(option, optionIndex, list, '----');
  if (!list.isSelected && list.questionTypeName === '单选题') {
    option.isChecked = true
    list.isSelected = true
    // 0=正确 i=1为错误
    let i = 0
    list.optionsList.map((item, index) => {
      if (item.isRight) {
        item.isChecked = true
      }
      if (item.isChecked) {
        i++
      }
    })
    if (i == 1) {
      list.isSelectRight = true
      // 答对的时候添加到集合中的数据
      questionRecordList.push({
        categoryId: list.categoryId,
        questionId: list.questionId,
        status: 1,
        questionTypeName: list.questionTypeName
      })

      // addErrorQuestion(list.categoryId, list.questionId,1)
    } else {
      list.isSelectRight = false;
      !list.errorHistoryFlag && addErrorQuestion(list.categoryId, list.questionId,
        2)
      // 打错的时候需要添加的数据
      questionRecordList.push({
        categoryId: list.categoryId,
        questionId: list.questionId,
        status: 2,
        questionTypeName: list.questionTypeName
      })
    }
    console.log('处理出错添加的数据', questionRecordList);
  }
  if (!list.isSelected && list.questionTypeName === '多选题') {
    console.log('多选题');
    option.isChecked = true
  }
}


// 多选题选择答案
const moreAnswer = (option, index, list) => {
  list.isSelected = true
}
// 答案报错
const errAnswerPost = (list) => {
  console.log('答案报错', list);
  uni.setStorageSync('errQuestionDetail', list)
  uni.navigateTo({
    url: `../addErrorQuestion/index?feedType=errAnswerFeed`
  });
}

// 添加错题记录
/**
	 * categoryId 问题的分类ID
	 * questionId 问题id
	 * status 答题状态  1对 2错
	 * */
const addErrorQuestion = (categoryId, questionId, status) => {
  let opt = {
    params: {
      "categoryId": categoryId,
      "questionId": questionId,
      "status": status
      // "userId": wx.getStorageSync('userInfo').userId
    },
    callBack: (res) => {
      console.log('错题添加成功', res);

    }
  }
  $http('addErrQuestion', opt)
}
// 批量添加错题记录
const questionRecordList = reactive([])
const addErrorQuestionList = () => {
  let opt = {
    params: {
      questionRecordList: questionRecordList
    },
    callBack: (res) => {
      console.log('批量添加错题记录', res);
    }
  }
  $http('addErrQuestionList', opt)
}
// 收藏问题
const collectAdd = (tag) => {
  console.log('收藏问题', tag);
  let opt = {
    params: {
      "categoryId": list['value'][current.value]['categoryId'],
      "questionId": list['value'][current.value]['questionId']
    },
    callBack: (res) => {
      console.log('问题shouc', res);
      collageTag.value = !collageTag.value
      list['value'][current.value]['collectFlag'] = !tag
      uni.showToast({
        title: !tag ? '收藏成功' : '删除成功',
        icon: 'none',
        duration: 2000
      })
    }
  }
  tag ? $http('removeCollectQuestion', opt) : $http('collectQuestion', opt)
}
// 是否收藏
const isCllegeFlage = computed(() => {
  return list['value'][current.value]['collectFlag']
})
//#endregion


//#region 普通题目列表请求

let list = ref([])
// 定义分页数据
const currentPage = reactive({
  page: 1,
  size: 10,
  total: 10
})
const optionTag = ['A', 'B', 'C', 'D', 'E', 'F']
// 请求题目数据
const getQuestionList = (id) => {
  let opt = {
    params: {
      categoryId: Number(id),
      page: currentPage.page,
      size: currentPage.size,
    },
    callBack: (res) => {
      console.log('res', res.records);
      res.records.map((item, index) => {
        //把题目选项进行整理,添加问题内容、是否选择、是否是正确答案(isRight暂设false)
        const optionObjects = item.options.map(option => {
          return {
            label: option,
            isChecked: "",
            isRight: false
          };
        });
        // 添加错题的下标
        let rightAnswerItem = []
        item.options.map((opt, optIdx) => {
          item.rightOptions.map((right, rightIdx) => {
            if (opt === right) {
              rightAnswerItem.push(optIdx)
            }
          })
        })
        console.log('rightAnswerItem', rightAnswerItem);
        item.rightAnswerItem = rightAnswerItem
        // 标记正确答案
        const result = optionObjects.map(optionObj => {
          if (item.rightOptions.includes(optionObj.label)) {
            optionObj.isRight = true;
          }
          return optionObj;
        });
        item.optionsList = result;
        item.isSelected = false
      });
      list.value = res.records
      // 设置加载后当前的 题目是否收藏
      collageTag.value = res.records[current.value]['collectFlag']
      currentPage.page = res.page
      currentPage.size = res.size
      currentPage.total = res.total
    }
  }
  $http('getQuestionList', opt)
}
//#endregion
//#region 获取错题列表
const getErrorQuestionList = () => {
  let opt = {
    params: {
      page: currentPage.page,
      size: currentPage.size,
    },
    callBack: (res) => {
      console.log('获取错题数据', res);
      // 整体题目数据
      res.records.map((item, index) => {
        const optionObjects = item.question.options.map(option => {
          return {
            label: option,
            isChecked: "",
            isRight: false
          };
        });
        console.log('optionObjects', optionObjects);
        const result = optionObjects.map(optionObj => {
          if (item.question.rightOptions.includes(optionObj.label)) {
            optionObj.isRight = true;
          }
          return optionObj;
        });


        item.question.optionsList = result;
        item.question.isSelected = false
      });

      let a = res.records.map(item => {
        return item.question
      })
      list.value = [...a]
      // 设置加载后当前的 题目是否收藏
      collageTag.value = res.records[current.value]['collectFlag']
      currentPage.page = res.page
      currentPage.size = res.size
      currentPage.total = res.total
    }
  }
  $http('getErrorQuestionList', opt)
}
//#endregion
onLoad((params) => {
  console.log('listType', params);
  // 查询类型  0刷题  11错题 12收藏  13笔记 listType
  params.listType == 0 && getQuestionList(uni.getStorageSync('currentCategoryId'))
  if (params.listType == 11) {
    questionType.value = 1
    getErrorQuestionList()
  }
  // console.log(wx.getStorageSync('userInfo'), '获取个人信息');
})
// 隐藏页面
onHide(() => {
  console.log('隐藏页面');
})
// 页面销毁
onUnload(() => {
  console.log('页面销毁');
  questionRecordList.length > 0 && addErrorQuestionList()
})
onReady(() => {
  // console.log('info', info.currentInfo);
})
</script>

<style lang="scss">
	.container {
		position: relative;
		width: 100vw;
		height: 90vh;
		// border: 1rpx solid;
		background-color: #ffffff;

		swiper {
			height: 600px;
			// border: 1px solid;
		}

		.question {
			// padding: 20px;
		}

		.question-title {
			font-size: 38.04rpx;
			font-weight: 600;
			margin-bottom: 41.67rpx;

			.option-tag {
				padding: 9.06rpx;
				font-size: 23.55rpx;
				text-align: center;
				border-radius: 4px;
				color: #fff;
				display: inline-block;
				background-color: #4674f6;
			}
		}

		.question-options {
			display: flex;
			flex-direction: column;
		}

		.question-option {
			// padding: 10px;
			border-radius: 5px;
			margin-bottom: 50.72rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;

			.option {

				border: 1px solid;
				width: 60rpx;
				height: 60rpx;
				text-align: center;
				margin-right: 30rpx;
				border-radius: 50%;
				line-height: 60rpx;
				border-color: #E5E5E5;
				display: inline-block;
			}

			.option-item {
				display: inline-block;
				flex: 1;
				font-weight: 600;
			}





			.more-option-select {
				color: #fff;
				background-color: #4674f6;
			}

			.more-option-text {
				color: #4674f6;
			}

			.more-error-select {
				color: #fff;
				// background-color: #e64c49;
			}



			.option-right {
				background-image: url('../../static/answer/isRight.png');
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center;
				color: #fff !important;
				background-color: #fff;
			}

			.option-error {
				background-image: url('../../static/answer/error.png');
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center;
				color: #fff !important;
				background-color: #fff;
			}

			.more-option-error {
				color: #fff !important;
				background-color: #e64c49;
			}

			.more-error-text {
				color: #e64c49 !important;
			}

			.option-right-text {
				color: #4674f6;
			}

			.option-error-text {
				color: #f15752 !important;
			}
		}

		.post-answer {
			margin-top: 50rpx;
			width: 380rpx;
			height: 80rpx;
			line-height: 80rpx;
			color: #fff;
			border-radius: 105rpx;
			background: #4674F6;
		}

		.answer {
			height: 94.2rpx;
			line-height: 94.2rpx;
			padding: 0 28.99rpx;
			// margin: 0 30.8rpx;
			background-color: #f6f6f8;
			margin-bottom: 40rpx;
		}

		.bottom-bar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px;
			background-color: #f5f5f5;
		}

		.progress {
			font-size: 16px;
		}


	}

	.bottom-content {
		padding: 0 20rpx;
		display: flex;
		flex-wrap: wrap;
	}

	.analysis {
		border-top: 1px solid #F3F3F3;
		display: flex;
		flex-wrap: wrap;
		min-height: 150rpx;
		width: 100%;
		line-height: 100rpx;
		// margin-bottom: 10rpx;
		// border: 1px solid;
	}

	.note {
		display: flex;
		justify-content: space-between;
		height: 100rpx;
		width: 100%;
		// border: 1px solid;
		display: flex;
		border-top: 1px solid #F3F3F3;
		// margin-top: 55rpx;
	}

	.answer-info {
		font-size: 40rpx;
		font-family: PingFang SC-Bold, PingFang SC;
		font-weight: bold;
		margin-right: 10rpx;
	}

	@mixin flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	@mixin height {
		/* #ifndef APP-NVUE */
		height: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
	}

	.box {
		@include flex;
	}

	.popup-header {
		position: absolute;
		height: 120rpx;
		width: 100%;
		padding-top: 10px;
		border: 1px solid;
		bottom: 0px;
		display: flex;
		justify-content: space-between;

		.popup-left,
		.popup-right {
			display: inherit;
			flex-direction: inherit;
		}

		.icon-item {
			display: flex;
			flex-wrap: wrap;
			margin: 0 30rpx;
			flex-direction: column;
			text-align: center;
			// border: 1px solid;
			align-items: center;

			.img {
				display: block;
				width: 40rpx;
				height: 40rpx;
			}

			text {
				display: block;
			}
		}

	}

	.popup-header-line {
		position: absolute;
		height: 100px;
		width: 100%;
		border: 1px solid;
		// bottom: 0px;
	}

	.popup-header-animation {
		transform: translateY(100%);
		opacity: 1;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		padding-bottom: 34px;
		background-color: #fff;
		transition-duration: 0.3s;
		transition: 300ms ease 0ms;
		transform: translateY(0);
		transition-property: transform;
		transform-origin: 50% 50%;
		-webkit-transition: 300ms ease 0ms;
		-webkit-transform: translateY(0);
		-webkit-transition-property: transform;
		-webkit-transform-origin: 50% 50%;
	}

	.popup-content {
		@include flex;
		// align-items: center;
		justify-content: flex-start;
		padding: 15px;
		height: 500px;
		background-color: #fff;
		align-items: flex-start;
		justify-content: flex-start;
		align-content: flex-start;
		flex-wrap: wrap;

		.item-list {
			width: 81.52rpx;
			height: 81.52rpx;
			line-height: 81.52rpx;
			margin: 10rpx 15rpx;
			border-radius: 50%;
			color: #999999;
			border: 1px solid #999999;
			text-align: center;
			position: relative;

			.item-icon {
				position: absolute;
				width: 28rpx;
				height: 28rpx;
				top: -10rpx
			}
		}



		.item-list-isRight {
			background-color: #e0f1fb;
			color: #0e60f5;
		}

		.item-list-error {
			background-color: #fceae8;
			color: #f27570;
			border: none;
		}

		.item-list-current {
			// border-color: #4674F6 ;
			color: #0e60f5 !important;
			background-color: #fff !important;
			border: 1px solid #4674F6 !important;
		}
	}

	.popup-height {
		@include height;
		width: 200px;
	}

	.button-group {
		border: 1px solid;
		border-radius: 20px;
		background-color: #f2f2f2;
		text-align: center;


	}

	.uni-navbar {
		width: 100%;
		text-align: center;

	}

	.uni-navbar__header-container {
		display: flex;
		justify-content: center;
	}

	$nav-height:60rpx;

	$border-radius:30rpx;

	.left-icon {
		margin: 7px 0;
		height: $nav-height;
		line-height: $nav-height;
	}

	.input-view {
		display: flex;
		flex-direction: row;
		height: $nav-height;
		// border: 1px solid;
		background-color: #f2f2f2;
		border-radius: $border-radius;
		// padding: 0 15px;
		flex-wrap: nowrap;
		margin-top: 7px;
		line-height: $nav-height;

		.type-button {
			width: 120rpx;
			font-size: 30rpx;
			// color: #fff;
			border: none;
			height: $nav-height;
			line-height: $nav-height;
			border-radius: $border-radius;

			button {
				border: none !important;
			}
		}

		.active-btn {
			background-color: #4674f6;
			color: #fff;
		}
	}

	.input-text {
		margin: 7px 0;
		display: block;
		height: $nav-height;
		line-height: $nav-height;
	}

	.nav-bar-input {
		height: $nav-height;
		line-height: $nav-height;
		width: 100%;
		// padding: 0 5px;
		font-size: 12px;
		background-color: #f8f8f8;
	}

	.city {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		// width: 160rpx;
		margin-left: 4px;
	}
</style>
