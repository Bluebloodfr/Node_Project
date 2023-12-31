import { Sequelize } from 'sequelize';

const database = 'LearningFactDb';
const username = 'learningDbUser';
const password = 'abc';
const host = 'localhost';

// Creating a new Sequelize instance
const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'postgres', 
    logging: false,
});

export default sequelize;
