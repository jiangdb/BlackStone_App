const initialState = {
  historyList:[],
  //history item object format
  // {
  //   date: '2018-05-09 14:24:45',
  //   starCount: 5,
  //   flavor: [
  //     { key: 1, name: '茉莉', selected: false },
  //     { key: 2, name: '莓果', selected: false },
  //   ],
  //   accessories: {
  //     filter: [ { key: 1, name: '泰摩冰瞳滤杯', selected: false }],
  //     kettle: [ { key: 2, name: '泰摩鱼04', selected: false }]
  //   },
  //   comment: 'comment',
  //   category: '曼特宁1',
  //   ratioWater: 12,
  //   beanWeight: 20,
  //   waterWeight: 240,
  //   temperature: 92,
  //   grandSize: 3.5,
  //   totalSeconds: '00:02',
  //   chartDatas:
  //     [ { index: 311,
  //        extract: 0.49928175904788075,
  //        total: 35.93061056607403 },
  //       { index: 312,
  //        extract: 1.1912865923251956,
  //        total: 39.88195368885063 } ],
  //   actualWaterWeight: '96.5',
  //   actualRatioWater: 2
  // }
}
 
import type { Action } from "../actions/types";

function history(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
 
  switch (action.type) {
    case "SAVE_RECORD":
      return {
        historyList:[
         ...state.historyList,
         action.record
        ]
      }

    case "REMOVE_RECORD":
      let newHistoryList = state.historyList;
      newHistoryList.splice(action.recordIndex,1);

      return Object.assign({}, state, {
        historyList: newHistoryList
      });

    case "SAVE_SHARE_URL":
      let historyList = state.historyList;
      let historyItem = historyList[action.url.index]

      historyItem = Object.assign({}, historyItem, {
        id: action.url.id,
        shareUrl: action.url.shareUrl,
      });
      historyList.splice(action.url.index, 1, historyItem);

      return Object.assign({}, state, {
        historyList: historyList
      });

    default:
      return state;
  }
}

module.exports = history;
