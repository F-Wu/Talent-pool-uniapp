<template>
	<view>
		<scroll-view scroll-y="true" class="SV_categoryTitle">
			<view class="categoryTitle">
				<view class="categoryName" v-for="(item,index) in category" :key="index" :class="categoryNameActive == index?'categoryNameActive':''"
				 @click="categoryClickEvent(item,index)">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<scroll-view class="scroll-Y" :scroll-y="true" :scroll-top="scrollTop" :scroll-with-animation="true" @scroll="scrollEvent">
			<view class="categoryList" v-for="(item,index) in category" :key="item.id">
				<view class="categoryListName">
					<view class="categoryListName_line"></view>{{item.name}}
				</view>
				<view class="categoryListBox">
					<view>
						<view class="categoryListBox">
							<view class="classlist" v-for="(items,index) in categoryList"  :key="index"  @click="getPosition(items.name)" v-if="item.id==items.pid" >
								{{items.name}}
							</view>
						</view>

					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categoryList:[],
				category:[],
				categoryNameActive: 0, //当前选中active
				scrollTop: 0, //scroll-top
				scrollVal: 0, //滑动的值
				scrollStatus: true, //点击状态，是否能点击
				nodeHeight: [], //存储categoryList的top
				windowHeight: 0,
				windowTop: 0,
				active:""
			};
		},
		mounted() {
			uni.getSystemInfo({
				success: (res) => {
					this.windowHeight = res.windowHeight;
					this.windowTop = res.windowTop;
				}
			});
			this.nodeHeight = [];
			let theNode = uni.createSelectorQuery().in(this).selectAll(".categoryList");
			theNode.boundingClientRect((data) => {
				data.forEach((item, index) => {
					// #ifndef H5
					this.nodeHeight.push({
						top: item.top,
						index: index
					})
					// #endif
					// #ifdef H5
					this.nodeHeight.push({
						top: item.top + this.windowTop,
						index: index
					})
					// #endif
				})
			}).exec()
		},
		methods: {
			categoryClickEvent(item, index) {
				// 300毫秒才能执行下次点击
				if (this.scrollStatus) {
					this.scrollStatus = false;
					this.categoryNameActive = index;
					let theNode = uni.createSelectorQuery().in(this).selectAll(".categoryList");
					theNode.boundingClientRect((data) => {
						/* 获取当前第index的categoryList的top,滑动后值scrollVal + categoryList的top */
						// #ifndef H5
						this.scrollTop = this.scrollVal + data[index].top;
						// #endif
						// #ifdef H5
						this.scrollTop = this.scrollVal + data[index].top + this.windowTop;
						// #endif
						setTimeout(() => {
							// 200毫秒才能执行下次点击
							this.scrollStatus = true;
						}, 200)
					}).exec()
				}
			},
			scrollEvent(e) {
				if (this.scrollVal < e.detail.scrollTop) {
					// 向上
					this.nodeHeight.forEach(item => {
						if (this.scrollVal - item.top < 0 && this.scrollVal - item.top > -this.windowHeight) {
							this.categoryNameActive = item.index;
						}
					})
				} else {
					// 向下
					this.nodeHeight.forEach(item => {
						if (this.scrollVal - item.top > 0 && this.scrollVal - item.top < this.windowHeight) {
							this.categoryNameActive = item.index;
						}
					})
				}
				this.scrollVal = e.detail.scrollTop-40;
			},
			getPosition(e){
				getApp().globalData.occupation=e
				uni.switchTab({
					url:'../index/index'
				})
			},
			GETlist(){
				uni.request({
								method: 'GET',
								url:'/api/occupation',
								
							}).then(res => {
								let info = res[1].data
								if (info.status == 0) {
									this.category = info.first;
									this.categoryList=info.occupation
									// console.log('father----'+this.foodList)
									//this.category = info.result[0].list.slice(0, 10) //每项分类数据中前十类功能
								} else {
										console.log(info.msg)
									}
							})
			}
		},
		onLoad() {
			this.GETlist();
			
		}
	}
</script>

<style lang="scss">
	.categoryTitle {
		width: 200rpx;
		float: left;

		border-right: 1px solid #ccc;
		font-size: 28rpx;
	}

	.SV_categoryTitle {
		width: 250rpx;
		height: 100vh;
		float: left;
	}

	.categoryName {
		width: 100%;
		text-align: center;
		height: 100rpx;
		line-height: 100rpx;
		color: #3E3E3E;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.categoryNameActive {
		color: #45CFFE;
		border-left: 4rpx solid #45CFFE;
		background-color: rgba(224, 224, 224, 0.5);
	}

	.scroll-Y {
		height: 100vh;
		width: 500rpx;
		float: left;
	}

	.categoryList {
		width: 100%;
		padding-left: 16rpx;
		box-sizing: border-box;
		// height: 80vh;
	}

	.categoryListName {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-indent: 20rpx;

	}

	.maxname {
		font-size: 35rpx;
		margin-top: 30rpx;
	}

	.categoryListBox {
		display: flex;
		flex-wrap: wrap;
         box-sizing: border-box;
		.classlist {
			box-sizing: border-box;
			padding: 0 10rpx;
			text-align: center;
			margin-right: 15rpx;
			margin-top: 20rpx;
			width: 145rpx;
			// height: 60rpx;
			line-height: 60rpx;
			background-color: #F5F5F5;
			font-size: 24rpx;
		}
	}



	.categoryListName_line {
		height: 30rpx;
		background: rgba(7, 15, 126, 0.7);
		width: 8rpx;
		float: left;
		margin-top: 35rpx;
	}
</style>
