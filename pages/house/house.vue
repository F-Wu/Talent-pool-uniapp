<template>
	<view>
		<view class="perlist" v-if="List.length !=0">
			<view class="perlist-info" v-for="(item,index) in List" :key="index" @click="navigateTo(item.id)">
				<view class="per-l">
					<view class="name">
						{{item.name}}
					</view>
					<view class="situation">
						<text>{{item.age}}</text>
						<text class="solls">|</text>
						<text>{{item.education}}</text>
						<text class="solls">|</text>
						<text>{{item.expect}}</text>
					</view>
					<view class="experience">
						<text class="iconfont icon-gongwenbao" style="color: #C8C7CC;margin-right: 20rpx;"></text>
						<text>{{item.education_name}}</text>
					</view>
					<view class="skill">
						<text>{{item.work}}</text>
					</view>
					<view class="introduce">
						熟练运用cad、酷家乐,为人诚实严谨，希望能多积累经验，快速成长熟练运用cad、酷家乐,为人诚实严谨，希望能多积累经验，快速成长
					</view>
				</view>
				<view class="perimg">
					<image :src="item.img" mode=""></image>
				</view>
				<view class="perxx">
					<image src="../../static/huo.png" mode="" style="width: 30rpx;height: 30rpx;" />
					<text>{{item.number}}</text>
				</view>
			</view>
		</view>
		<view class="undefindIMG" v-else>
			<image src="../../static/undefined.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				List: []
			}
		},
		methods: {
			Getnews() {
				uni.request({
					method: 'GET',
					url: '/api/newest',
				}).then(res => {
					console.log(res[1].data)
					let info = res[1].data
					if (info.status == 0) {
						let newArr = [];
						for (let i = 0; i < getApp().globalData.Likes.length; i++) {
							for (let j = 0; j < info.data.length; j++) {
								if (info.data[j].id === getApp().globalData.Likes[i].likes) {
									newArr.push(info.data[j]);
								}
							}
						}
						console.log(newArr);
						this.List = newArr
						console.log(getApp().globalData.Likes)
					} else {
						console.log(info.msg)
					}
				})
			},
			navigateTo(id, houde) {
				uni.navigateTo({
					url: '../candidates/candidates?id=' + id + '&houde=' + false
				})
			},
		},
		onLoad() {
			this.Getnews()
		}
	}
</script>

<style>
	/* 人才信息 */
	.perlist {
		width: 100%;
		padding-top: 10px;
	}

	.perlist-info {
		width: 100%;
		padding: 20rpx 20rpx;
		position: relative;
		box-sizing: border-box;
		border-bottom: 15rpx solid #F5F5F6;
	}

	.per-l {
		width: 600rpx;
		font-size: 30rpx;
	}

	.name {
		font-size: 35rpx;
		font-weight: 700;
	}

	.situation {
		margin: 10rpx 0;
		font-size: 30rpx;
	}

	.solls {
		color: #C8C7CC;
		padding: 0 10rpx;
	}

	.experience {
		font-size: 30rpx;
		margin-bottom: 10rpx;
	}

	.skill {
		margin: 20rpx 0;
	}

	.skill text {
		padding: 5rpx 20rpx;
		background-color: #F5F5F5;
		margin-right: 10rpx;
		border-radius: 5rpx;
	}

	.introduce {
		word-break: break-all;
		/*属性规定自动换行的处理方法。normal(使用浏览器默认的换行规则。),break-all(允许在单词内换行。),keep-all(只能在半角空格或连字符处换行。)*/
		text-overflow: ellipsis;
		display: -webkit-box;
		/** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2;
		/** 显示的行数 **/
		overflow: hidden;
	}

	.perimg {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background-color: #ffffff;
		position: absolute;
		top: 20rpx;
		right: 20rpx;
	}

	.perimg image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.perxx {
		position: absolute;
		bottom: 30rpx;
		right: 30rpx;
	}

	.undefindIMG {
		text-align: center;
		height: 240px;
		line-height: 240px;
	}

	.undefindIMG>image {
		vertical-align: middle;
	}
</style>
