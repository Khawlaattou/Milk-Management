const path = require('path');
const fs = require('fs');
const { error } = require('console');

let cowsList = fs.readFileSync(path.resolve(__dirname, '../data/cows.json'), 'utf-8');

//get all cow informations
const getCows = (req, res) => {
    try {
        const cows = JSON.parse(cowsList);
        return res.status(200).json({
            cows
        })
    } catch (error) {
        console.log(error);
    }
}

//Add a new cow
const addCow = (req, res) => {
    try {
        const { cow_id,
                date_arrived,
                race } = req.body;
        const cows = JSON.parse(cowsList);
        const newCow = {
            cow_id,
            date_arrived,
            race
        };
        cows.push(newCow);
        fs.writeFileSync(path.resolve(__dirname, '../data/cows.json'), JSON.stringify(cows));
        return res.status(200).json({
            cows
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

//delete cow
const deleteCow = (req, res) => {
    try {
        const { id } = req.params;

        const cows = JSON.parse(cowsList);

        const index = cows.findIndex(cow => cow.cow_id === id);

        if (index !== -1) {
            cows.splice(index, 1);

            fs.writeFileSync(path.resolve(__dirname, '../data/cows.json'), JSON.stringify(cows));

            return res.status(200).json({
                message: 'Cow deleted successfully',
                cows
            });
        } else {
            return res.status(404).json({ error: 'Cow not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



//update cow
const updateCow = (req, res) => {
    try {
        const { id } = req.params;
        const { date_arrived,
                race } = req.body;

        const cows = JSON.parse(cowsList);

        const index = cows.findIndex(cows => cows.cow_id == id);

        if (index !== -1) {
            cows[index] = {
                id,
                date_arrived,
                race
            };

            fs.writeFileSync(path.resolve(__dirname, '../data/cows.json'), JSON.stringify(cows));

            return res.status(200).json({
                cows
            });
        } else {
            return res.status(404).json({ error: 'Cow not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getCows,
    addCow,
    updateCow,
    deleteCow
}