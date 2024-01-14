<template>
    <view class="user-info-container">
        <button class="user-info-btn" open-type="getUserInfo" @getuserinfo="mpGetUserInfo" withCredentials="true">
            <slot></slot>
        </button>
    </view>
</template>

<script>
import {
    AppModel
} from '@/models/app.js'
const appModel = new AppModel();
export default {
    name: 'userInfoBtn',
    data() {
        return {
            userInfo: {}
        }
    },
    methods: {
        mpGetUserInfo(result) {
            //根据调用系统自带button携带的result信息判断是否有授权信息
            if (result.detail.errMsg !== 'getUserInfo:ok') {
                wx.showToast({
                    title: '取消授权',
                    icon: 'none',
                    duration: 2000
                })
                //hasUserInfo为存储用户是否授权信息
                uni.setStorageSync('hasUserInfo', false)
                return;
            }
            wx.checkSession({
                success() {
                    console.log('有效');
                    //因为用户授权后需求获取用户授权信息，所以这里必传encryptedData、iv两个参数获取用户头像和昵称信息
                    appModel.login({
                        code: uni.getStorageSync('wxCode'),
                        encryptedData: result.detail.encryptedData,
                        iv: result.detail.iv
                    }).then(response => {
                        this.$store.dispatch('setUserInfo', response.data)
                        uni.setStorageSync('AuthTokens', response.data.token)
                        uni.setStorageSync('hasUserInfo', true)
                        this.$emit('onClickBtn')
                        this.userInfo = result.detail.userInfo
                        uni.login({
                            success(response) {
                                uni.setStorageSync('wxCode', response.code);
                            }
                        })
                    })
                },
                fail() {
                    console.log('失效');
                    uni.login({
                        success: function(res) {
                            if (res.code) {
                                uni.setStorageSync('wxCode', res.code);
                                const params = {
                                    code: res.code
                                }
                                appModel.login({
                                    code: uni.getStorageSync('wxCode'),
                                    encryptedData: result.detail.encryptedData,
                                    iv: result.detail.iv
                                }).then(response => {
                                    uni.login({
                                        success(response) {
                                            uni.setStorageSync('wxCode', response.code);
                                        }
                                    })
                                    this.$store.dispatch('setUserInfo', response.data)
                                    uni.setStorageSync('AuthTokens', response.data.token)
                                    uni.setStorageSync('hasUserInfo', true)
                                    this.$emit('onClickBtn')
                                    this.userInfo = result.detail.userInfo
                                })
                            } else {
                                console.log('获取用户登录态失败！' + res.errMsg);
                            }
                        },
                        fail: function() {
                            uni.showToast({
                                title: '微信登录失败',
                                icon: 'none'
                            })
                        }
                    });
                }
            })
        },
    }
}
</script>

// 样式重置，这里的样式坑是必踩的
<style lang="less" scoped>
    .user-info-btn::after {
        border: 0;
    }
    
    .user-info-btn {
        background-color: transparent;
        line-height: 0;
        padding: 0;
        font-size: 0;
    }
</style>