#### template
```
<button @click="showSheet" type="primary">默认</button>

<xui-xsheet
	ref="showSheet_ref"
>
</xui-xsheet>
```

#### script
```
showSheet() {
	this.$refs.showSheet_ref.open();
}

```

#### 通用参数
| 参数 | 说明 | 类型 | 默认值 |
| ------------ | ------------ | ------------ | ------------ |
| maskOpacity | 遮罩透明度 | Number | 0.7 |
| maskClose | 是否可点击遮罩关闭 | Boolean | true |
| height | 高度，可以为 `auto` 自适应 | String | 150px |
| cancel | 是否显示取消按钮 | Boolean | false |
| cancelStr | 取消按钮文字 | String | 取消 |
| padding | 内边距 | String  | 0px |
| title | 标题，不为空时显示 | String | [空字符] |
| btnList | 选项列表 | Array | [] |

#### 分享用的额外参数
| 参数 | 说明 | 类型 | 默认值 |
| ------------ | ------------ | ------------ | ------------ |
| shareList | 选项列表，详情见下面 | Array | [] |
| shareTitle | 分享标题 | String | [空字符] |
| shareType | 分享类型，详情见下面 | Number | 0 |
| shareSummary | 分享内容的摘要 | String | [空字符] |
| shareHref | 跳转链接 | String | [空字符] |
| shareImageUrl | 图片地址 | String | [空字符] |
| shareMediaUrl | 音视频地址 | String | [空字符] |

##### sharelist 参数例示
```
[
	{name: 'weixin_firend', title: '微信好友'},
	{name: 'weixin_zone', title: '朋友圈'},
	{name: 'qq_firend', title: 'QQ好友'},
	{name: 'sinaweibo', title: '新浪微博'},
]
```

##### shareType 分享类型
| 数值 | 类型 |
| ------------ | ------------ |
| 0 | 图文 |
| 1 | 纯文字 |
| 2 | 纯图片 |
| 3 | 音乐 |
| 4 |视频 |