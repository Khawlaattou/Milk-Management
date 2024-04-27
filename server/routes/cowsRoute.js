const Router = require ('express').Router();

const {
getCows,
addCow,
updateCow,
deleteCow
} = require('../controllers/cows');

Router.route('/').get(getCows);
Router.route('/add').post(addCow);
Router.route('/delete/:id').post(deleteCow);
Router.route('/update/:id').put(updateCow);

module.exports = Router;