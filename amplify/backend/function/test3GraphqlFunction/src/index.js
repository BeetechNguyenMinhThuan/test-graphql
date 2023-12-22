import Sequelize from 'sequelize';
import {ApolloServer} from 'apollo-server-lambda'
import { helloTypeDefs } from './graphql/schema/helloSchema.js';
import { helloResolvers } from './graphql/resolvers/helloResolvers.js';
// import { server } from "./graphql/schema/schema.js";

// Cấu hình kết nối Sequelize với MySQL Aurora
const sequelize = new Sequelize('package', 'admin', 'Asd123123', {
    host: 'database-1-instance-1.cid4s7kc6yqs.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const User = sequelize.define('User', {
    // Định nghĩa các thuộc tính của mô hình
    username: Sequelize.STRING,
    email: Sequelize.STRING
    // các thuộc tính khác
});

// User.sync();

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await User.sync();
        console.log('User table created successfully.');
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User table created successfully.' })
        };
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};


const server = new ApolloServer({
    typeDefs: [helloTypeDefs],
    resolvers: [helloResolvers],
    context: ({event, context}) => ({
        headers: event.headers,
        functionName: context.functionName,
        event,
        context,
    }),
});

connectDB();


export const handler = server.createHandler({
    cors: {
        origin: '*',
        credentials: true,
    },
});
