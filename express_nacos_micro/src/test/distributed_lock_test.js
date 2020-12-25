import DistributedLock from '../utils/DistributedLock.js';
import CommonUtils from '../utils/CommonUtils.js';

//模拟一下并发处理业务

(async () => {
    console.log("start11111111111");
    let resource = 'locks:account:322456';
    let lock = await DistributedLock.getInstance().pessimisticLock(resource,5*1000);
    console.log("上锁成功处理业务1111");
    await CommonUtils.sleep(1*1000);
    await DistributedLock.getInstance().unLock(lock);
    console.log("解锁完成1111");
})().catch(e=>console.log(e));

(async () => {
    console.log("start222222222");
    let resource = 'locks:account:322456';
    let lock = await DistributedLock.getInstance().pessimisticLock(resource,5*1000);
    console.log("上锁成功处理业务2222");
    await CommonUtils.sleep(1*1000);
    await DistributedLock.getInstance().unLock(lock);
    console.log("解锁完成2222");
})().catch(e=>console.log(e));