const Router = require ('express').Router();

const {
getMedExam,
addMedExam,
updateMedExam,
deleteMedExam,
} = require('../controllers/medicalExamination');

Router.route('/').get(getMedExam);
Router.route('/add/:id').post(addMedExam);
Router.route('/delete/:test_id').post(deleteMedExam);
Router.route('/update/:test_id/:cow_id').put(updateMedExam);

module.exports = Router;