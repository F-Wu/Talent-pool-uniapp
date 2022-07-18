<template>
	<view class="content">
		<view class="title">手机号登陆/注册</view>
		<view class="uni-form-item uni-column">
			<input type="tel" class="uni-input" name="" placeholder="请输入手机号" v-model="phone" />
		</view>
		<view class="uni-form-item uni-column column-with-btn" v-if="message">
			<input type="phone" class="uni-input" name="" placeholder="请输入密码" v-model="password" />

		</view>
		<view class="uni-form-item uni-column" v-else>
			<input type="password" class="uni-input" name="" placeholder="请输入密码" />
		</view>
		<div @click="iszhuce()" v-if="!zuc">
			<p>注册</p>
		</div>
		<div @click="iszhuce()" v-else>
			<p>登录</p>
		</div>
		<button type="primary" @click="login()" v-if="!zuc">登陆</button>
		<button type="primary" @click="add()" v-else>注册</button>
		<view class="rule">
			<radio style="transform:scale(0.7)" value="sada" :checked="actil" color="#45CFFE" @click="clickRad" />
			<text>人才库<text style="color: #45CFFE;">《用户协议》</text>和<text style="color: #45CFFE;">《个人信息保护政策》</text></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				actil: false,
				short: '密码',
				message: true,
				captchaImg: '',
				data: null,
				phone: '',
				password: '',
				zuc: false
			}
		},
		onLoad() {

		},
		methods: {
			gotoLogin: function() {
				uni.navigateTo({
					url: 'login'
				})
			},

			clickRad() {
				this.actil = !this.actil
			},
			iszhuce() {
				this.zuc = !this.zuc
			},
			login() {
				// 登录
				uni.request({
					url: '/api/user/login',
					method: 'POST',
					data: {
						phone: this.phone,
						password: this.password
					}
				}).then((res) => {
					let info = res[1].data
					// console.log(info)s
					if (info.status == 0) {
						if (info.data == undefined) {
							this.data = '账号或密码错误'
						} else {
							this.data = info.data[0];
							getApp().globalData.user = this.data
							getApp().globalData.logintf = false
							this.collection()
						}
						console.log(getApp().globalData.user)
						uni.switchTab({
							url: '../user/user'
						})
					} else {
						console.log(info)
					}
				})
			},
			// 获取收藏
			// 获取收藏collection
			collection() {
				uni.request({
					url: '/api/get/collection',
					method: 'POST',
					data: {
						phone: this.phone,
						password: this.password
					}
				}).then((res) => {
					let info = res[1].data
					if (info.status == 0) {
						getApp().globalData.Likes = info.data
						console.log(getApp().globalData.Likes)
					}
				})

			},
			// 注册
			add() {
				uni.request({
					url: '/api/user/add',
					method: 'POST',
					data: {
						phone: this.phone,
						password: this.password
					}
				}).then((res) => {
					let info = res[1].data
					// console.log(info)s
					if (info.status == 0) {

						this.data = info.data[0];
						getApp().globalData.user = this.data
						getApp().globalData.logintf = false
						this.collection()

						console.log(getApp().globalData.user)
						uni.switchTab({
							url: '../user/user'
						})
					} else {
						console.log(info)
					}
				})
			}
		},
		computed: {
			disableCodeBtn: function() {
				return this.codeBtn.waitingCode || this.captchaImg.length < 4;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.rule {
		font-size: 24rpx;
	}

	.weixin {
		margin: 0rpx auto;
		margin-top: 200rpx;
		width: 150rpx;
		height: 200rpx;
		text-align: center;

		.weixinimg {
			margin: 0 auto;
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;

			image {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}

		.text {
			font-size: 30rpx;
			margin-top: 20rpx;
		}
	}

	$color-primary: #36bca8;

	.content {
		padding: 60upx 50upx 100upx;
		position: relative;
	}

	.title {
		font-size: 50rpx;
		font-weight: 700;
		margin-bottom: 100rpx;
	}

	.uni-form-item {
		margin-bottom: 40upx;
		padding: 0;
		border-bottom: 1px solid #e3e3e3;

		.uni-input {
			font-size: 30upx;
			padding: 7px 0;
		}
	}

	.column-with-btn {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		button {
			font-size: 24upx;
			margin: 0;
			width: 180upx;
			text-align: center;

			&:after {
				border: none
			}

			&.active {
				background-color: $color-primary;
				color: $uni-text-color-inverse;
			}
		}
	}

	.img-captcha {
		width: 150upx;
		height: 60upx;
	}

	button[type="primary"] {
		background-color: $color-primary;
		border-radius: 0;
		font-size: 34upx;
		margin-top: 60upx;
	}

	.links {
		text-align: right;
		margin-top: 40upx;
		font-size: 26upx;
		color: #999;

	}

	p {
		color: #999;
		margin-left: 550rpx;
		font-size: 30upx;
	}
</style>
