<template>
	<view>
		<view class="citylist">
			<ss-select-city v-model="value" :hot-citys="hotCitys" @on-select="onSelectCity" />
		</view>
	</view>
</template>

<script>
	import ssSelectCity from '../city.vue';
	export default {
		data() {
			return {
				hotCitys: [
					'杭州',
					'天津',
					'北京',
					'上海',
					'深圳',
					'广州',
					'成都',
					'重庆',
					'厦门'
				],
				value: '',
				active: ""
			};
		},
		components: {
			ssSelectCity
		},
		methods: {
			onSelectCity(city) {
				getApp().globalData.city=city
				let pages = getCurrentPages(); //获取所有页面栈实例列表
				let nowPage = pages[pages.length - 1]; //当前页页面实例
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				uni.switchTab  ({
					url: '../../index/index'
				})
			}
		},
		onLoad(option) {
			
		},

	}
</script>

<style lang="scss">

</style>
