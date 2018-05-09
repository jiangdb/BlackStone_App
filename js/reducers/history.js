const initialState = {
  historyList:[{
    date: '2018-05-09 14:24:45',
    starCount: 5,
    flavor: [
      { key: 1, name: '茉莉', selected: false },
      { key: 2, name: '莓果', selected: false },
    ],
    accessories: {
      filter: [ { key: 1, name: '泰摩冰瞳滤杯', selected: false }],
      kettle: [ { key: 2, name: '泰摩鱼04', selected: false }]
    },
    comment: 'comment',
    category: '曼特宁',
    ratioWater: 12,
    beanWeight: 20,
    waterWeight: 240,
    temperature: 92,
    grandSize: 3.5,
    totalSeconds: '00:02',
    chartDatas:
      [ { index: 311,
         extract: 0.49928175904788075,
         total: 35.93061056607403 },
        { index: 312,
         extract: 1.1912865923251956,
         total: 39.88195368885063 },
        { index: 313,
         extract: 2.109539131587371,
         total: 33.24918163004331 },
        { index: 314,
        extract: 2.705617620004341,
        total: 44.934450237406416 },
        { index: 315,
        extract: 3.4674064507707953,
        total: 51.02082318812609 },
        { index: 316,
        extract: 4.365903274295851,
        total: 51.342983497446404 }, ],
    actualWaterWeight: '96.5',
    actualRatioWater: 2
  },{
    date: '2018-05-20 14:24:45',
    starCount: 5,
    flavor: [],
    accessories: { filter: [], kettle: [] },
    comment: '',
    category: '曼',
    ratioWater: 12,
    beanWeight: 20,
    waterWeight: 240,
    temperature: 92,
    grandSize: 3.5,
    totalSeconds: '00:02',
    chartDatas:
      [ { index: 311,
         extract: 0.49928175904788075,
         total: 35.93061056607403 },
        { index: 312,
         extract: 1.1912865923251956,
         total: 39.88195368885063 },
        { index: 313,
         extract: 2.109539131587371,
         total: 33.24918163004331 },
        { index: 314,
        extract: 2.705617620004341,
        total: 44.934450237406416 },
        { index: 315,
        extract: 3.4674064507707953,
        total: 51.02082318812609 },
        { index: 316,
        extract: 4.365903274295851,
        total: 51.342983497446404 }, ],
    actualWaterWeight: '96.5',
    actualRatioWater: 2
  }],
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

    default:
      return state;
  }
}

module.exports = history;
