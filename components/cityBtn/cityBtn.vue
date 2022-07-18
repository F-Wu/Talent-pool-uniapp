<template>
	<view>
		<navigator url="../../pages/city/choosecity/choosecity">
			<text class="text-l ">{{city}} <text class="iconfont icon-xiangxia" style="font-size: 25rpx;">
				</text></text>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				city:'城市'
			}
		},
		methods: {
			onLoad(potions) {
				if (potions.city != null) {
					this.city = potions.city
				}
				if (potions.occupation != null) {
					this.occupation = potions.occupation
				}
			},
		}
	}
</script>

<style>

</style>
