import app from 'express';
import asyncHandler from '../utils/asyncHandler.js';

const router = app.Router();

router.get(`/`, asyncHandler(async (req, res) => {
    res.send('Index Hello World!');
}));

// module.exports = router;
export default router;