export default {
	login: {
		url: '/customer/min-app/login',
		method: 'get',
		isToken: false
	},
	getPhone: {
		url: '/customer/min-app/phone',
		method: 'post',
		isToken: true
	},
	/** 手机验证码*/
	getPhoneCode: {
		url: '/customer/send/sm',
		method: 'get',
		contentType: 'application/x-www-form-urlencoded',
		isToken: true
	},
	/**手机验证码登陆*/
	phoneCodeLogin: {
		url: '/customer/sm/login',
		method: 'post',
		contentType: 'application/json'
	},
	/** 获取题目分类*/
	getCategoryType: {
		url: "/category/tree",
		method: 'get',
		contentType: 'application/x-www-form-urlencoded',
		isToken: false
	},
	/** 获取分类下面的子类*/
	getCategoryTreeChild: {
		url: "/category/search",
		method: 'get',
		contentType: 'application/x-www-form-urlencoded',
		isToken: true
	},
	/** 题目关键字搜索*/
	getSearchKeywordList: {
		url: "/questionType/all/list",
		method: 'get',
		contentType: 'application/x-www-form-urlencoded',
		isToken: true
	},
	/** 查询章节下所有的试题集*/
	getCategoryId: {
		url: "/chapter/list/by-category-id",
		method: 'get',
		contentType: 'application/x-www-form-urlencoded',
		isToken: true
	},
	/**获取文档分类*/
	getDocumentList: {
		url: '/document/list',
		method: 'post',
		isToken: false
	},
	/** 文档下载记录和搜题记录*/
	getHistoryList: {
		url: "/doc-download-record/search-download-record",
		method: 'get',
		isToken: true
	},
	/** 图片上传通用接口*/
	uploadImg: {
		url: '/common/oss/upload',
		method: 'post',
		isToken: true
	},
	downLoadDocment: {
		url: '/document/download',
		method: 'get',
		isToken: true
	},
	/** 收藏问题*/
	collectQuestion: {
		url: '/user-collect/add',
		method: 'post',
		isToken: true
	},

	/** 取消收藏*/
	removeCollectQuestion: {
		url: '/user-collect/del',
		method: 'get',
		isToken: true
	},
	/** 收藏分类统计*/
	collectStatus: {
		url: "/user-collect/category/statistic",
		method: "get",
		isToken: true
	},
	/**首页收藏分类*/
	indexPageCollectList: {
		url: '/user-collect/category/list',
		method: 'get',
		contentType: 'application/x-www-form-urlencoded',
		isToken: false
	},
	/**清空收藏的错题*/
	clearCollectAll: {
		url: '/error-question-record/clear',
		method: 'get',
		contentType: 'application/x-www-form-urlencoded',
		isToken: true
	},
	/**获取错题列表*/
	getErrorQuestionList: {
		url: '/error-question-record/list',
		method: 'get',
		contentType: 'application/x-www-form-urlencoded',
		isToken: true
	},
	/** 添加错题*/
	addErrQuestion: {
		url: '/error-question-record/add',
		method: 'post',
		isToken: true
	},
	/**批量添加错题记录*/
	addErrQuestionList: {
		url: '/error-question-record/add-batch',
		method: 'post',
		isToken: true
	},
	/** 添加笔记*/
	addNotes: {
		url: '/notes/add',
		method: 'post',
		isToken: true
	},
	/** 获取笔记*/
	getNodeList: {
		url: '/notes/list',
		method: 'post',
		isToken: true
	},
	/**分类下收藏的题*/
	getCollectQuestion: {
		url: '/user-collect/question/list',
		method: 'post',
		isToken: true
	},
	/** 拍照搜题*/
	imgSearch: {
		url: "/question/image/search",
		method: 'post',
		contentType: 'multipart/form-data',
		isToken: true
	},
	/** 拍照搜题base64*/
	imgSearchBase64: {
		url: "/question/image/search-by-base64",
		method: 'post',
		// contentType: 'multipart/form-data'
		isToken: true
	},
	/** 题目练习详情页*/
	getCategoryIdDetail: {
		url: '/category/index/statistic',
		method: 'get',
		contentType: 'application/x-www-form-urlencoded',
		isToken: true
	},

	/** 答题页面API*/
	/**
	 * 根据categoryId分页查询题目
	 * 
	 * */
	getQuestionList: {
		url: '/question/list',
		method: 'post',
		isToken: true
	},
	/** 微信支付*/
	wxPay: {
		url: '/pay-order/pay',
		method: 'post',
		isToken: true
	},
	/**微信h5 pay*/
	wxH5Pay: {
		url: '/pay-order/h5pay',
		method: 'post',
		isToken: true
	},
	// 会员页面
	// 分页查询vip配置
	postVipList: {
		url: '/vip-config/list',
		method: 'post',
		isToken: true
	},
	/** 激活码*/
	vipActive: {
		url: '/customer/vip-active',
		method: 'post',
		isToken: true
	},
	// 查询当前账号会员信息
	getVipStatic: {
		url: '/customer/vip-statistic',
		method: 'get',
		isToken: false
	},
	//错题反馈和 我的返回内容
	feedBackInfo: {
		url: '/feedback/add',
		method: 'post',
		isToken: true
	},
	//获取用户收藏下的题目
	getUserCollectQuestion: {
		url: '/user-collect/question/list',
		method: 'post',
		isToken: true
	},
	//当前分类下登陆用户的相关统计
	getUserCategory: {
		url: '/category/category/statistic',
		method: 'get',
		isToken: true
	},
	//获取题型信息
	getQuestionType: {
		url: '/question/type/statistic',
		method: 'get',
		isToken: true
	},

	//获取试题集统计
	getQuestionPaper: {
		url: "/question/paper/statistic",
		method: 'get',
		isToken: true
	},
	/** 根据分类获取所有科目*/
	getSubjectList: {
		url: '/subject/all-list',
		method: 'get',
		contentType: 'application/x-www-form-urlencoded',
		isToken: true
	},
	/** 添加考试记录*/
	addExamRecord: {
		url: '/examRecord/add',
		method: "post",
		isToken: true
	},
	/** 获取客户端消息*/
	getMessageList: {
		url: '/messageClient/list',
		method: 'get',
		isToken: true
	},
	/** 查看消息*/
	getMessageViewList: {
		url: '/messageClient/detail',
		method: 'get',
		isToken: true
	},
	getExamInfoList: {
		url: '/exam-info/detail-by-category',
		method: 'get',
		isToken: true
	},
	/** 获取错题的分类列表*/
	getErrQuestionList: {
		url: '/error-question-record/error-question',
		method: 'get',
		isToken: true
	},
	/** 取消收藏*/
	delCollectSubject: {
		url: "/user-collect/del-category",
		method: 'get',
		isToken: true,
		contentType: 'application/x-www-form-urlencoded'
	},
	/*修改个人信息*/
	modifyUserInfo: {
		url: "/customer/modify",
		method: "post",
		isToken: true,
		contentType: 'application/json'
	}

}