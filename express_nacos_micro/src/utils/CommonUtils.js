import moment from 'moment';
import ip from 'ip';

class CommonUtils {
    /**
     * 异步延迟
     * @param {number} time 延迟的时间,单位毫秒
     */
    static async sleep(time = 0) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time);
        })
    };
    /**
     * 把日期转换为默认中国长格式的日期字符串，如果不传递就默认当前时间
     * @param {Date(),String} indate 
     * @param {String} informat 
     * @param {String} outformat 
     */
    static toDateString(indate = null, informat = null, outformat = null) {
        if (indate && informat) {
            let mm = moment(indate, informat);
            return outformat ? mm.format(outformat) : mm.format('YYYY-MM-DD HH:mm:ss');
        } else if (indate) {
            let mm = moment(indate);
            return outformat ? mm.format(outformat) : mm.format('YYYY-MM-DD HH:mm:ss');
        } else if (outformat) {
            return moment().format(outformat);
        } else {
            return moment().format('YYYY-MM-DD HH:mm:ss');
        }
    };

    /*
 * 判断是否为全角
 *
 * pChar:长度为1的字符串
 * return: true:全角
 *        false:半角
 */
    static isFull(pChar) {
        if ((pChar.charCodeAt(0) > 128)) {
            return true;
        }
        return false;
    }

    /** * 处理过长的字符串，截取并添加省略号
    * 注：半角长度为1，全角长度为2
    *  **/
    static autoAddEllipsis(pStr, pLen) {
        let _ret = this.cutString(pStr, pLen);
        let _cutFlag = _ret.cutflag;
        let _cutStringn = _ret.cutstring;
        if ("1" == _cutFlag) {
            return _cutStringn + "...";
        } else {
            return _cutStringn;
        }
    };

    /*
 * 取得指定长度的字符串
 * 注：半角长度为1，全角长度为2
 *
 * pStr:字符串
 * pLen:截取长度
 *
 * return: 截取后的字符串
 */
    static cutString(pStr, pLen) {
        // 原字符串长度
        let _strLen = pStr.length;
        let _tmpCode;
        let _cutString;
        // 默认情况下，返回的字符串是原字符串的一部分
        let _cutFlag = "1";
        let _lenCount = 0;
        let _ret = false;

        if (_strLen <= pLen / 2) {
            _cutString = pStr;
            _ret = true;
        }
        if (!_ret) {
            for (let i = 0; i < _strLen; i++) {
                if (this.isFull(pStr.charAt(i))) {
                    _lenCount += 2;
                } else {
                    _lenCount += 1;
                }

                if (_lenCount > pLen) {
                    _cutString = pStr.substring(0, i);
                    _ret = true;
                    break;
                } else if (_lenCount == pLen) {
                    _cutString = pStr.substring(0, i + 1);
                    _ret = true;
                    break;
                }
            }
        }

        if (!_ret) {
            _cutString = pStr;
            _ret = true;
        }

        if (_cutString.length == _strLen) {
            _cutFlag = "0";
        }
        return { "cutstring": _cutString, "cutflag": _cutFlag };
    };

    /**
     * 获取客户端IP
     * @param req
     * @returns {*}
     */
    static getClientIp(req) {
        return (req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress).match(/\d+\.\d+\.\d+\.\d+/);
    };
    /**
     * 获取本机ip
     */
    static getLocalIp(){
        return ip.address();
    };
    /**
     * 指定范围的随机整数，大于等于min，小于等于max
     * @param {int} min 
     * @param {int} max 
     */
    static genRangeRandom(min, max) {
        return (Math.random() * (max - min + 1) | 0) + min;
    };
}

export default CommonUtils;