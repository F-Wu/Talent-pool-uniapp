<template>
	<view class="addjob">
		<view class="title">
			添加求职期望
		</view>
		<view class="titlemin">
			求职期望不同，推荐的职位也会不同
		</view>
		<view class="type">
			<view>求职类型</view>
			<view><text class="click">{{typeact}}</text></view>
		</view>
		<navigator class="addlist" url="../city/choosecity/choosecity?type=collection">
			<view class="listtexi1">工作城市</view>
			<view class="listtexi2"><text>{{city}}</text><text class="iconfont icon-xiangyou" style="font-size: 35rpx;color: #808080;"></text></view>
		</navigator>
		<navigator class="addlist" url="../occupation/occupation?type=collection">
			<view class="listtexi1">期望职位</view>
			<view class="listtexi2"><text>{{position}}</text><text class="iconfont icon-xiangyou" style="font-size: 35rpx;color: #808080;"></text></view>
		</navigator>
		<navigator class="addlist" url="">
			<view class="listtexi1">期望行业</view>
			<view class="listtexi2"><text>不限</text><text class="iconfont icon-xiangyou" style="font-size: 35rpx;color: #808080;"></text></view>
		</navigator>
		<navigator class="addlist" url="" v-if="types==0">
			<view class="listtexi1">薪资要求</view>
			<view class="listtexi2"><text>请选择薪资要求</text><text class="iconfont icon-xiangyou" style="font-size: 35rpx;color: #808080;"></text></view>
		</navigator>
		<!-- 添加职位 -->
		<view class="but" v-if="res==0">
			保存
		</view>
		<!-- 修改职位 -->
		<view class="buts" v-else>
			<view class="delete">
				删除
			</view>
			<view class="preservation">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				city:'南宁',
				position:'',
				res:'',
				types:0,
				typeact:'全职'
			};
		},
		methods:{
			
		},
		onLoad(option) {
			console.log(option)
			this.position=option.occupation
			this.city=option.city
		},
		// onShow(option) {
		// 	console.log(option)
		// 	this.position=option.occupation
		// 	this.city=option.city
		// }
	}
</script>

<style lang="scss">
.addjob{
	margin: 0 auto;
	width: 95%;
}
.title{
	font-size: 45rpx;
	font-weight: 700;
	margin-top: 30rpx;
}
.titlemin{
	margin-top: 10rpx;
	font-size: 30rpx;
	color: #808080;
}
.type{
	width: 100%;
	height: 120rpx;
	border-bottom: 2rpx solid #F1F1F1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #555555;
	font-size: 30rpx;
	view:nth-child(2){
		// padding: 10rpx 20rpx;
		border: 2rpx solid #45CFFE;
		border-radius: 10rpx;
		text{
			width: 100rpx;
			display: inline-block;
			height: 60rpx;
			text-align: center;
			line-height: 60rpx;
			color: #45CFFE;
		}
	}
}
.click{
	background-color: #45CFFE;
	border-radius: 10rpx;
	color: #FFFFFF !important;
}
.addlist{
	margin-top: 30rpx;
	width: 100%;
	border-bottom: 2rpx solid #F1F1F1;
	.listtexi1{
		font-size: 30rpx;
		color: #565656;
	}
	.listtexi2{
		margin: 20rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 35rpx;
		color: #555555;
	}
}
.but{
	height: 90rpx;
	color: #FFFFFF;
	background-color: #45CFFE;
	border-radius: 10rpx;
	text-align: center;
	line-height: 90rpx;
	margin: 30rpx auto;
	width: 100%;
}
.buts{
	margin: 30rpx auto;
	width: 100%;
	height: 90rpx;
	display: flex;
	font-size: 30rpx;
	justify-content: space-between;
	.delete{
		text-align: center;
		line-height: 90rpx;
		width: 200rpx;
		height: 100%;
		background-color: #F5F5F5;
		border-radius: 10rpx;
	}
	.preservation{
		text-align: center;
		line-height: 90rpx;
		width: 470rpx;
		height: 100%;
		background-color: #45CFFE;
		color: #FFFFFF;
		border-radius: 10rpx;
	}
}
</style>
