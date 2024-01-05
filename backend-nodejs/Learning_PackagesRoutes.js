import express from 'express';
import Learning_PackagesModel from './Learning_PackagesModels.js';
import WordModel from './WordModel.js';

const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const { name, description, size, pricePerDay, state } = req.body;
        const newItem = await Learning_PackagesModel.create({ name, description, size, pricePerDay, state, imageURL: null });
        res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding new item');
    }
});

router.get('/', async (req, res) => {
    try {
        const items = await Learning_PackagesModel.findAll();
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving items');
    }
});


// Route to get words for a specific learning package
router.get('/:packageId/words', async (req, res) => {
    //console.log("Fetching words for package ID:", packageId);
    try {
        const packageId = parseInt(req.params.packageId, 10); // Ensure the parameter is a number
        const words = await WordModel.findAll({
            where: { learningPackageId: packageId }
        });

        if (words.length === 0) {
            return res.status(404).json({ message: 'No words found for this learning package.' });
        }

        res.json(words);
    } catch (error) {
        console.error('Error fetching words for package:', error);
        res.status(500).json({ message: 'Server error occurred while fetching words.' });
    }
});

router.delete('/delete/:Learning_Packages_id', async (req, res) => {
    try {
        const Learning_Packages_id = req.params.Learning_Packages_id;
        await Learning_PackagesModel.destroy({ where: { Learning_Packages_id } });
        res.send('Item deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting item');
    }
});

router.put('/update/:Learning_Packages_id', async (req, res) => {
    try {
        const Learning_Packages_id = req.params.Learning_Packages_id;
        const { pricePerDay, state } = req.body;
        await Learning_PackagesModel.update({ pricePerDay, state }, { where: { Learning_Packages_id } });
        res.send('Item updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating item');
    }
});


export default router;