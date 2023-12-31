import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize.js';

export class Learning_PackagesModel extends Model {}

Learning_PackagesModel.init({
    Learning_Packages_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    numOfWords: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    difficulty: {
        type: DataTypes.ENUM('easy', 'medium', 'hard'),
        allowNull: false,
    },
    imageURL: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Learning_Packages',
    tableName: 'Learning_Packages'
});

export default Learning_PackagesModel;
