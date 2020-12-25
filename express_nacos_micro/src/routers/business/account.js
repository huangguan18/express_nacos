import app from 'express';
import multer from 'multer';
import asyncHandler from '../../utils/asyncHandler.js';
import logger from '../../utils/logger.js';
import CommonUtils from '../../utils/CommonUtils.js';
import HttpClientUtil from '../../utils/HttpClientUtil.js';
import MySQLUtil from '../../utils/MySQLUtil.js';

let upload = multer({ dest: './uploads/' });

const router = app.Router();

async function testPrint() {
    console.log("testPrint............." + CommonUtils.toDateString());
    await CommonUtils.sleep(5000);
    logger.log({
        level: 'info',
        message: 'What time is the testing at?'
    });
};

router.get(`/list`, asyncHandler(async (req, res) => {
    logger.info({ message: req.query.a });
    testPrint(); // 测试不await的实际上没按顺序执行
    let result = await HttpClientUtil.doPost("http://localhost:3000/account/create", {a:1});
    console.log('===========1：', result.data);
    let rows = await MySQLUtil.getInstance().query('select * from mytest');
    res.send(rows);
}));

router.post("/create", asyncHandler(async (req, res) => {
    logger.info({ message: req.query });
    logger.info({ message: req.body });
    // assert.equal(result.log.meta.req.method, "GET11");
    res.send({ success: true });
}));

router.post("/formData", upload.array(), asyncHandler(async (req, res) => {
    logger.info({ message: req.query });
    logger.info(req.body);
    res.send({ success: true });
}));

router.get('/error', asyncHandler(async (req, res, next) => {
    // here we cause an error in the pipeline so we see express-winston in action.
    return next(new Error("This is an error and it should be logged to the console"));
}));

// module.exports = router;
export default router;