import { MongoClient } from 'mongodb'

async function connectToMongoClient() {
    const client = await MongoClient.connect(`mongodb+srv://${process.env.mongodb_un}:${process.env.mongodb_pw}@${process.env.mongodb_cluster}.l3tew0h.mongodb.net/${process.env.mongodb_db}?retryWrites=true&w=majority`)

    return client
}

export default connectToMongoClient