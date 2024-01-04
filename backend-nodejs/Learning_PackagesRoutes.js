import express from 'express';
import Learning_PackagesModel from './Learning_PackagesModels.js';
import { generateImageURL } from './genImage.js';

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