const path = require('path');
const fs = require('fs');

let milkList = fs.readFileSync(path.resolve(__dirname, '../data/milkProduction.json'), 'utf-8');

// Get all Milk information
const getMilk = (req, res) => {
    try {
        const milks = JSON.parse(milkList);
        return res.status(200).json({ milks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Add Milk
const addMilk = (req, res) => {
    try {
        const { day, milk_litres } = req.body;
        const milks = JSON.parse(milkList);
        
        const lastId = milks.length > 0 ? milks[milks.length - 1].id : 0;
        const newId = lastId + 1;

        const newMilk = {
            id: newId,
            day,
            milk_litres
        };
        milks.push(newMilk);
        fs.writeFileSync(path.resolve(__dirname, '../data/milk.json'), JSON.stringify(milks));
        return res.status(200).json({ milks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete Milk
const deleteMilk = (req, res) => {
    try {
        const { id } = req.params;
        const milks = JSON.parse(milkList);
        const index = milks.findIndex(milk => milk.id == id);
        if (index !== -1) {
            milks.splice(index, 1);
            fs.writeFileSync(path.resolve(__dirname, '../data/milkProduction.json'), JSON.stringify(milks));
            return res.status(200).json({ milks });
        } else {
            return res.status(404).json({ error: 'Milk not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Update Milk
const updateMilk = (req, res) => {
    try {
        const { id } = req.params;
        const { day, milk_litres } = req.body;
        const milks = JSON.parse(milkList);
        const index = milks.findIndex(milk => milk.id == id);
        if (index !== -1) {
            milks[index] = { id, day, milk_litres };
            fs.writeFileSync(path.resolve(__dirname, '../data/milkProduction.json'), JSON.stringify(milks));
            return res.status(200).json({ milks });
        } else {
            return res.status(404).json({ error: 'Milk not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getMilk, addMilk, updateMilk, deleteMilk };
