<template>
  <div class="amap-page-container">
    <div class="toolbar">position: [{{ lng }}, {{ lat }}] address: {{ address }}</div>
  <!--
    <el-amap-search-box
      class="search-box"
      :search-option="searchOption"
      :on-search-result="onSearch"
    ></el-amap-search-box>-->
    <div class="search-box">
     <a-select style="width: 120px;border-radius:50px;" @change="handleChange">
      <a-select-option value="jack">
      </a-select-option>
      <a-select-option value="lucy">
        上海
      </a-select-option>
      <a-select-option value="disabled" disabled>
        Disabled
      </a-select-option>
      <a-select-option value="Yiminghe">
        yiminghe
      </a-select-option>
    </a-select>
     <a-select default-value="lucy" style="width: 120px" @change="handleChange">
      <a-select-option value="jack">
        Jack
      </a-select-option>
      <a-select-option value="lucy">
        Lucy
      </a-select-option>
      <a-select-option value="disabled" disabled>
        Disabled
      </a-select-option>
      <a-select-option value="Yiminghe">
        yiminghe
      </a-select-option>
    </a-select>
    </div>
    <el-amap vid="amapDemo" :center="center" :zoom="zoom" class="amap-demo" :events="events">
      <el-amap-marker
        :position="marker.position"
        :events="marker.events"
        :visible="marker.visible"
        :draggable="marker.draggable"
        :icon="icon"
      ></el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
// 初始化vue-amap
import Vue from "vue";
import VueAMap from "vue-amap";
import icons from "@/assets/car.png"
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: "a492d59ca7c73a6aecaadac8d64fa00e",
  plugin: [
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.Geolocation",
    "AMap.Geocoder",
    "AMap.AMapManager",
    "AMap.Marker"
  ],
  v: "1.4.4"
});


export default {
  data() {
    let self = this;
    return {
      zoom: 20,
      icon:icons,
      center: [113.657829, 34.745795],
      searchOption: {
        city: "全国",
        citylimit: true
      },
      marker: {
        position: [113.657829, 34.745795]
      },
      address: "",
      events: {
        click(e) {
          var { lng, lat } = e.lnglat;
          self.lng = lng;
          self.lat = lat;
          self.marker.position = [lng, lat];
          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
          });
          geocoder.getAddress([lng, lat], function(status, result) {
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                self.address = result.regeocode.formattedAddress;
                self.$nextTick();
              }
            }
          });
        }
      },
      lng: 0,
      lat: 0
    };
  },
  methods: {
    onSearch(pois) {
      console.log(pois, "pois");
      let lng = pois[0].lng;
      let lat = pois[0].lat;
      this.center = [lng, lat];
      this.marker.position = [lng, lat];
    },
    handleChange(val){
      console.log(val);
    }
  }
};
</script>
<style lang="less">
 /deep/ .ant-select-selection {
     border-radius: 50px;
 }
.el-vue-amap-container.amap-demo {
  width: 100%;
  height: 600px;
}
.search-box {
  position: absolute;
  top: 60px;
  left: 30px;
  z-index: 1;
}
.amap-page-container {
  position: relative;
}
</style>