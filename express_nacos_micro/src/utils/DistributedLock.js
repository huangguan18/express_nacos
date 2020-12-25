import RedisUtil from './RedisUtil.js';
import Redlock from 'redlock';

class DistributedLock{
    constructor(){
        let client1 = RedisUtil.getInstance().reids_client;
        this.redlock = new Redlock(
            // you should have one client for each independent redis node
            // or cluster
            [client1],
            {
                // the expected clock drift; for more details
                // see http://redis.io/topics/distlock
                driftFactor: 0.01, // multiplied by lock ttl to determine drift time
        
                // the max number of times Redlock will attempt
                // to lock a resource before erroring
                retryCount:  200,
        
                // the time in ms between attempts
                retryDelay:  200, // time in ms
        
                // the max time in ms randomly added to retries
                // to improve performance under high contention
                // see https://www.awsarchitectureblog.com/2015/03/backoff.html
                retryJitter:  200 // time in ms
            }
        );
    };

    static getInstance() {
        if (!this.instance) {
            this.instance = new DistributedLock();
        }
        return this.instance;
    };

    async pessimisticLock(key, ttl){
        return this.redlock.lock(key, ttl);
    };

    async unLock(lock){
        try {
            return this.redlock.unlock(lock);
        } catch (err) {
            // we weren't able to reach redis; your lock will eventually
            // expire, but you probably want to log this error
            console.error(err);
        };
    };
};

export default DistributedLock;