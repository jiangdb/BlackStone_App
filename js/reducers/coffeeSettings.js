const initialState = {
    category: '曼特宁',
    ratioWater: 12,
    beanWeight: 20,
    waterWeight: 240,
    temperature: 92,
    grandSize: "3.5",
    timeMintue:30,
    timeSecond:22,
    beanWeightReader: 200,
    waterWeightReader: 200,
    beanCategoryData: [
      {key: '曼特宁'},
      {key: '危地马拉'},
      {key: '巴西'},
      {key: '哥伦比亚'},
      {key: '耶加雪菲'},
      {key: '西达摩'},
      {key: '墨西哥'},
      {key: '云南'},
      {key: '帕卡马拉'},
      {key: '肯尼亚'},
      {key: '蓝山'},
      {key: '瑰夏'},
      {key: '可娜'},
    ]
}
 
import type { Action } from "../actions/types";

function coffeeSettings(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
 
  switch (action.type) {
    case "SAVE_COFFEE_SETTINGS":
      console.log(Object.assign({}, state, action.settings))
      return Object.assign({}, state, action.settings)

    default:
      return state;
  }
}

module.exports = coffeeSettings;
