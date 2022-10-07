import { MongoClient } from 'mongodb'

const connectToDb = async () => {
    const client = await MongoClient.connect(`mongodb+srv://${process.env.mongodb_un}:${process.env.mongodb_pw}@${process.env.cluster}.l3tew0h.mongodb.net/${process.env.db}?retryWrites=true&w=majority`)


    return (
        <div>db</div>
    )
}

export default db