/**
"longitude":113.33361952039931,"latitude":23.13224799262153,"deviceId":"812FC254-995D-48C2-9058-38E6A7873D41","altitude":"77.19913482666016","verticalAccuracy":"57.17357635498047"
*/

const req = $request
$notification.post("body", req.body)
let b = JSON.parse(req.body)


switch(b.type){
	case 1:
	 b.longitude = $persistentStore.read('longitude')*1
		b.latitude = $persistentStore.read('latitude')*1
		break
	case 2:
	 b.longitude = fillDecimal('112.3263', b.longitude)
		$persistentStore.write(b.longitude, 'longitude')
		b.latitude = fillDecimal('22.1241', b.latitude)
		$persistentStore.write(b.latitude, 'latitude')
		break
	default:
	 $done({})
}
req.body = JSON.stringify(b)
$notification.post("modified", req.body)
$done(req)

/**
 * @param {string|number} strA 源坐标，保留整数+前N位小数
 * @param {string|number} strB 参考坐标，截取小数尾部补全
 * @returns {number} 最终结果，Number数字类型
 */
function fillDecimal(strA, strB) {
    // 统一转为字符串处理
    const sA = String(strA);
    const sB = String(strB);

    // 拆分整数、小数部分
    const [intA, decA = ""] = sA.split('.');
    const [, decB = ""] = sB.split('.');

    const decALen = decA.length;
    // 截取B小数部分，从decALen位置开始的尾部
    const tail = decB.slice(decALen);

    // 拼接完整字符串，再转为Number
    const resultStr = `${intA}.${decA}${tail}`;
    return Number(resultStr);
}