<template>
	<view>
		<view class="search">
			<view class="sea-frame">
				<navigator url="../city/choosecity/choosecity?type=search">
					<text class="text-l ">{{city}} <text class="iconfont icon-xiangxia"
							style="font-size: 25rpx;">
							</text></text>
							</navigator>
				<input placeholder="搜索职位" type="text" v-model="collect" @blur="inputTyping" confirm-type="search" />
			</view>
			<view class="collect">
				<navigator url="../occupation/occupation?type=search">
					<view class="collect-l">
						<text>{{collect}}</text>
					</view>
				</navigator>
				<view class="collect-r">
					<text>{{city}}</text>
					<text>筛选</text>
				</view>
			</view>
		</view>
		<!-- 展示 -->
		<view v-if="List==null">
			<view class="perlist">
				<navigator url="../../pages/candidates/candidates" class="perlist-info" v-for="(item,index) in List"
					:key="index">
					<view class="per-l">
						<view class="name">
							{{item.item}}
						</view>
						<view class="situation">
							<text>{{item.age}}</text>
							<text class="solls">|</text>
							<text>{{item.education}}</text>
							<text class="solls">|</text>
							<text>2-5k</text>
						</view>
						<view class="experience">
							<text class="iconfont icon-gongwenbao"
								style="color: #C8C7CC;margin-right: 20rpx;"></text>
							<text>广西恒信·天猫淘宝美工</text>
						</view>
						<view class="skill">
							<text>电商</text>
							<text>电商美工</text>
							<text>APP</text>
						</view>
						<view class="introduce">
							熟练运用cad、酷家乐,为人诚实严谨，希望能多积累经验，快速成长熟练运用cad、酷家乐,为人诚实严谨，希望能多积累经验，快速成长
						</view>
					</view>
					<view class="perimg">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="perxx iconfont icon-x">
					</view>
				</navigator>
			</view>
			<view class="bottomout">
				到底了...
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchtext: '',
				ifsea: '',
				clickcloo: '',
				collect: '搜职位',
				city: '南宁',
				jilu: true,
				sear: '',
				List:[]
			}
		},
		
		methods: {
			setDown(res) {
				this.ifsea = res
			},
			// 搜索
			inputTyping() {
				uni.request({
					url: '/api/search',
					method: 'GET',
					data: {
						city: this.city,
						occupation:this.collect
					}
				}).then((res) => {
					console.log(res[1].data)
					let info = res[1].data
					if (info.status == 0) {
						this.List = info.data;
					} else {
						console.log(info.msg)
					}
				})
			}
		},
		onLoad(potions) {
			console.log(potions)
			this.searchtext = potions.res
			this.sear = potions.sear
			if(potions.occupation!=null){
				this.collect=potions.occupation
			}
			if(potions.city!=null){
				this.city=potions.city
			}
			
		},
		onShow(e) {
			console.log(e)
			if (this.sear == 'sear') {
				this.jilu = true;
			} else {
				this.jilu = false;
			}
		}

	}
</script>

<style lang="scss">
	.clickcloo {
		color: #000000;
		font-size: 27rpx;
	}

	.search {
		width: 100%;
		height: 170rpx;
		background-color: #fff;
		position: fixed;
		box-shadow: 0rpx 4rpx 40rpx #dddddd;
		z-index: 99;

		.sea-frame {
			margin: 10rpx auto;
			width: 95%;
			height: 70rpx;
			background-color: #F5F5F5;
			border-radius: 30rpx;
			font-size: 25rpx;
			color: #acacac;
			line-height: 70rpx;
			display: flex;

			.text-l {
				margin: 20rpx;
				border-right: 1rpx solid #cbcbcb;
				padding-right: 20rpx;
			}

			input {
				height: 70rpx;
				line-height: 70rpx;
				font-size: 25rpx;
				color: #111111;
				width: 550rpx;
			}
		}

		.collect {
			margin: 0 auto;
			width: 95%;
			height: 75rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 25rpx;
			color: #7e7e7e;

			.collect-l {
				text {
					margin-right: 20rpx;
				}
			}

			.collect-r {
				text {
					margin-left: 20rpx;
					background-color: #F5F5F5;
					padding: 10rpx 20rpx;
					border-radius: 7rpx;
				}
			}
		}
	}

	.searchtags {
		margin: 0 auto;
		width: 95%;
		padding-top: 200rpx;

		.searchtags-list {
			view:nth-child(1) {
				margin-top: 30rpx;
				font-size: 35rpx;
				font-weight: 700;
				margin-bottom: 30rpx;
			}

			.ser-info {
				display: flex;
				flex-wrap: wrap;

				text {
					padding: 10rpx 20rpx;
					background-color: #F5F5F5;
					margin: 10rpx 10rpx;
					border-radius: 10rpx;
					font-size: 26rpx;
				}
			}

		}
	}

	.searchlist {
		margin: 0 auto;
		width: 95%;
		padding-top: 160rpx;
	}

	.searchlists {
		margin: 0 auto;
		width: 95%;
		padding-top: 90rpx;
	}
	/* 人才信息 */
		.perlist {
			width: 100%;
			padding-top: 190rpx;
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
</style>
