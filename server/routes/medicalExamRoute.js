const Router = require ('express').Router();

const {
getMedExam,
addMedExam,
addNewDiseaseList,
updateMedExam,
deleteMedExam,
deleteCowFromTestList
} = require('../controllers/medicalExamination');

Router.route('/').get(getMedExam);
Router.route('/add/:id').post(addMedExam);
Router.route('/add/').post(addNewDiseaseList);
Router.route('/delete/:test_id').post(deleteMedExam);
Router.route('/delete/:test_id/:cow_id').post(deleteCowFromTestList);
Router.route('/update/:test_id/:cow_id').put(updateMedExam);

module.exports = Router;