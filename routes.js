//routes.js
//initialize express router
let router = require('express').Router();

//Import mohadarati Controller
var mohadaratiController = require('./mohadaratiController');
// mohadarati routes
router.route('/api')
    .get(mohadaratiController.index);    
router.route('/add').post(mohadaratiController.add);
router.route('/api/:mohadarati_id')
    .get(mohadaratiController.view)
    .delete(mohadaratiController.delete);
router.route('/update/:mohadarati_id')
    .put(mohadaratiController.update)
router.route('/after')
    .get(mohadaratiController.after);
router.route('/befor')
    .get(mohadaratiController.befor);
router.route('/admis')
    .get(mohadaratiController.admis);
router.route('/day')
    .get(mohadaratiController.day);
router.route('/week')
    .get(mohadaratiController.week);
router.route('/month')
    .get(mohadaratiController.month);
router.route('/prof')
    .get(mohadaratiController.prof);
//Export API routes
module.exports = router;