<!-- 试题报错 -->
<template>
	<div class="contenter">
		<uni-forms :modal="FormData">
			<uni-forms-item label="错误类型(可多选)" name="errType">
				<div>
					<button type="default">答案有问题</button>
					<button type="default">答案与解析不相符</button>
					<button type="default">有错别字</button>
					<button type="default">选项有问题</button>
					<button type="default">其他</button>
				</div>
			</uni-forms-item>
			<uni-forms-item label="具体内容" name="notesContent">
				<uni-easyinput type="textarea" v-model="formData.notesContent" placeholder="请输入自我介绍" />
			</uni-forms-item>
			<uni-form-item label="上传照片">
				<view class="example-body">
					<uni-file-picker limit="4" title="最多选择4张图片"></uni-file-picker>
				</view>
			</uni-form-item>
			<uni-form-item label="联系方式">
				<uni-easyinput type="text" v-model="formData.contact" placeholder="请输入您的qq号或者手机号,方便我们联系您" />
			</uni-form-item>
		</uni-forms>
		<button type="primary" @click="submit('valiForm')">提交</button>
	</div>
</template>

<script>
export default {
  onLoad(val) {

  },
  data() {
    return {
      formData: {
        errType: [],
        notesContent: '',
        questionId: '',
        userId: '',
        notesId: '',
        categoryId: '',
        contact: '', //联系方式
      },
      // 校验规则
      rules: {
        name: {
          errType: [{
            required: true,
            errorMessage: '错误类型不能为空'
          }]
        },
        notesContent: {
          rules: [{
            required: true,
            errorMessage: '年龄不能为空'
          }]
        }
      },

    }
  },
  methods: {
    submit(val) {
      this.$refs[ref].validate().then(res => {
        console.log('success', res);
        uni.showToast({
          title: `校验通过`
        })
      }).catch(err => {
        console.log('err', err);
      })
    }
  }
}
</script>

<style>
</style>
