<template>
	<view class="content">
		<!-- <image src="../../static/undefined.png"></image> -->
			<text>查看联系方式</text>
			 <u-switch v-model="checked" class="switch" @change="change(checked)"></u-switch>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 checked: '',
			}
		},
		methods: {
			change(status) {
			               getApp().globalData.status=status
						   console.log(status)
							if(status==false){
								uni.showToast({
									title:'隐藏联系方式'
								})
							}else{
								uni.showToast({
									title:'查看联系方式'
								})
							}
			            },
		},
		onLoad() {
			this.checked=getApp().globalData.status
		}
	}
</script>

<style>
	.content{
		display: flex;
		height: 50px;
		font-size: 20px;
		align-items: center;/*垂直居中*/
		position: relative;
		border-bottom: #cbd3df 0.5px solid;
		/* background-color: #007AFF; */
	}
	text{
			line-height: 50px;
		}
		.switch{
			position: absolute;
			right: 20px;
		}
</style>
