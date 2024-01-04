var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import sequelize from './sequelize.js';
import Learning_PackagesModel from './Learning_PackagesModels.js';
import AccountsModel from './AccountsModels.js';
import OrdersModel from './OrdersModels.js';
import PaymentDetails from './PaymentDetails.js';
import bcrypt from 'bcrypt';
OrdersModel.belongsTo(AccountsModel, { foreignKey: 'account_id' });
AccountsModel.hasMany(OrdersModel, { foreignKey: 'account_id' });
PaymentDetails.belongsTo(AccountsModel, { foreignKey: 'account_id' });
AccountsModel.hasMany(PaymentDetails, { foreignKey: 'account_id' });
PaymentDetails.belongsTo(OrdersModel, { foreignKey: 'order_id' });
OrdersModel.hasMany(PaymentDetails, { foreignKey: 'order_id' });
Learning_PackagesModel.belongsTo(OrdersModel, { foreignKey: 'order_id' });
OrdersModel.hasMany(Learning_PackagesModel, { foreignKey: 'order_id' });
function syncDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.sync({ force: true });
            console.log('Database synchronized successfully.');
            const adminpassword = yield bcrypt.hash('adminhash', 10);
            const accounts = yield AccountsModel.bulkCreate([
                { username: 'user1', email: 'user1@example.com', password_hash: 'hash1', role: 'customer' },
                { username: 'user2', email: 'user2@example.com', password_hash: 'hash2', role: 'customer' },
                { username: 'admin', email: 'admin@example.com', password_hash: adminpassword, role: 'admin' }
            ]);
            const orders = yield OrdersModel.bulkCreate([
                { account_id: accounts[0].account_id, status: 'pending' },
                { account_id: accounts[1].account_id, status: 'completed' },
            ]);
            const learning_Packages = yield Learning_PackagesModel.bulkCreate([
                {
                    title: 'Basic German Phrases',
                    order_id: orders[0].order_id,
                    description: 'Common phrases used in daily conversations',
                    numOfWords: 10,
                    difficulty: 'easy',
                },
                {
                    title: 'German for Travelers',
                    order_id: orders[1].order_id,
                    description: 'Essential words and phrases for travel',
                    numOfWords: 20,
                    difficulty: 'medium',
                },
                {
                    title: 'Business German Essentials',
                    order_id: orders[0].order_id,
                    description: 'Key terms for professional and business settings',
                    numOfWords: 25,
                    difficulty: 'medium',
                },
                {
                    title: 'Advanced German Conversation',
                    order_id: orders[1].order_id,
                    description: 'Complex structures and expressions for fluent speakers',
                    numOfWords: 30,
                    difficulty: 'hard',
                },
            ]);
            console.log('Sample rows added to the table.');
        }
        catch (error) {
            console.error('Error synchronizing database:', error);
        }
        finally {
            yield Learning_PackagesModel.sequelize.close();
        }
    });
}
syncDatabase();
//# sourceMappingURL=syncdatabase.js.map