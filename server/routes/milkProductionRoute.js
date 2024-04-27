const Router = require ('express').Router();

const {
getMilk,
addMilk,
updateMilk,
deleteMilk
} = require('../controllers/milkProduction');

Router.route('/').get(getMilk);
Router.route('/add').post(addMilk);
Router.route('/delete/:id').post(deleteMilk);
Router.route('/update/:id').put(updateMilk);

module.exports = Router;