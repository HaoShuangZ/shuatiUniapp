"use strict";exports.api={login:{url:"/customer/min-app/login",method:"get"},getPhone:{url:"/customer/min-app/phone",method:"post"},getPhoneCode:{url:"/send/sm",method:"get",contentType:"application/x-www-form-urlencoded"},getCategoryType:{url:"/category/tree",method:"get",contentType:"application/x-www-form-urlencoded"},getCategoryTreeChild:{url:"/category/search",method:"get",contentType:"application/x-www-form-urlencoded"},getSearchKeywordList:{url:"/questionType/all/list",method:"get",contentType:"application/x-www-form-urlencoded"},getCategoryId:{url:"/chapter/list/by-category-id",method:"get",contentType:"application/x-www-form-urlencoded"},getDocumentList:{url:"/document/list",method:"post"},getHistoryList:{url:"/doc-download-record/search-download-record",method:"get"},uploadImg:{url:"/common/oss/upload",method:"post"},downLoadDocment:{url:"/document/download",method:"get"},collectQuestion:{url:"/user-collect/add",method:"post"},removeCollectQuestion:{url:"/user-collect/del",method:"get"},collectStatus:{url:"/user-collect/category/statistic",method:"get"},indexPageCollectList:{url:"/user-collect/category/list",method:"get",contentType:"application/x-www-form-urlencoded"},clearCollectAll:{url:"/error-question-record/clear",method:"get",contentType:"application/x-www-form-urlencoded"},getErrorQuestionList:{url:"/error-question-record/list",method:"get",contentType:"application/x-www-form-urlencoded"},addErrQuestion:{url:"/error-question-record/add",method:"post"},addErrQuestionList:{url:"/error-question-record/add-batch",method:"post"},addNotes:{url:"/notes/add",method:"post"},getNodeList:{url:"/notes/list",method:"post"},getCollectQuestion:{url:"/user-collect/question/list",method:"post"},imgSearch:{url:"/question/image/search",method:"post",contentType:"multipart/form-data"},imgSearchBase64:{url:"/question/image/search-by-base64",method:"post"},getCategoryIdDetail:{url:"/category/index/statistic",method:"get",contentType:"application/x-www-form-urlencoded"},getQuestionList:{url:"/question/list",method:"post"},wxPay:{url:"/pay-order/pay",method:"post"},postVipList:{url:"/vip-config/list",method:"post"},vipActive:{url:"/customer/vip-active",method:"post"},getVipStatic:{url:"/customer/vip-statistic",method:"get"},feedBackInfo:{url:"/feedback/add",method:"post"},getUserCollectQuestion:{url:"/user-collect/question/list",method:"post"},getUserCategory:{url:"/category/category/statistic",method:"get"},getQuestionType:{url:"/question/type/statistic",method:"get"},getQuestionPaper:{url:"/question/paper/statistic",method:"get"},getSubjectList:{url:"/subject/all-list",method:"get",contentType:"application/x-www-form-urlencoded"},addExamRecord:{url:"/examRecord/add",method:"post"}};
