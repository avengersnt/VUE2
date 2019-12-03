import Api from './index'

export default {
  testPosting (lat, lng) {
    const item = { lat:  lat,
                   lng:  lng}
    return Api().post('/test', item)
  },
  // 他の処理も追加可能
 testGet(){
 return Api().get('/test')

}
}
