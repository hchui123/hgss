// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    return await db.collection(event.collection).where(event.where).skip(event.skip).orderBy('title','asc').limit(event.limit).get()
    .then(res=>{
      return res
    })
}