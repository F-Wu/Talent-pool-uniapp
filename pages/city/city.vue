<template>
  <view class="select-city-wrap">
    <view class="select-city">
      <view class="index">
		  <scroll-view scroll-y="true" class="SV_categoryTitle">
		  	<view class="categoryTitle">
				<view class="categoryName" @click="scrollTo('#')">#</view>
		  		<view class="categoryName"  v-for="(item,index) in cityData"
          :key="item.letter"  @click="scrollTo(item.letter,index)"
		   :class="categoryNameActive == index?'categoryNameActive':''">
		  			{{item.letter}}
		  		</view>
		  	</view>
		  </scroll-view>
     <!--   <view class="index-items" @click="scrollTo('#')">#</view>
       <view
          class="index-item"
          v-for="item in cityData"
          :key="item.letter"
          @click="scrollTo(item.letter)"
          >{{ item.letter }}</view
        > -->
      </view>
      <scroll-view
        :scroll-into-view="scrollIntoId"
        :scroll-y="true"
        :scroll-with-animation="true"
        :style="{ height: windowHeight }"
		class="scroll-Y"
      >
        <view class="content">
          <view class="section" id="current" v-if="current">
            <view class="city-title">当前城市</view>
            <view class="city-list">
              <view class="city-item">{{ current }}</view>
            </view>
          </view>
          <view class="section" id="hot" v-if="hotCitys.length">
            <view class="city-title">热门城市</view>
            <view class="city-list">
              <view
                class="city-item"
                :class="{ active: current === city }"
                v-for="(city, index) in hotCitys"
                :key="index"
                @click="onSelect(city)"
                >{{ city }}</view
              >
            </view>
          </view>
          <view
            class="section"
            :id="item.letter"
            v-for="item in cityData"
            :key="item.letter"
          >
            <view class="letter">{{ item.letter }}</view>
            <view class="city-list">
              <view
                class="city-item"
                :class="{ active: current === city }"
                v-for="(city, i) in item.list"
                :key="i"
                @click="onSelect(city)"
                >{{ city }}</view
              >
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import cityData from './cityData'

export default {
  props: {
    hotCitys: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: String
    }
  },
  data() {
    return {
      cityData,
      windowHeight: '',
      scrollIntoId: '',
	  categoryNameActive: 0, //当前选中active
    }
  },
  computed: {
    current: {
      get() {
        return this.value
		
      },
      set(e) {
        return e
      }
    }
  },
  mounted() {
    this.getSystemInfo()
  },
  methods: {
    getSystemInfo() {
      uni.getSystemInfo().then(([error, data]) => {
        this.windowHeight = `${data.windowHeight}px`
      })
    },
    scrollTo(letter,index) {
		this.categoryNameActive = index;
      this.scrollIntoId = letter === '#' ? 'current' : letter
	  console.log(this.scrollIntoId)
    },
    onSelect(city) {
      this.current = city
	  
	  // uni.navigateTo({
	  // 	url: '../index/index?city=' +city
	  // })
      this.$emit('input', city)
      this.$emit('on-select', city)
    },
	// GETcity(){
	// 	uni.request({
	// 		url:'/api/city',
	// 		method:'GET'
	// 	}).then(res => {
	// 		console.log(res.data)
	// 				let info = res[1].data
	// 				if (info.status == 0) {
	// 					this.Likses = info.result;
						
	// 				} else {
	// 					console.log(info.msg)
	// 				}
	// 			})
	// }
  },
  onLoad() {
  	// this.GETcity()
  }
}
</script>

<style lang="scss" scoped>
.select-city-wrap {
  position: relative;
  padding: 0 30upx;
  background-color: #fff;
  .select-city {
    .index {
      position: absolute;
      left: 0;
      // bottom: 20upx;
      // z-index: 999;
	  border-right: 1px solid #ccc;
      color: #45CFFE;
      font-size: 32upx;
      .index-item {
       width: 100%;
       text-align: center;
       height: 100rpx;
       line-height: 100rpx;
       color: #3E3E3E;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
      }
    }
    .section {
      margin-bottom: 19upx;
      .city-title {
        color: #333;
        font-size: 28upx;
        margin-bottom: 28upx;
      }
      .letter {
        width: 44upx;
        height: 44upx;
        color: #fff;
        border-radius: 100%;
        background-color: #45CFFE;
        font-size: 28upx;
        line-height: 44upx;
        text-align: center;
        margin-bottom: 30upx;
      }
      .city-list {
        display: flex;
        flex-wrap: wrap;
        .city-item {
          width: 190upx;
          height: 55upx;
          margin-right: 36upx;
          margin-bottom: 28upx;
          line-height: 55upx;
          text-align: center;
          border: 1px solid #dcdcdc;
          border-radius: 6upx;
          color: #545454;
          font-size: 28upx;
          &.active {
            border-color: #45CFFE;
            color: #45CFFE;
          }
        }
      }
    }
  }
}
.SV_categoryTitle {
		width: 200rpx;
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
		width: 500rpx !important;
		float: left;
		// background-color: rgba(224, 224, 224, 0.5);
		margin-left: 200rpx;
	}
</style>
