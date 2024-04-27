const path = require('path');
const fs = require('fs');

let birthList = fs.readFileSync(path.resolve(__dirname, '../data/birth.json'), 'utf-8');

//get all births informations
const getBirths = (req, res) => {
    try {
        const births = JSON.parse(birthList);
        return res.status(200).json({
            births
        })
    } catch (error) {
        console.log(error);
    }
}

//Add a new birth
const addBirth = (req, res) => {
    try {
        const { mother_cow_id, date_of_birth } = req.body;
        const births = JSON.parse(birthList);
        const newBirth = {
            mother_cow_id,
            new_born_cow_id,
            date_of_birth
        };
        births.push(newBirth);
        fs.writeFileSync(path.resolve(__dirname, '../data/birth.json'), JSON.stringify(births));
        return res.status(200).json({
            births
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

//delete birth
const deleteBirth = (req, res) => {
    try {
        const { id } = req.params;

        const births = JSON.parse(birthList);

        const index = births.findIndex(birth => birth.new_born_cow_id == id);

        if (index !== -1) {
            births.splice(index, 1);

            fs.writeFileSync(path.resolve(__dirname, '../data/birth.json'), JSON.stringify(births));

            return res.status(200).json({
                births
            });
        } else {
            return res.status(404).json({ error: 'Birth not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

//update birth
const updateBirth = (req, res) => {
    try {
        const { id } = req.params;
        const { mother_cow_id, new_born_cow_id, date_of_birth } = req.body;

        const births = JSON.parse(birthList);

        const index = births.findIndex(birth => birth.new_born_cow_id == id);

        if (index !== -1) {
            births[index] = {
                mother_cow_id,
                new_born_cow_id,
                date_of_birth
            };

            fs.writeFileSync(path.resolve(__dirname, '../data/birth.json'), JSON.stringify(births));

            return res.status(200).json({
                births
            });
        } else {
            return res.status(404).json({ error: 'Birth not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getBirths,
    addBirth,
    updateBirth,
    deleteBirth
}