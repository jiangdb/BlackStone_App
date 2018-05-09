const initialState = {
  data: [
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

function beanCategory(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
 
  switch (action.type) {
    case "SAVE_BEAN_CATEGORY":
      return Object.assign({}, state, {
        data: [
          ...state.data,
          action.category
        ]
      })

    default:
      return state;
  }
}

module.exports = beanCategory;
