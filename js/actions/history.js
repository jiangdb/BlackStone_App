
import fetch from 'cross-fetch';

let HOST = "https://bs.ziipoo.com.cn/api/v2"
let API_WORK_STORE = "/work"
let API_WORK_LIST = "/work"
let API_WORK_SHOW = "/work/"
let API_WORK_DELETE = "/work/"

let token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlzcyI6Imh0dHBzOi8vYnMuemlpcG9vLmNvbS5jbi9hcGkvdjIvdXNlci9sb2dpbiIsImlhdCI6MTUyNzIzNzI3MSwiZXhwIjoxNTI3MzIzNjcxLCJuYmYiOjE1MjcyMzcyNzEsImp0aSI6InM2bXJRQm9NMjFUS085ZzAifQ.46OhYsvsjI9v518QXFyom8jSrzvV1lSx5Y3ELgvyBqg'

function storeWork(work) {
  // if (!token) return;
		console.log('storeWork')
	return function (dispatch) {
	  	return fetch(HOST + API_WORK_STORE,{
		    method: 'GET',
		    header: {
		      'content-type': 'application/json',
		      'Authorization': token
		    },
		    body: JSON.stringify({
				device: work.device,
      			bean_category: work.category,
				bean_weight: work.beanWeight,
				water_ratio: work.ratioWater,
				water_weight: work.waterWeight,
				grand_size: work.grandSize,
				temperature: work.temperature,
				work_time: work.totalSeconds,
				rating: work.starCount,
				flavor: work.flavor,
				accessories: work.accessories,
				feeling:  work.comment,
				data: JSON.stringify(work.chartDatas),
				started_at: work.date,
			})
	  	})
	  	.then((response)=>response.json())
	    .then((responseData)=>{
	    	console.log(responseData)
	    })
	    .catch(err => {
			console.log(err.message)
		})
	}
}

module.exports = {
  storeWork: storeWork,
}