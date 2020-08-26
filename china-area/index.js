
// 所有数据
let REGION_DATA;
// 区域编码转区域文字
const CODE_TO_TEXT = {};
// 区域文字转区域编码
const TEXT_TO_CODE = {};
// 编码获取省市区所有信息
const CODE_TO_ALL = {};
// 省份对象
let provinceInfo;
// 全国地区数据
const regionData = [];

// 获取数据
fetch('./china-area-data.json')
  .then(res => res.json())
  .then(res => {
    REGION_DATA = res;
    provinceInfo = REGION_DATA['86'];
    getProvinceData();
    getCityData();
    getAreaData();
  })

// 计算省
function getProvinceData(){
  for (const provinceCode in provinceInfo){
    const provinceText = provinceInfo[provinceCode];
    regionData.push({
      label: provinceText,
      value: provinceCode
    })
    CODE_TO_TEXT[provinceCode] = provinceText;
    TEXT_TO_CODE[provinceText] = provinceCode;
    CODE_TO_ALL[provinceCode] = { label: provinceText, value: provinceCode, parent: null };
  }
}

// 计算市
function getCityData(){
  regionData.forEach(item => {
    const provinceCode = item.value;
    const provinceChildren = []
    const cityData = REGION_DATA[provinceCode];
    for (const cityCode in cityData){
      const cityText = cityData[cityCode];
      provinceChildren.push({
        label: cityText,
        value: cityCode
      })
      CODE_TO_TEXT[cityCode] = cityText;
      TEXT_TO_CODE[cityText] = cityCode;
      CODE_TO_ALL[cityCode] = { label: cityText, value: cityCode, parent: provinceCode };
    }
    provinceChildren.length && (item.children = provinceChildren);
  })
}

// 计算区
function getAreaData(){
  regionData.forEach(item => {
    const provinceChildren = item.children;
    if (!provinceChildren) return;
    provinceChildren.forEach(city => {
      const cityCode = city.value;
      const cityChildren = []
      const areaData = REGION_DATA[cityCode];
      for (const areaCode in areaData){
        const areaText = areaData[areaCode];
        cityChildren.push({
          label: areaText,
          value: areaCode
        })
        CODE_TO_TEXT[areaCode] = areaText;
        TEXT_TO_CODE[areaText] = areaCode;
        CODE_TO_ALL[areaCode] = { label: areaText, value:areaCode, parent: cityCode};
      }
      cityChildren.length && (city.children = cityChildren);
    })
  })
}

new Vue({
  el:'#app',
  name:'app',
  data:{
    data:[],
    regionData
  }
})

