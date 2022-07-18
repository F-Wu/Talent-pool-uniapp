<template>
	<view>
		<!-- 弹出层 -->
		<view class="uni-banner" style="background:#FFFFFF;" v-if="bannerShow">
			<view style="justify-content:flex-end;">
				<view style="justify-content:flex-end; text-align:right; padding:20upx;">
					<text class="iconfont icon-x" style="font-size: 30rpx;" @tap="closeBanner"></text>
				</view>
			</view>
			<view class="titles">
				登陆或注册
			</view>
			<view style="padding:50upx 0; padding-bottom:68upx;">
				<button type='default' @click="goto('/pages/registration/registration')" style="background:transparent; border: 2rpx solid #45CFFE; margin:10rpx 40upx;color: #45CFFE;font-size: 35rpx;"><text
					 class="iconfont icon-shouji" style="color: #45CFFE;font-size: 40rpx;font-weight: 700;margin-right: 10rpx;"></text>手机号注册/登录</button>
			</view>
		</view>
		<view class="uni-mask" v-if="bannerShow" @click="clicks"></view>
		<!-- 弹出层 -->
	</view>
</template>
<script>
	//保存登陆态
	var SESSION_KEY = 'denglutai'
	export default {
		props: ["eject"],
		data() {
			return {
				bannerShow: false,
				userinfo:Object
			}
		},
		created() {
			var session = uni.getStorageSync(SESSION_KEY)
			//如果存在session，已经登陆
			if (session) {
				//检测当前用户登录态是否有效
				var that = this
				uni.checkSession({
					success: function() {
						that.bannerShow = false;
					},
					fail: function() {
						uni.removeStorageSync(SESSION_KEY);
						that.bannerShow = true;
					},
				});
			} else {
				this.bannerShow = true;
			}
		},
		onBackPress() { //app,h5 按返回键触发
			if (this.bannerShow) {
				uni.reLaunch({
					url: '../../pages/user/user'
				});
			}
		},
		methods: {
			clicks() {
				this.$emit("chilbByvalue", this.ejects = false)
			},
			closeBanner: function() {
				this.$emit("chilbByvalue", this.ejects = false)
			},
			mpGetUserInfo(result) {
				var that = this
				if (result.detail.errMsg === 'getUserInfo:ok') {
					//小程序返回登陆态，code等，后续需要调用自己的api处理
					uni.setStorageSync(SESSION_KEY, result.authResult)
					that.bannerShow = false;
					console.log(result.detail.userInfo)
					that.userinfo=result.detail.userInfo;
					that.$emit("getUser",result.detail.userInfo)
				} else {
					uni.showModal({
						title: '请授权后查看'
					});
				}
			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.titles {
		font-size: 40rpx;
		text-align: center;
	}

	/* 遮罩层 */
	.uni-mask {
		background: rgba(0, 0, 0, 0.6);
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 9998;
	}

	/* 弹出层形式的广告 */
	.uni-banner {
		width: 80%;
		position: fixed;
		left: 50%;
		top: 50%;
		background: #FFF;
		border-radius: 10upx;
		z-index: 9999;
		transform: translate(-50%, -50%);
	}
</style>
