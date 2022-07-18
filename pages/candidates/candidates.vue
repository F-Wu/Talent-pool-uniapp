<template>
	<view class="news">
		<!-- <view class="bgm">
			<image :src="information[0].img" style="width: 100%;"></image>
		</view> -->
		<view class="onliner">

			<!-- 个人信息 -->
			<view class="information" v-for="(item,index) in information" :key="index">
				<view class="myname">
					<view class="name">
						<view><text>{{item.name}}</text></view>
						<view>{{item.work}}·{{item.education_name}}</view>
					</view>
					<view class="img">
						<image :src="item.img" mode="" v-if="item.img"></image>
						<image src="https://img.51miz.com/Element/00/82/12/59/dd7490d5_E821259_0f069bbc.png" mode="" v-else></image>
					</view>
				</view>
				<view class="state">
					<view class="state-title">
						离职-随时到岗
					</view>
					<view class="personal">
						<view><text class="iconfont icon-gongwenbao1"
								style="font-size: 30rpx;"></text><text>{{item.expect}}</text>
						</view>
						<view><text class="iconfont icon-xueshimao"
								style="font-size: 30rpx;"></text><text>{{item.education}}</text></view>
						<view><text class="iconfont icon-shengrix"
								style="font-size: 30rpx;"></text><text>{{item.age}}岁</text>
						</view>
					</view>
<!-- 					<view class="statetext">
						熟悉掌握html5,css3,JavaScriptjquery等专业技能。
						熟悉Vue框架、uni-app框架、微信小程序开发和Bootstrap框架、vant组件、Element插件。
						熟悉git与svn版本管理。在校期间担任过前端开发小组组长，积极参加社团各种活动个比赛,我性格比较活泼开朗,做事认真,执着。
						对前端新技术，框架有着强烈兴趣。
					</view> -->
					<view class="enclosure">
						<view class="iconfont icon-DOCtubiao"
							style="font-size: 80rpx; color: #45CFFE;margin-left: 20rpx;">
						</view>
						<view class="enctext" @click="collection()" >
							<view>该应聘者已上传联系方式</view>
							<text>沟通获取</text>
						</view>
					</view>
				</view>

			</view>

			<!-- 求职期望 -->
			<view class="expect">
				<view class="expect-top">
					<text class="exp-info"><text class="iconfont icon-dian"
							style="color: #45CFFE;margin-right: 5rpx;"></text>求职期望</text>
				</view>
				<view class="expect-lower" v-for="(item,index) in expect" :key="index">
					<view class="lower-l">
						<view><text>{{item.occupation}}</text></view>
						<view><text>{{item.city}}</text><text></text></view>
					</view>
					<view><text style="font-size: 35rpx; font-weight: 700; color: #45CFFE;">{{item.salary}}</text>
					</view>
				</view>
			</view>

			<!-- 工作经历 -->
			<view class="experience">
				<view class="expect-top">
					<text class="exp-info"><text class="iconfont icon-dian"
							style="color: #45CFFE;margin-right: 5rpx;"></text>个人经历</text>
				</view>
				<view v-for="(item,index) in work_experience" :key="index">
					<view class="corporatename">
						<text>{{item.company}}</text>
						<text>{{item.data}}</text></text>
					</view>
					<view class="position">
						<text>{{item.position}}</text>
					</view>
					<view class="jobcontent">
						{{item.job_content}}
					</view>
					<!-- <view class="skill">
						<view>JavaScript</view>
						<view>HTML5</view>
						<view>css3</view>
					</view> -->
					<view class="achievement" v-if="item.achievement">
						<text>工作成就</text>
						<view class="jobcontent">{{item.achievement}}</view>
					</view>
				</view>
			</view>

			<!-- 项目经历 -->
			<view class="experience">
				<view class="expect-top">
					<text class="exp-info"><text class="iconfont icon-dian"
							style="color: #45CFFE;margin-right: 5rpx;"></text>项目经历</text>
				</view>
				<view v-for="(item,index) in project" :key="index">
					<view class="corporatename">
						<text>{{item.project_name}}</text>
						<text>{{item.data}}</text>
					</view>
					<view class="position">
						<text>{{item.role}}</text>
					</view>
					<view class="jobcontent">
						{{item.describet}}
					</view>
				</view>
			</view>

			<!-- 教育经历 -->
			<view class="education">
				<view class="expect-top">
					<text class="exp-info"><text class="iconfont icon-dian"
							style="color: #45CFFE;margin-right: 5rpx;"></text>教育经历</text>
				</view>
				<view class="ednname" v-for="(item,index) in education" :key="index">
					<view class="ednname-l">
						<view>{{item.project_name}}</view>
						<view>{{item.describe}}<text>{{item.role}}</text></view>
					</view>
					<view class="time">{{item.data}}
					</view>
				</view>
			</view>
			<view class="education">
				<view class="expect-top">
					<text class="exp-info"><text class="iconfont icon-dian"
							style="color: #45CFFE;margin-right: 5rpx;"></text>资格证书</text>
				</view>
				<view class="certificate" v-for="(item,index) in education" :key="index">
					<text>{{item.education}}</text>
				</view>
			</view>
			<!-- 设计作品 -->
			<view class="custom">
				<view class="cus-title">
					<text class="iconfont icon-dian" style="color: #45CFFE;margin-right: 5rpx;"></text>设计作品
				</view>
				<!-- 轮播图展示 -->
				<view class="crayimg" >
					<view class="cray" v-for="(item,index) in work_experience" :key="index">
						<image :src="item.work_img" mode="" @click="clickImg(item.work_img)" />
					</view>
				</view>
				<video id="myVideo" :src="work_experience[0].video" @fullscreenchange="fullscreenchange()"
					v-if="work_experience[0].video"></video>
				<view v-else>
					<text>暂无作品</text>
				</view>
			</view>

		</view>
		<view class="previews">
			<view class="communicate" @click="collection()" v-if="houde==true">立即沟通</view>
			<view class="communicate" v-else>
				<text v-if="status==true">{{contact}}</text>
				<text v-else>联系方式隐藏</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				informationID: '',
				contact: '',
				information: null, //个人信息·
				education: null, //教育
				expect: null, //期望
				project: null, //项目，
				num: false,
				houde: true,
				work_experience: null, //工作经历
				videoUrl: 'http://1252463788.vod2.myqcloud.com/95576ef5vodtransgzp1252463788/e1ab85305285890781763144364/v.f10.mp4',
				status: null
			};
		},
		methods: {
			GETdata(numder) {
				uni.request({
					url: '/api/details',
					method: 'GET',
					data: {
						id: numder
					}
				}).then((res) => {
					// console.log(res[1].information)
					var data = res[1].data
					this.information = data.information
					this.contact = data.information[0].contact
					this.informationID = data.information[0].id
					this.education = data.education
					this.expect = data.expect
					this.project = data.project
					this.work_experience = data.work_experience
					console.log(data.work_experience)
				})
			},
			// 收藏 
			collection() {
				let a = 10;
				let obj = {
					a: 30
				};
				console.log(getApp().globalData.user)
				if (getApp().globalData.user.phone == '') {
					setTimeout(
						uni.switchTab({
							url: '../user/user'
						}), 20000)

				} else {
					uni.showToast({
						title: this.contact,
						duration: 5000
					});
					uni.request({
						url: '/api/collection',
						method: 'GET',
						data: {
							id: this.informationID,
							phone: getApp().globalData.user.phone,
							password: getApp().globalData.user.password
						}
					}).then((res) => {
						uni.showToast({
							title: this.contact,
							duration: 5000
						});
						this.num = true
						getApp().globalData.Likes.push(res[1].data.likes.pop())
						console.log(getApp().globalData.Likes)
						// console.log(res[1].data.likes)
					})
				}
			},
			// 点击查看大图
			clickImg(img) {
				wx.previewImage({
					urls: [img], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
					current: '', // 当前显示图片的http链接，默认是第一个
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			fullscreenchange(e) {
				if (!e.detail.fullScreen) {
					this.videoContext.stop()
				}
			},
			// 点击收藏
			collect() {
				this.num = !this.num
				// getApp().globalData.user.Likes.push(this.informationID+',')
			},
			tishi() {
				uni.showToast({
					title: '请登录',
					duration: 5000
				});
				uni.switchTab({
					url: '../user/user'
				})

			}
		},
		onLoad(e) {
			// this.informationID=e.id
			this.GETdata(e.id)
			if (e.houde != undefined) {
				this.houde = e.houde
			} else {
				this.houde = true
			}
			console.log(e.houde)
			this.status = getApp().globalData.status
		},
		// onReady: function() {
		// 	this.videoContext = uni.createVideoContext('myVideo', this);
		// 	this.videoContext.requestFullScreen();
		// }

	}
</script>

<style lang="scss">
	.news {
		background-color: #ececec;
	}

	.onliner {
		margin: 10rpx auto;
		width: 95%;
		padding: 0 18rpx;
		padding-bottom: 30rpx;
		background-color: #FFFFFF;
	}

	.myname {
		width: 100%;
		border-bottom: 2rpx solid #dcdcdc;
		// border-radius: 10px;
		// margin-bottom: 3px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 40rpx 0;

		.name {
			view:nth-child(1) {
				font-size: 40rpx;
				font-weight: 700;
			}

			view:nth-child(2) {
				margin-top: 10rpx;
				font-size: 30rpx;
				color: #8c8c8c;
			}
		}

		.img {
			width: 150rpx;
			height: 150rpx;
			border-radius: 50%;
			background-color: #F8F8F8;

			image {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
	}


	.state {
		width: 100%;
		border-bottom: 2rpx solid #dcdcdc;
		padding: 40rpx 0;

		.state-title {
			font-size: 35rpx;
		}

		.personal {
			width: 100%;
			height: 80rpx;
			display: flex;
			align-items: center;
			font-size: 30rpx;
			color: #8F8F94;

			view {
				margin-right: 30rpx;

				text {
					margin-right: 10rpx;
				}
			}
		}

		.statetext {
			font-size: 30rpx;
			color: #8F8F94;
		}

		.enclosure {
			margin-top: 30rpx;
			width: 100%;
			height: 200rpx;
			background-color: #FFFFFF;
			box-shadow: 1rpx 1rpx 20rpx #e2e2e2;
			display: flex;
			align-items: center;

			.enctext {
				font-size: 35rpx;
				margin-left: 30rpx;

				view {
					color: #222222;
				}

				text {
					color: #45CFFE;
					margin-top: 10rpx;
					font-size: 30rpx;
				}
			}
		}
	}

	.expect {
		width: 100%;
		border-bottom: 2rpx solid #dcdcdc;
		padding: 40rpx 0;

		.expect-top {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.exp-info {
				font-size: 35rpx;
				font-weight: 600;
			}
		}

		.expect-lower {
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.lower-l {
				view:nth-child(1) {
					font-size: 30rpx;
					font-weight: 700;

					text {
						margin-left: 10rpx;
					}
				}

				view:nth-child(2) {
					font-size: 28rpx;
					color: #808080;

					text {
						margin-left: 10rpx;
					}
				}
			}
		}
	}

	.experience {
		width: 100%;
		border-bottom: 2rpx solid #dcdcdc;
		padding: 40rpx 0;

		.expect-top {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.exp-info {
				font-size: 35rpx;
				font-weight: 600;
			}
		}

		.corporatename {
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			text:nth-child(1) {
				font-size: 28rpx;
				font-weight: 700;
			}

			text:nth-child(2) {
				font-size: 28rpx;
				color: #999999;
			}
		}

		.achievement {
			margin-top: 20rpx;
			align-items: center;
			justify-content: space-between;

			text:nth-child(1) {
				font-size: 28rpx;
				font-weight: 700;
			}
		}

		.position {
			margin-top: 10rpx;
			font-size: 28rpx;
			color: #808080;

			text {
				margin-left: 10rpx;
			}

			text:nth-child(3) {
				padding: 0rpx 10rpx;
				border: 2rpx solid #45CFFE;
				border-radius: 10rpx;
				color: #45CFFE;
				font-size: 25rpx;
			}
		}

		.jobcontent {
			margin-top: 30rpx;
			width: 100%;
			font-size: 30rpx;
			color: #808080;
		}

		.skill {
			margin-top: 20rpx;
			font-size: 25rpx;
			display: flex;
			align-items: center;

			view {
				padding: 5rpx 10rpx;
				background-color: #F5F5F5;
				margin-left: 10rpx;
			}
		}
	}

	.education {
		width: 100%;
		border-bottom: 2rpx solid #dcdcdc;
		padding: 40rpx 0;

		.expect-top {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.exp-info {
				font-size: 35rpx;
				font-weight: 600;
			}
		}

		.ednname {
			margin-top: 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.ednname-l {
				view:nth-child(1) {
					font-size: 30rpx;
					font-weight: 700;
				}

				view:nth-child(2) {
					font-size: 28rpx;
					color: #808080;
				}
			}
		}

		.time {
			font-size: 28rpx;
			color: #808080;
		}
	}

	.certificate {
		margin-top: 30rpx;
		font-size: 25rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		text {
			padding: 5rpx 10rpx;
			background-color: #F5F5F5;
			margin-left: 10rpx;
			margin: 10rpx;
		}
	}

	.custom {
		width: 100%;
		border-bottom: 2rpx solid #dcdcdc;
		padding: 40rpx 0;
		padding-bottom: 100rpx;

		.cus-title {
			font-size: 35rpx;
			font-weight: 700;
			margin-bottom: 20rpx;
		}

		.crayimg {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			width: 100%;

			.cray {
				width: 80%;
				// height: 100%;
				overflow: hidden;

				image {
					width: 100%;
				}
			}
		}

	}

	.preview {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 150rpx;
		text-align: center;
		line-height: 80rpx;

		view:nth-child(1) {
			width: 220rpx;
			height: 80rpx;
			border: 2rpx solid #45CFFE;
			color: #45CFFE;
			font-size: 30rpx;
			border-radius: 8rpx;
		}

		view:nth-child(2) {
			width: 450rpx;
			height: 82rpx;
			background-color: #45CFFE;
			color: #FFFFFF;
			font-size: 30rpx;
			border-radius: 8rpx;
		}

	}

	.previews {
		width: 100%;
		position: fixed;
		height: 130rpx;
		text-align: center;
		line-height: 80rpx;
		display: flex;
		z-index: 2;
		justify-content: center;
		align-items: center;
		// margin: 0 auto;
		background-color: #ffffff;
		bottom: 0px;

		.communicate {
			width: 600rpx;
			height: 72rpx;
			background-color: #45CFFE;
			color: #FFFFFF;
			font-size: 30rpx;
			border-radius: 8rpx;
			margin-left: 20px;
		}
	}

	// 视频
	#myVideo {
		width: 100%;
		height: 450rpx;
	}
</style>
