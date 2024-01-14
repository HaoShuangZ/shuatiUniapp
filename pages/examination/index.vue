<template>
	<view class="container">
		<view class="">
			<uni-forms :modelValue="formData" ref="formData" :rules="rules">
				<uni-row class="uni-row">
					<uni-col :span="8">
						<view>题型(可多选)</view>
					</uni-col>
					<uni-col :span="8">
						<view>题数</view>
					</uni-col>
					<uni-col :span="8">
						<view>分值</view>
					</uni-col>
				</uni-row>
				<uni-row class="uni-row">
					<uni-col :span="8">
						<view>单选题</view>
					</uni-col>
					<uni-col :span="8">
						<uni-forms-item name="radio">
							<uni-easyinput :clearable="false" type="number" v-model="formData.radio" />
						</uni-forms-item>
					</uni-col>
					<uni-col :span="8">
						<uni-forms-item name="radioScore">
							<uni-easyinput :clearable="false" type="number" v-model="formData.radioScore" />
						</uni-forms-item>
					</uni-col>
				</uni-row>
				<uni-row class="uni-row">
					<uni-col :span="8">
						<view>多选题</view>
					</uni-col>
					<uni-col :span="8">
						<uni-forms-item name="multiple">
							<uni-easyinput :clearable="false" type="number" v-model="formData.multiple" />
						</uni-forms-item>
					</uni-col>
					<uni-col :span="8">
						<uni-forms-item name="multipleScore">
							<uni-easyinput :clearable="false" type="number" v-model="formData.multipleScore" />
						</uni-forms-item>
					</uni-col>
				</uni-row>
				<uni-row class="uni-row" style="text-align: center;">
					<uni-col :offset="2" :span="10">
						<view>总题:{{totalTopic}}</view>
					</uni-col>
					<uni-col :span="10">
						<view>总分:{{totalScore}}</view>
					</uni-col>
				</uni-row>
				<view>
					<uni-row class="uni-row">
						<uni-col :span="11">
							<view>考试时间</view>
						</uni-col>
						<uni-col :span="10">
							<uni-forms-item name="examTime">
								<uni-easyinput :clearable="false" type="number" v-model="formData.examTime" />
							</uni-forms-item>
						</uni-col>
						<uni-col :span="3">
							<view>分钟</view>
						</uni-col>
					</uni-row>

					<uni-row class="uni-row">
						<uni-col :span="11">
							<view>及格分数</view>
						</uni-col>
						<uni-col :span="10">
							<uni-forms-item name="score">
								<uni-easyinput :clearable="false" type="number" v-model="formData.score" />
							</uni-forms-item>
						</uni-col>
						<uni-col :span="3">
							<view>分</view>
						</uni-col>
					</uni-row>
					<uni-row class="uni-row">
						<uni-col :span="20">
							<view>答题后,显示答案</view>
						</uni-col>
						<uni-col :span="2">
							<uni-forms-item name="showRight">
								<switch color="#4674f6" :checked="formData.showRight"
									@change="()=>{this.formData.showRight = !this.formData.showRight}" />
							</uni-forms-item>
						</uni-col>
					</uni-row>
					<uni-row class="uni-row">
						<uni-col :span="20">
							<view>选项乱序&nbsp;
								<image src="../../static/answer/vip.png" style="width: 50rpx;height: 25rpx;margin-right: 10rpx;" alt=""
									srcset="" />
								<!-- <view style="color:#999999 ;font-size: 14px;">选项随机排序，避免背答案</view> -->
							</view>

						</uni-col>
						<uni-col :span="2">
							<uni-forms-item name="optionOrder">
								<switch color="#4674f6" :checked="formData.optionOrder" @change="vipSwitch('optionOrder')" />
							</uni-forms-item>
						</uni-col>
					</uni-row>
					<uni-row class="uni-row">
						<uni-col :span="20">
							<view>错题优先&nbsp;
								<image src="../../static/answer/vip.png" style="width: 50rpx;height: 25rpx;margin-right: 10rpx;" alt=""
									srcset="" />
							</view>
						</uni-col>
						<uni-col :span="2">
							<uni-forms-item name="worongPrior">
								<switch color="#4674f6" :checked="formData.worongPrior" @change="vipSwitch('worongPrior')" />
							</uni-forms-item>
						</uni-col>
					</uni-row>
					<uni-row class="uni-row">
						<uni-col :span="20">
							<view>未做优先&nbsp;
								<image src="../../static/answer/vip.png" style="width: 50rpx;height: 25rpx;margin-right: 10rpx;" alt=""
									srcset="" />
							</view>
						</uni-col>
						<uni-col :span="2">
							<uni-forms-item name="doneNot">
								<switch color="#4674f6" :checked="formData.doneNot" @change="vipSwitch('doneNot')" />
							</uni-forms-item>
						</uni-col>
					</uni-row>
					<uni-row class="uni-row">
						<uni-col :span="5">
							<view>多选计分</view>
						</uni-col>
						<uni-col :span="19">
							<uni-forms-item name="moreDataWay">
								<uni-data-select v-model="formData.moreDataWay" :localdata="range" @change="change" label="请选择">
								</uni-data-select>
							</uni-forms-item>
						</uni-col>
					</uni-row>
					<uni-row class="uni-row">
						<button type="primary" class="btn-submit" @click="submitForm">开始考试</button>
					</uni-row>
				</view>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(res) {
			console.log('模拟考试页面获取的参数', res);
		},
		data() {
			return {
				formData: {
					radio: '10', //单选题数
					radioScore: '1', //单选分值
					multiple: '10', //多选
					multipleScore: '1', //多选分值
					examTime: '40', //考试时间
					score: '15', //及格分数
					showRight: false, // 答题后是否显示答案
					optionOrder: false, //选项乱序 vip
					worongPrior: false, //错题优先
					doneNot: false, //未做优先
					moreDataWay: 1, //多选题得分方式
				},
				range: [{
						value: 0,
						text: "漏题，按正常答案选项数，算平均分"
					},
					{
						value: 1,
						text: "全部选对，才算得分"
					},
					{
						value: 2,
						text: "漏选，得 50% 分"
					}
				],
				rules: {
					radio: {
						rules: [{
							required: true,
							errorMessage: '题目数量必填'
						}, {
							validateFunction: (rule, value, data, callback) => {
								console.log(value, 'value');
								if (value > 0 && value <= 100) {
									return true
								} else {
									return callback('题目数小于100')
								}
							}
						}]
					},
					radioScore: {
						rules: [{
								required: true,
								errorMessage: '分值不能为空'
							},
							{
								validateFunction: (rule, value, data, callback) => {
									console.log(value, 'value');
									if (value > 0 && value <= 10) {
										return true
									} else {
										return callback('分值必须小于10')
									}
								}
							},
						]
					},
					multiple: {
						rules: [{
								required: true,
								errorMessage: '多选题目数量不能为空'
							},
							{
								validateFunction: (rule, value, data, callback) => {
									console.log(value, 'value');
									if (value > 0 && value <= 200) {
										return true
									} else {
										return callback('多选题数量必须小于200')
									}
								}
							},
						]
					},
					multipleScore: {
						rules: [{
								required: true,
								errorMessage: '多选题目分数不能为空'
							},
							{
								validateFunction: (rule, value, data, callback) => {
									console.log(value, 'value');
									if (value > 0 && value <= 20) {
										return true
									} else {
										return callback('多选题分数小于20')
									}
								}
							},
						]
					},
					examTime: {
						rules: [{
							required: true,
							errorMessage: '考试时间不能为空',
						}]
					},
					score: {
						rules: [{
							required: true,
							errorMessage: '及格分数不能为空',
						}, {
							validateFunction: (rule, value, data, callback) => {
								console.log('及格分数', data)
								let totalScore = data?.radio * data?.radioScore + data?.multiple * data
									?.multipleScore
								if (value >= totalScore) {
									return callback('及格分数必须小于总分数')
								}
							}
						}]
					}

				}
			};
		},
		methods: {
			vipSwitch(type) {
				let userInfo = uni.getStorageSync('userInfo')

				if (userInfo.vipFlag == 1000) {
					this.formData[type] = false
					uni.showModal({
						title: '提示',
						content: '该功能为VIP专享服务，请购买VIP',
						confirmText: '前往购买',
						success: (res) => {
							console.log(res);
							if (res.confirm) {
								uni.redirectTo({
									url: '../vip/vip'
								})
							}
						}
					})
				} else {
					if (type == 'optionOrder') {
						this.formData.optionOrder = !this.formData.optionOrder
					} else if ('worongPrior') {
						this.formData.worongPrior = !this.formData.worongPrior
					} else if ('doneNot') {
						this.formData.doneNot = !this.formData.doneNot
					}
				}
			},
			submitForm() {
				this.$refs.formData.validate().then((res) => {
					console.log('res', res);
					let userInfo = uni.getStorageSync('userInfo')
					if (userInfo.vipFlag == 1000) {
						uni.showModal({
							title: '提示',
							content: '该功能为VIP专享服务，请购买VIP',
							confirmText: '前往购买',
							success: (res) => {
								console.log(res);
								if (res.confirm) {
									uni.redirectTo({
										url: '../vip/vip'
									})
								}
							}
						})
					} else {
						uni.setStorageSync('examSetting', res)
						uni.setStorageSync('answerDataList', [])
						uni.setStorageSync('exerciseResult', {})
						uni.navigateTo({
							url: '../answer/index?listType=1'
						})
					}

				}).catch(err => {
					console.log('表单验证错误', err);
				})
			}
		},
		computed: {
			totalTopic() {
				return Number(this.formData.radio) + Number(this.formData.multiple)
			},
			totalScore() {
				return Number(this.formData.radioScore) * Number(this.formData.radio) + Number(this.formData
					.multipleScore) * Number(this.formData.multiple)
			},
		}
	}
</script>

<style lang="scss">
	.container {

		.uni-row {
			height: 100rpx;
			line-height: 100rpx;
			display: flex;
			margin-bottom: 20rpx;
			padding: 0 20rpx;
			background-color: #fff;
			align-items: center;

			text {}
		}

		.uni-forms-item {
			margin-bottom: 0;
		}

		.btn-submit {
			color: #fff;
			background-color: #4674F6;
			width: 100%;
			border-radius: 50rpx;
		}
	}
</style>