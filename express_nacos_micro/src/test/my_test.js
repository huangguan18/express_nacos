import CommonUtils from '../utils/CommonUtils.js';
import CryptoUtil from '../utils/CryptoUtil.js';

let aaa = '我爱我的祖国！！';

let result = CommonUtils.autoAddEllipsis(aaa, 4);

console.log(result);

console.log(CryptoUtil.MD5("123"));


let str = '我是谁';
let sec = "abcdabcdabcdabcd";
let enc = CryptoUtil.aesEncrypt(str,sec);
console.log('aes enc:',enc);
let dec = CryptoUtil.aesDecrypt(enc,sec);
console.log('aes dec:',dec);

let benc = CryptoUtil.base64Encode(aaa);
console.log('base64 enc:',benc);
let bdec = CryptoUtil.base64Decode(benc);
console.log('base64 dec:',bdec);