

function countTime(endTime){

  //现在时间戳
  let now = new Date().getTime()

  //设置时间戳
  let end = new Date(endTime).getTime()
  
  //距离结束的毫秒数
  let time = (end - now) / 1000

  if(time <= 0){
      return "00天00时00分00秒"
  }

  // 获取天、时、分、秒
  let day = parseInt(time / (60 * 60 * 24));
  let hou = parseInt(time % (60 * 60 * 24) / 3600);
  let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
  let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
  
  //单位数补零
  day = day < 10 ? "0" + day : day
  hou = hou < 10 ? "0" + hou : hou
  min = min < 10 ? "0" + min : min
  sec = sec < 10 ? "0" + sec : sec

  return day + ' '+ '天' + ' ' + hou +' '+ "时" +' '+ min + ' ' + "分"+ ' ' + sec +' '+ "秒"

}

module.exports. countTime = countTime