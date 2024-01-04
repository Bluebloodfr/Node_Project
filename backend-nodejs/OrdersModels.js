import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize.js';

export class OrdersModels extends Model {}

OrdersModels.init({
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Orders',
    tableName: 'Orders'
});

export default OrdersModels;
