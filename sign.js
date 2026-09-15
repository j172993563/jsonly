/**
"longitude":113.33361952039931,"latitude":23.13224799262153,"deviceId":"812FC254-995D-48C2-9058-38E6A7873D41","altitude":"77.19913482666016","verticalAccuracy":"57.17357635498047"
*/

const req = $request
$notification.post("body", req.body)
let b = JSON.parse(req.body)
const [c,d] = generate8DigitRandom(2)

switch(b.type){
	case 1:
	  b.longitude = $persistentStore.read('longitude')*1
		b.latitude = $persistentStore.read('latitude')*1
		b.altitude = "20.199134" + c
		b.verticalAccuracy = "57.173576" + d
		break
	case 2:
	  b.longitude = Number('113.326204' + c)
		$persistentStore.write(b.longitude, 'longitude')
		b.latitude = Number('23.124189' + d)
		$persistentStore.write(b.latitude, 'latitude')
		break
	default:
	  $done({})
}
req.body = JSON.stringify(b)
$notification.post("modified", req)
$done(req)

function generate8DigitRandom(count = 1, len = 8) {
  const result = [];
  for (let i = 0; i < count; i++) {
    // 生成 0 ~ 99999999 随机整数，转字符串后补 0 至 8 位
    const randomNum = Math.floor(Math.random() * 100000000);
    const DigitStr = randomNum.toString().padStart(len, '0');
    result.push(DigitStr);
  }
  return result;
}