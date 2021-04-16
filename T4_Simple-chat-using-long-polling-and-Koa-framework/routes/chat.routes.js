const Router = require('koa-router');
const { renderHtml, subscribe, publish } = require('../controllers/chat.controller');

const router = new Router();

router.get('/', renderHtml);

router.get('/subscribe', subscribe);

router.post('/publish', publish);

module.exports = router.routes();
