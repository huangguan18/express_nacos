import crypto from 'crypto';

class CryptoUtil {

    static MD5(str) {
        let hash = crypto.createHash('md5');
        hash.update(str);
        return hash.digest('hex');
    };

    static SHA1(str) {
        let sha1sum = crypto.createHash('sha1');
        sha1sum.update(str, 'utf8');
        str = sha1sum.digest('hex');
        return str;
    };

    static aesEncrypt(data, key) {
        let cipher = crypto.createCipher('aes192', key);
        let crypted = cipher.update(data, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    };
     
    static aesDecrypt(encrypted, key) {
        let decipher = crypto.createDecipher('aes192', key);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    };

    static Hmac(str, key){
        let hmac = crypto.createHmac('sha256', key);
        hmac.update(str);
        return hmac.digest('hex');
    };

    static base64Encode(str){
        return Buffer.from(str,"utf8").toString('base64');
    };

    static base64Decode(str){
        return Buffer.from(str, 'base64').toString();
    };
};

export default CryptoUtil;