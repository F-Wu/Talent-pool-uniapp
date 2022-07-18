<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		// 全局变量
		globalData:{
			city:'城市',
			occupation:'职业',
			Likes:[],
			status:true,
			user:{
				phone:'',
				password:''
			},
			logintf:true
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
