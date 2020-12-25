import RedisUtil from '../utils/RedisUtil.js';
import CommonUtils from '../utils/CommonUtils.js';

(async () => {
    await RedisUtil.getInstance().setValue('test_key',"test_value",60);
    await CommonUtils.sleep(5*1000);
    await RedisUtil.getInstance().setValue('test_key2',{a:1,b:2},60);
})();
