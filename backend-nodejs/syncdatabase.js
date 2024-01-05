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
import WordModel from './WordModel.js';
import bcrypt from 'bcrypt';
OrdersModel.belongsTo(AccountsModel, { foreignKey: 'account_id' });
AccountsModel.hasMany(OrdersModel, { foreignKey: 'account_id' });
PaymentDetails.belongsTo(AccountsModel, { foreignKey: 'account_id' });
AccountsModel.hasMany(PaymentDetails, { foreignKey: 'account_id' });
PaymentDetails.belongsTo(OrdersModel, { foreignKey: 'order_id' });
OrdersModel.hasMany(PaymentDetails, { foreignKey: 'order_id' });
Learning_PackagesModel.belongsTo(OrdersModel, { foreignKey: 'order_id' });
OrdersModel.hasMany(Learning_PackagesModel, { foreignKey: 'order_id' });
Learning_PackagesModel.hasMany(WordModel, { foreignKey: 'learningPackageId' });
WordModel.belongsTo(Learning_PackagesModel, { foreignKey: 'learningPackageId' });
async function syncDatabase() {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synchronized successfully.');
        const adminpassword = await bcrypt.hash('adminhash', 10);
        const accounts = await AccountsModel.bulkCreate([
            { username: 'user1', email: 'user1@example.com', password_hash: 'hash1', role: 'customer' },
            { username: 'user2', email: 'user2@example.com', password_hash: 'hash2', role: 'customer' },
            { username: 'admin', email: 'admin@example.com', password_hash: adminpassword, role: 'admin' }
        ]);
        const orders = await OrdersModel.bulkCreate([
            { account_id: accounts[0].account_id, status: 'pending' },
            { account_id: accounts[1].account_id, status: 'completed' },
        ]);
        const learningPackages = await Learning_PackagesModel.bulkCreate([
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
                numOfWords: 10,
                difficulty: 'medium',
            },
            {
                title: 'Business German Essentials',
                order_id: orders[0].order_id,
                description: 'Key terms for professional and business settings',
                numOfWords: 15,
                difficulty: 'medium',
            },
            {
                title: 'Advanced German Conversation',
                order_id: orders[1].order_id,
                description: 'Complex structures and expressions for fluent speakers',
                numOfWords: 20,
                difficulty: 'hard',
            },
        ]);
        //console.log("Created Learning Packages:", learningPackages.map(lp => lp.toJSON()));

        const wordsData = [
            // Basic German Phrases - 10 words
            { english: 'Hello', german: 'Hallo', learningPackageId: learningPackages[0].Learning_Packages_id },
            { english: 'Goodbye', german: 'Auf Wiedersehen', learningPackageId: learningPackages[0].Learning_Packages_id },
            { english: 'Please', german: 'Bitte', learningPackageId: learningPackages[0].Learning_Packages_id },
            { english: 'Thank you', german: 'Danke', learningPackageId: learningPackages[0].Learning_Packages_id },
            { english: 'Yes', german: 'Ja', learningPackageId: learningPackages[0].Learning_Packages_id },
            { english: 'No', german: 'Nein', learningPackageId: learningPackages[0].Learning_Packages_id },
            { english: 'Excuse me', german: 'Entschuldigen Sie', learningPackageId: learningPackages[0].Learning_Packages_id },
            { english: 'I’m sorry', german: 'Es tut mir leid', learningPackageId: learningPackages[0].Learning_Packages_id },
            { english: 'You’re welcome', german: 'Gern geschehen', learningPackageId: learningPackages[0].Learning_Packages_id },
            { english: 'Good night', german: 'Gute Nacht', learningPackageId: learningPackages[0].Learning_Packages_id },

            // German for Travelers - 10 words
            { english: 'Ticket', german: 'Fahrkarte', learningPackageId: learningPackages[1].Learning_Packages_id },
            { english: 'Passport', german: 'Reisepass', learningPackageId: learningPackages[1].Learning_Packages_id },
            { english: 'Luggage', german: 'Gepäck', learningPackageId: learningPackages[1].Learning_Packages_id },
            { english: 'Airport', german: 'Flughafen', learningPackageId: learningPackages[1].Learning_Packages_id },
            { english: 'Station', german: 'Bahnhof', learningPackageId: learningPackages[1].Learning_Packages_id },
            { english: 'Reservation', german: 'Reservierung', learningPackageId: learningPackages[1].Learning_Packages_id },
            { english: 'Flight', german: 'Flug', learningPackageId: learningPackages[1].Learning_Packages_id },
            { english: 'Accommodation', german: 'Unterkunft', learningPackageId: learningPackages[1].Learning_Packages_id },
            { english: 'Car rental', german: 'Autovermietung', learningPackageId: learningPackages[1].Learning_Packages_id },
            { english: 'Map', german: 'Karte', learningPackageId: learningPackages[1].Learning_Packages_id },

            // Business German Essentials - 15 words
            { english: 'Meeting', german: 'Besprechung', learningPackageId: learningPackages[2].Learning_Packages_id },
            { english: 'Contract', german: 'Vertrag', learningPackageId: learningPackages[2].Learning_Packages_id },
            { english: 'Negotiation', german: 'Verhandlung', learningPackageId: learningPackages[2].Learning_Packages_id },
            { english: 'Profit', german: 'Gewinn', learningPackageId: learningPackages[2].Learning_Packages_id },
            { english: 'Investment', german: 'Investition', learningPackageId: learningPackages[2].Learning_Packages_id },
            { english: 'Market', german: 'Markt', learningPackageId: learningPackages[2].Learning_Packages_id },
            { english: 'Sales', german: 'Vertrieb', learningPackageId: learningPackages[2].Learning_Packages_id },
            { english: 'Management', german: 'Geschäftsleitung', learningPackageId: learningPackages[2].Learning_Packages_id },
            { english: 'Budget', german: 'Budget', learningPackageId: learningPackages[2].Learning_Packages_id },
            { english: 'Customer', german: 'Kunde', learningPackageId: learningPackages[2].Learning_Packages_id },
            { english: 'Strategy', german: 'Strategie', learningPackageId: learningPackages[2].Learning_Packages_id },
            { english: 'Brand', german: 'Marke', learningPackageId: learningPackages[2].Learning_Packages_id },
            { english: 'Product', german: 'Produkt', learningPackageId: learningPackages[2].Learning_Packages_id },
            { english: 'Goal', german: 'Ziel', learningPackageId: learningPackages[2].Learning_Packages_id },
            { english: 'Risk', german: 'Risiko', learningPackageId: learningPackages[2].Learning_Packages_id },
            { english: 'Revenue', german: 'Einnahmen', learningPackageId: learningPackages[2].Learning_Packages_id },
            { english: 'Competitor', german: 'Wettbewerber', learningPackageId: learningPackages[2].Learning_Packages_id },
            { english: 'Collaboration', german: 'Zusammenarbeit', learningPackageId: learningPackages[2].Learning_Packages_id },

            // Advanced German Conversation - 20 words
            { english: 'Consequence', german: 'Folge', learningPackageId: learningPackages[3].Learning_Packages_id },
            { english: 'Perspective', german: 'Perspektive', learningPackageId: learningPackages[3].Learning_Packages_id },
            { english: 'Nuance', german: 'Nuance', learningPackageId: learningPackages[3].Learning_Packages_id },
            { english: 'Implication', german: 'Implikation', learningPackageId: learningPackages[3].Learning_Packages_id },
            { english: 'Metaphor', german: 'Metapher', learningPackageId: learningPackages[3].Learning_Packages_id },
            { english: 'Irony', german: 'Ironie', learningPackageId: learningPackages[3].Learning_Packages_id },
            { english: 'Sarcasm', german: 'Sarkasmus', learningPackageId: learningPackages[3].Learning_Packages_id },
            { english: 'Hyperbole', german: 'Übertreibung', learningPackageId: learningPackages[3].Learning_Packages_id },
            { english: 'Rhetoric', german: 'Rhetorik', learningPackageId: learningPackages[3].Learning_Packages_id },
            { english: 'Syntax', german: 'Syntax', learningPackageId: learningPackages[3].Learning_Packages_id },
            { english: 'Dialect', german: 'Dialekt', learningPackageId: learningPackages[3].Learning_Packages_id },
            { english: 'Colloquialism', german: 'Umgangssprache', learningPackageId: learningPackages[3].Learning_Packages_id },
            { english: 'Idiom', german: 'Redewendung', learningPackageId: learningPackages[3].Learning_Packages_id },
            { english: 'Subtext', german: 'Subtext', learningPackageId: learningPackages[3].Learning_Packages_id },
            { english: 'Inference', german: 'Schlussfolgerung', learningPackageId: learningPackages[3].Learning_Packages_id },
            { english: 'Connotation', german: 'Konnotation', learningPackageId: learningPackages[3].Learning_Packages_id },
            { english: 'Denotation', german: 'Denotation', learningPackageId: learningPackages[3].Learning_Packages_id },
            { english: 'Euphemism', german: 'Euphemismus', learningPackageId: learningPackages[3].Learning_Packages_id },
            { english: 'Oxymoron', german: 'Oxymoron', learningPackageId: learningPackages[3].Learning_Packages_id },
            { english: 'Paradox', german: 'Paradox', learningPackageId: learningPackages[3].Learning_Packages_id },
            { english: 'Analogy', german: 'Analogie', learningPackageId: learningPackages[3].Learning_Packages_id },
        ];
        const words = await WordModel.bulkCreate(wordsData);
        console.log('Sample rows added to the table.');
    }
    catch (error) {
        console.error('Error synchronizing database:', error);
    }
    finally {
        await sequelize.close();
    }
}
syncDatabase();