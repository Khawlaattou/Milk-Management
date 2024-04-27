const Router = require ('express').Router();

const {
getBirths,
addBirth,
updateBirth,
deleteBirth
} = require('../controllers/births');

Router.route('/').get(getBirths);
Router.route('/addBirth').post(addBirth);
Router.route('/deleteBirth/:id').post(deleteBirth);
Router.route('/updateBirth/:id').put(updateBirth);

module.exports = Router;
