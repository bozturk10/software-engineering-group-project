//Index Router
const session = require('express-session');
const router = express.Router();
var path = require('path');

router.get('/check', async (req, res) => {
    try {
        res.send({status: 'ok'});
    } catch (error) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/login', async (req, res) => {
    try{
        res.sendFile(path.resolve('login.html'));
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});


module.exports = router;
