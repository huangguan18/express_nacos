/**
 * 包装一下express的请求handler，可以捕获处理异步promise的错误，并返回。相当于每次promise的catch方法
 * @param {*} fn 
 */
const asyncHandler = fn => (req, res, next) =>
    Promise.resolve()
        .then(() => fn(req, res, next))
        .catch(next);

export default asyncHandler;