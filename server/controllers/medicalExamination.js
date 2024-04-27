const path = require('path');
const fs = require('fs');

let medExamList = fs.readFileSync(path.resolve(__dirname, '../data/medicalExamination.json'), 'utf-8');

//get all medExam informations
const getMedExam = ( req, res) => {
    try {
        const medExam = JSON.parse(medExamList);
        console.log(medExam);
        return res.status(200).json({
            medExam
        })
    } catch (error) {
        console.log(error);
    }
}

//Add a cow to a desease
const addMedExam = (req, res) => {
    try {
        const id = parseInt(req.params.id); 
        const { cow_id, disease } = req.body;

        const medExam = JSON.parse(medExamList);

        const newMedExam = {
            cow_id,
            disease
        };

        const testEntryIndex = medExam.findIndex(entry => entry.test_id === id);

        if (testEntryIndex === -1) {
            return res.status(404).json({ error: 'Medical examination with the provided ID not found' });
        }

        medExam[testEntryIndex].testsList.push(newMedExam);

        fs.writeFileSync(path.resolve(__dirname, '../data/medicalExamination.json'), JSON.stringify(medExam, null, 2));

        return res.status(200).json({
            medExam
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



//add a new desease list
const addNewDiseaseList = (req, res) => {
    try {
        const { testDate, testsList } = req.body;

        const medExamData = fs.readFileSync(path.resolve(__dirname, '../data/medicalExamination.json'), 'utf8');
        const medExam = JSON.parse(medExamData);

        const newDiseaseList = {
            test_id: medExam.length + 1,
            testDate,
            testsList
        };

        medExam.push(newDiseaseList);

        fs.writeFileSync(path.resolve(__dirname, '../data/medicalExamination.json'), JSON.stringify(medExam, null, 2));

        return res.status(200).json({ message: 'New disease list added successfully', medExam });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



//delete birth
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
    
            return res.status(200).json({ message: 'Test list deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    
};


//delete cow from disease
const deleteCowFromTestList = (req, res) => {
    try {
        const { test_id, cow_id } = req.params;

       const medExam = JSON.parse(medExamList);

        const testEntry = medExam.find(entry => entry.test_id === parseInt(test_id));

        if (!testEntry) {
            return res.status(404).json({ error: 'Medical examination with the provided test ID not found' });
        }

       const cowIndex = testEntry.testsList.findIndex(cow => cow.cow_id === parseInt(cow_id));

        if (cowIndex === -1) {
            return res.status(404).json({ error: 'Cow with the provided ID not found in the test list' });
        }

        testEntry.testsList.splice(cowIndex, 1);

        fs.writeFileSync(path.resolve(__dirname, '../data/medicalExamination.json'), JSON.stringify(medExam, null, 2));

        return res.status(200).json({ message: 'Cow deleted from the test list successfully', medExam });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

//update birth
const updateMedExam = (req, res) => {
    try {
        const { test_id, cow_id } = req.params;
        const { disease } = req.body;

        const medExam = JSON.parse(medExamList);

        const testEntry = medExam.find(entry => entry.test_id === parseInt(test_id));

        if (!testEntry) {
            return res.status(404).json({ error: 'Medical examination with the provided test ID not found' });
        }

        const cowIndex = testEntry.testsList.findIndex(cow => cow.cow_id === parseInt(cow_id));

        if (cowIndex === -1) {
            return res.status(404).json({ error: 'Cow with the provided ID not found in the test list' });
        }
        
        testEntry.testsList[cowIndex].disease = disease;

        fs.writeFileSync(path.resolve(__dirname, '../data/medicalExamination.json'), JSON.stringify(medExam, null, 2));

        return res.status(200).json({ message: 'Cow information updated in the test list successfully', medExam });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getMedExam,
    addMedExam,
    addNewDiseaseList,
    updateMedExam,
    deleteMedExam,
    deleteCowFromTestList
}