<template>
	<scroll-view>
		<view class="container">
			<view class="top">
				<view class="header">
					<text class="header__text-title">你与牛人其实只差一次聊天</text>
					<text class="header__text-subtitle">人才库</text>
				</view>

				<!-- 选择器 -->
				<view class="choose">
					<view :class="chooseIndex == 0?'categoryNameActive':''">
						<!-- 最新、最热 -->
						<picker mode="selector" :range="mostPicker" @change="pickerMost" :value="index">
							<view>{{mostPicker[index]}} <text class="iconfont icon-xiangxia"
									style="font-size: 25rpx;"></text></view>
						</picker>
					</view>
					<!-- 地区 -->
					<view @click="goCity()" :class="chooseIndex == 1?'categoryNameActive':''">
						<text class="text-l ">{{search.city}} <text class="iconfont icon-xiangxia"
								style="font-size: 25rpx;">
							</text></text>
					</view>
					<!-- 职业 -->
					<view @click="goOccupation()" :class="chooseIndex == 2?'categoryNameActive':''">
						<view class="collect-l">
							{{search.collect}}<text class="iconfont icon-xiangxia" style="font-size: 25rpx;"></text>
						</view>
					</view>
				</view>

			</view>
			<!-- 展示 -->
			<view class="exhibition" >
				<view class="perlist"  v-if="List">
					<view class="perlist-info" v-for="(item,index) in List" :key="index" @click="navigateTo(item.id)" v-if="item.disable==0">
						<view class="per-l">
							<view class="name">
								{{item.name}}
							</view>
							<view class="situation">
								<text>{{item.age}}岁</text>
								<text class="solls">|</text>
								<text>{{item.education}}</text>
								<text class="solls">|</text>
								<text>{{item.expect}}</text>
							</view>
							<view class="experience">
								<text class="iconfont icon-gongwenbao"
									style="color: #C8C7CC;margin-right: 20rpx;"></text>
								<text>{{item.education_name}}</text>
							</view>
							<view class="skill">
								<text>{{item.work}}</text>
							</view>
							<!-- <view class="introduce">
								熟练运用cad、酷家乐,为人诚实严谨，希望能多积累经验，快速成长熟练运用cad、酷家乐,为人诚实严谨，希望能多积累经验，快速成长
							</view> -->
						</view>
						<view class="perimg">
							<image :src="item.img" mode="" v-if="item.img"></image>
							<image src="https://img.51miz.com/Element/00/82/12/59/dd7490d5_E821259_0f069bbc.png" mode="" v-else></image>
						</view>
					</view>
				</view>
				<view class="perlist" v-if="List1">
					<view class="perlist-info" v-for="(item,index) in List1" :key="index" @click="navigateTo(item.id)" v-if="item.disable==0">
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
								<text class="iconfont icon-gongwenbao"
									style="color: #C8C7CC;margin-right: 20rpx;"></text>
								<text>{{item.education_name}}</text>
							</view>
							<view class="skill">
								<text>{{item.work}}</text>
							</view>
							<!-- <view class="introduce">
								熟练运用cad、酷家乐,为人诚实严谨，希望能多积累经验，快速成长熟练运用cad、酷家乐,为人诚实严谨，希望能多积累经验，快速成长
							</view> -->
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
				<view class="bottomout">
					到底了...
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
				index: 0,
				show: false,
				mostPicker: ['最新', '推荐'],
				name: '最新',
				List: null,
				List1: null,
				education: [],
				search: {
					city: '',
					collect: '',
				},
				city: '',
				data: true, //有没有数据
				// num:false,
				chooseIndex: undefined,
				// ulr:'newest'//hottest 推荐  newest 最新
			}
		},

		onLoad() {
			this.Getnews()
			// this.Gethottest()
		},
		onShow() {
			this.search.collect = getApp().globalData.occupation
			this.search.city = getApp().globalData.city
		},
		methods: {
			goCity() {
				this.chooseIndex = 1
				uni.navigateTo({
					url: '../../pages/city/choosecity/choosecity'
				})
			},
			goOccupation() {
				this.chooseIndex = 2
				uni.navigateTo({
					url: '../occupation/occupation'
				})
			},
			pickerMost(e) {
				this.chooseIndex = 0
				this.index = e.detail.value
				console.log(this.index)
			},

			Getnews() {
				uni.request({
					method: 'GET',
					url: '/api/newest',
				}).then(res => {
					console.log(res[1].data)
					let info = res[1].data
					if (info.status == 0) {
						this.List = info.data
						this.List1=null
					} else {
						console.log(info.msg)
						this.List=null
						this.List1=null
					}
				})
			},
			Gethottest() {
				uni.request({
					method: 'GET',
					url: '/api/hottest',
				}).then(res => {
					console.log(res[1].data)
					let info = res[1].data
					if (info.status == 0) {
						this.List1 = info.data;
						this.List=null
					} else {
						console.log(info.msg)
						this.List=null
						this.List1=null
					}
				})
			},
			navigateTo(id) {
				uni.navigateTo({
					url: '../candidates/candidates?id=' + id
				})
			},
			collect() {
				this.num = !this.num
			},
			// 搜索
			searchData(city,collect) {
				uni.request({
					url: '/api/search',
					method: 'GET',
					data: {
						city:city,
						occupation:collect
					}
				}).then((res) => {
					console.log(res[1].data)
					let info = res[1].data
					if (info.status == 0) {
						if (info.data == '暂无数据') {
							this.data = false
							this.List=null
							this.List1=null
						} else {
							this.List = info.data;
							this.List1=null
						}
						// console.log(this.List)
					} else {
						console.log(info.msg)
					}
				})
			}
		},
		watch: {
			// 监听对象 deep属性
			search: {
				 handler: function() {
				      //do something
					  	if(this.search.collect=='职业'&&this.search.city!='城市'){
					  		this.searchData(this.search.city,'')
					  	}
						if(this.search.collect!='职业' && this.search.city=='城市'){
							this.searchData('',this.search.collect)
						}
						if(this.search.collect!='职业' && this.search.city!='城市'){
							this.searchData(this.search.city,this.search.collect)
						}
						getApp().globalData.occupation='职业'
						getApp().globalData.city='城市'
				     },
				     deep: true
			},
			index(newVal,oldVal){
				// console.log({newVal,oldVal})
				if(this.index==1){
					this.Gethottest()
				}
				if(this.index==0){
					this.Getnews()
				}
				getApp().globalData.occupation='职业'
				getApp().globalData.city='城市'
			}
		}

	}
</script>

<style>
	.container {
		width: 100%;
		height: 100%;
	}

	.top {
		width: 100%;
		position: fixed;
		z-index: 2;
	}

	.header {
		background: url(https://www.zhipin.com/v2/h5/wap/images/home-bg.png);
		background-size: 100% auto;
		text-align: center;
		height: 150px;
	}

	.header__text-title,
	.header__text-subtitle {
		display: block;
		color: #fff;
		font-size: 50rpx;
		font-weight: 700;
		padding-top: 20rpx;
	}

	.header__text-title {
		padding-top: 45rpx;
	}

	.search {
		width: 100%;
		height: 150rpx;
		/* background-color: #45CFFE; */
		position: relative;
		z-index: 10;
		display: flex;
	}

	.search view {
		/* bottom: 100px; */
		height: 35rpx;
		position: relative;
		bottom: -30px;
		z-index: 11;
		left: 15px;
	}

	.search .input {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
		height: 70rpx;
		border: 2rpx solid #fff;
		background-color: #ffffff;
		border-radius: 50rpx;
		line-height: 70rpx;
		padding-left: 50rpx;
		color: #afafaf;
		font-size: 30rpx;
	}


	/* .search .search-btn {
	  flex: 2;
	  padding-top: 15rpx;
	  color: #5bd4c7;
	  font-size: 28rpx;
	} */

	.content {
		margin: 30rpx;
	}

	.content .icon image {
		width: 100rpx;
		height: 100rpx;
		vertical-align: middle;
		margin-right: 20rpx;
	}

	.content .icon .text {
		font-size: 30rpx;
		font-weight: 700;
	}

	.content .item-list {
		margin-top: 36rpx;
		border-bottom: 1px solid #f5f8f9;
		padding-bottom: 36rpx;
		margin-bottom: 36rpx;
	}

	.content .item-list--last {
		margin-top: 36rpx;
		padding-bottom: 36rpx;
		margin-bottom: 36rpx;
	}

	.content .item-list .item {
		padding: 16rpx 32rpx;
		font-size: 26rpx;
		color: #7e8793;
		line-height: 26rpx;
		background-color: #f5f8f9;
		border-radius: 200rpx;
		margin: 0 16rpx 16rpx 0;
		display: inline-block;
	}

	.content .item-list--last .item {
		padding: 16rpx 32rpx;
		font-size: 26rpx;
		color: #7e8793;
		line-height: 26rpx;
		background-color: #f5f8f9;
		border-radius: 200rpx;
		margin: 0 16rpx 16rpx 0;
		display: inline-block;
	}

	.choose {
		margin: 0 auto;
		width: 95%;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #f0f0f0;
		font-size: 30rpx;
		background-color: #ffffff;

	}

	.choose>view text {
		text-align: center;
	}

	.choose>view {
		padding: 10rpx 20rpx;
		background-color: #f5f5f5e3;
		border-radius: 5rpx;
	}

	/* 推荐 最新 点击后样式 */
	.categoryNameActive {
		color: #06c3f7;
		background-color: rgba(224, 224, 224, 0.5);
	}

	/* 人才信息 */
	.perlist {
		width: 100%;
		padding-top: 200px;
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
