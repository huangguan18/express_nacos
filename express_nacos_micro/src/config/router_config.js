import mainRouter from '../routers/main.js';
import accountRouter from '../routers/business/account.js';

const router_config = [{
    path: '/',
    router: mainRouter
}, {
    path: '/account',
    router: accountRouter
}];

export default router_config;