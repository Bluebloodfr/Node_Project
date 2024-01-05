import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize.js';

export class WordModel extends Model {}

WordModel.init({
    word_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    english: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    german: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    learningPackageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Learning_Packages',
            key: 'Learning_Packages_id',
        },
    },
}, {
    sequelize,
    modelName: 'Word',
    tableName: 'Words'
});

export default WordModel;
