<!--
 * @Date: 2021-01-15 14:46:49
 * @information: base-map
-->
<template>
  <div id="base-map">
    <div id="container" v-loading="isShowLoading"></div> 

    <div class="map_bottom">
      <div :class="['text_address', {'text_address--error': isShowErrorInfo}]">{{address || '请选择Address'}}</div>
      <el-button  type="success"
                  size='small'
                  @click="onSaveAddress">Save</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import AMap from 'AMap'

import message from '@/mixins/message'

export default defineComponent({
  mixins: [message],
  props: {
    addForm: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {

    }
  },
  setup(props) {
    let isShowLoading = ref(true)
    let isShowErrorInfo = ref(false)
    let address = ref('')
    let lnglat = ref('')

    onMounted(() => {
      createMap() 
    })


    let icon = new AMap.Icon({
      size: new AMap.Size(25, 34),
      image: require('@/assets/poi-marker-default.png'),
      imageSize: new AMap.Size(25, 34),
    })

    let content = '<div class="map_spot">'
        + `<div>${11}</div>`
        // + `<div class="spot_del" onclick="onDelSpot(${lng}, ${lat})">X</div>`
      + '</div>'

    const createMap = () => {
      let prevLnglat = props.addForm.lnglat
      let prevLng = prevLnglat ? prevLnglat.split('_')[0] : ''
      let prevLat = prevLnglat ? prevLnglat.split('_')[1] : ''
      let prevAddress = props.addForm.address
      let marker: any;
      let map = new AMap.Map('container', {
        center: prevLnglat ? [prevLng, prevLat] : undefined, // 设置地图中心点坐标，若缺省，默认定位到所在城市中心
        resizeEnable: false, // 是否监控地图容器尺寸变化，默认值为false
        zoom: 10, // 设置地图显示的缩放级别
      })

      let scale = new AMap.Scale({visible: true})
      let toolBar = new AMap.ToolBar({visible: true})

      map.addControl(scale)
      map.addControl(toolBar)
      
      address.value = prevAddress || ``
      isShowLoading.value = false

      if(prevLnglat) {
  
        marker = new AMap.Marker({
          position: new AMap.LngLat(prevLng, prevLat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: `${address.value}`,
          offset: new AMap.Pixel(-12.5, -34),
          // content,
          icon,
        })
        marker.setMap(map)
      }


      map.on('click', (ev:any) => {

        // 地图上移除当前 Marker
        if(marker) {
          marker.setMap(null)
          marker = null
        }

        // 点击的经度 纬度 
        let {lng, lat} = ev.lnglat

        // 根据经纬度查询地理位置
        let geocoder = new AMap.Geocoder({
          city: "010", //城市设为北京，默认：“全国”
          radius: 1000 //范围，默认：500
        })

        geocoder.getAddress(([lng, lat]), (status: string, result: any) => {
          if (status === 'complete'&& result.regeocode) {
            isShowErrorInfo.value = false
            address.value = result.regeocode.formattedAddress
            lnglat.value = `${lng}_${lat}`
          } else {
            isShowErrorInfo.value = true
            address.value = `根据经纬度查询地址失败`
            lnglat.value = ``
          }
        })

        marker = new AMap.Marker({
          position: new AMap.LngLat(lng, lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: `${address.value}`,
          offset: new AMap.Pixel(-12.5, -34),
          // content,
          icon,
        })
        marker.setMap(map)

      })
    }


    return {
      address,
      lnglat,
      isShowErrorInfo,
      isShowLoading,
    }

  },
  methods: {
    onSaveAddress() {
      let {address, lnglat, isShowErrorInfo} = this
      if(!address || isShowErrorInfo) {
        this.showMessage(2, '请添加国内地点')
        return;
      }
      this.$emit('onSaveAddress', {address, lnglat})
    },
  },
})
</script>

<style lang="scss">
#base-map { 
  text-align: center;

  #container {
    width: 930px;
    height: 600px;
    margin: 0 auto;

    .map_spot {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #ff6700;
      line-height: 30px;
      color: #fff;
      font-size: 12px;
      text-align: center;
      position: relative;

      &:hover {
        .spot_del {
          display: block;
        }
      }
    }
    
    .spot_del {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: #ccc;
      line-height: 15px;
      text-align: center;
      font-size: 12px;
      color: #fff;
      position: absolute;
      top: -4px;
      right: -4px;
      font-size: 12px;
      display: none;

      &:hover {
        background-color: #666;
      }
    }
  }  

  .map_bottom {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  .text_address {
    font-size: 16px;
  }

  .text_address--error {
    color: red;
  }



}
</style>