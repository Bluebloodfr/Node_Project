import express from 'express';
import userRoutes from './UserRoutes.js';
import Learning_PackagesRoutes from './Learning_PackagesRoutes.js';
import jwt from 'jsonwebtoken';
import AccountsModels from './AccountsModels.js';
import paymentDetailsRoutes from './PaymentDetailsRoutes.js';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static('../frontend-angular'));

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), '../frontend-angular/landing.html'));
});

app.use('/api/users', userRoutes);
app.use('/api/Learning_Packages', Learning_PackagesRoutes);
app.use('/api/pay', paymentDetailsRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));