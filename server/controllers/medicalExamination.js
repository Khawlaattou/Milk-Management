const path = require('path');
const fs = require('fs');

let medExamList = fs.readFileSync(path.resolve(__dirname, '../data/medicalExamination.json'), 'utf-8');

// Get all medExam information
const getMedExam = (req, res) => {
    try {
        const medExam = JSON.parse(medExamList);
        console.log(medExam);
        return res.status(200).json({
            medExam
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Add a new medical examination entry
const addMedExam = (req, res) => {
    try {
        const { testDate, disease } = req.body;

        let medExam = JSON.parse(medExamList);

        const newEntry = {
            test_id: medExam.length + 1,
            testDate,
            disease
        };

        medExam.push(newEntry);

        fs.writeFileSync(path.resolve(__dirname, '../data/medicalExamination.json'), JSON.stringify(medExam, null, 2));

        return res.status(200).json({ message: 'New medical examination entry added successfully', medExam });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a medical examination entry
const deleteMedExam = (req, res) => {
    try {
        const { test_id } = req.params;

        let medExam = JSON.parse(medExamList);

        const index = medExam.findIndex(entry => entry.test_id === parseInt(test_id));

        if (index === -1) {
            return res.status(404).json({ error: 'Medical examination with the provided test ID not found' });
        }

        medExam.splice(index, 1);

        fs.writeFileSync(path.resolve(__dirname, '../data/medicalExamination.json'), JSON.stringify(medExam, null, 2));

        return res.status(200).json({ message: 'Medical examination entry deleted successfully', medExam });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


// Update medExam list
const updateMedExam = (req, res) => {
    try {
        const { test_id } = req.params;
        const { testDate, disease } = req.body;

        let medExam = JSON.parse(medExamList);

        const testEntryIndex = medExam.findIndex(entry => entry.test_id === parseInt(test_id));

        if (testEntryIndex === -1) {
            return res.status(404).json({ error: 'Medical examination with the provided ID not found' });
        }

        medExam[testEntryIndex] = {
            test_id: parseInt(test_id),
            testDate,
            disease
        };

        fs.writeFileSync(path.resolve(__dirname, '../data/medicalExamination.json'), JSON.stringify(medExam, null, 2));

        return res.status(200).json({ message: 'Medical examination updated successfully', medExam });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getMedExam,
    addMedExam,
    deleteMedExam,
    updateMedExam
};
