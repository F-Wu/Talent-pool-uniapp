<template>
	<view>
		<view class="information">
			<!-- #ifdef H5 -->
			<view class="setup">
				<text class="iconfont icon-ziyuan"></text>
				<text class="iconfont icon-saoyisao"></text>
			</view>
			<!-- #endif -->
			<!-- 未登录状态和登陆状态 -->
			<view class="user" @click="ejectPopup">
				<view class="user-name">
					<view v-if="logintf">未登录/注册</view>
					<view v-else>{{userData.phone}}</view>
					<view v-if="logintf">点击头像登录/注册</view>
				</view>
				<view class="suer-pic">
					<image v-if="logintf" src="../../static/newsimg/sad2.png" mode=""></image>
					<image v-else :src="userimg" mode=""></image>
				</view>
			</view>
		</view>
		<view class="mine">
			<navigator :url="mine.url" v-for="(mine,meindex) in minelist" :key="meindex">
			<view class="minelist" >
				<view>
					<text :class="mine.class" style=" font-size: 35rpx;"></text>
					<text>{{mine.text}}</text>
				</view>
				<view class="iconfont icon-xiangyou" style="color: #999999; font-size: 35rpx;"></view>
			</view>
			</navigator>
		</view>
		
		<!-- 判断是否登陆，如果登陆就不显示 -->
		<view class="mibut" v-if="logintf">
			退出登录
		</view>
		<view class="mibut bg" @click="loguot()" v-else>
			退出登录
		</view>
		<denglu v-if="ejects" :eject="ejects" @chilbByvalue="chilbByvalue" @getUser="getUser"></denglu>
	</view>
</template>

<script>
	import denglu from "../../components/denglu/denglu"
	export default {
		components: {denglu},
		data() {
			return {
				'logintf':true,
				'username':'',
				'userimg':'',
				'ejects':false,
				'userData':null,
				'minelist':[
					{
						'class':'iconfont icon-wujiaoxingkong',
						'text':'我的收藏',
						'url':'../house/house'
					},
					// {
					// 	'class':'iconfont icon-bixin',
					// 	'text':'我的发现',
					// 	'url':'../emptyPage/emptyPage'
					// },
					{
						'class':'iconfont icon-yinsi',
						'text':'隐私设置',
						'url':'../emptyPage/emptyPage'
					}
				]
			};
		},
		methods:{
			chilbByvalue(e){
				this.ejects=e;
			},
			ejectPopup(){
				this.ejects=true
			},
			getUser(user){
				console.log(user)
				this.username=user.nickName;
				this.userimg=user.avatarUrl;
				this.logintf=false
			},
			loguot(){
				getApp().globalData.user.phone='',
				getApp().globalData.user.password='',
				getApp().globalData.Likes=[]
				this.logintf=true
				uni.showToast({
					title:'退出成功'
				})
			}
		},
		onShow() {
			this.ejects=false
			this.userData=getApp().globalData.user
			this.logintf=getApp().globalData.logintf
			console.log(this.userData)
		}
	}
</script>

<style lang="scss">
.information{
	z-index: 99;
	width: 100%;
	height: 280rpx;
	background-color: #36bca8;
	padding-top: 10rpx;
	/* #ifdef MP */
	padding-top: 130rpx;
	height: 200rpx;
	/* #endif */
	.setup{
		margin: 0 auto;
		width: 95%;
		height: 80rpx;
		color: #fff;
		text{
			font-size: 40rpx;
			float: right;
			line-height: 80rpx;
			margin-left: 45rpx;
		}
	}
	.user{
		margin: 20rpx auto;
		width: 95%;
		height: 150rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.user-name{
			color: #fff;
			view:nth-child(1){
				font-size: 50rpx;
				margin: 10rpx 0;
			}
			view:nth-child(2){
				font-size: 27rpx;
			}
		}
		.suer-pic{
			width: 140rpx;
			height: 140rpx;
			border-radius: 50%;
			background-color: #fff;
			position: relative;
			image{
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
				width: 90%;
				height: 90%;
				border-radius: 50%;
			}
		}
	}
}
.resume{
	padding-top: 270rpx;
	/* #ifdef MP */
	padding-top: 320rpx;
	/* #endif */
	width: 100%;
	height: 240rpx;
	background-color: #fff;
	border-bottom: 10rpx solid #F5F5F5;
	display: flex;
	align-items: center;
	justify-content: space-around;
	.resumelist{
		width: 130rpx;
		height: 160rpx;
		text-align: center;
		.resuimg{
			margin: 0 auto;
			width: 100rpx;
			height: 100rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.resutext{
			margin-top: 20rpx;
			font-size: 25rpx;
			color: #1d1d1d;
		}
	}
}
.mine{
	margin: 0 auto;
	width: 95%;
	border-bottom: 1rpx solid #F1F1F1;
	.minelist{
		margin: 20rpx 0;
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		view:nth-child(1){
			font-size: 33rpx;
			text{
				margin-right: 20rpx;
			}
		}
	}
}

.mibut{
	margin: 30rpx auto;
	width: 650rpx;
	height: 90rpx;
	background-color: #F5F5F5;
	border-radius: 10rpx;
	text-align: center;
	line-height: 90rpx;
	font-size: 30rpx;
	color: #868686;
}
.bg{
	background-color: #36bca8;
	color: #000000;
}
</style>
