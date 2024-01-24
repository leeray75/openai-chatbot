import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
const path = require("path");
import { v4 as uuidv4 } from "uuid";
//const { ENV, MONGO_URI, MONGO_LOCAL_URI } = process.env;
const {
    ENV,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
} = process.env;
const caCertPath = path.join(process.cwd(), "mongo-db-certificate.pem");
console.log("[api][utils][mongo-db] caCertPath:", caCertPath);
//const caCert = fs.readFileSync(caCertPath);
const uri = `mongdb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
//const dbName = "news";
//const uri = `mongodb+srv://${username}:${password}@cluster0.iwbwwtl.mongodb.net/?retryWrites=true&w=majority`;
/*const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: false,
    tls: true,
    tlsCAFile: `${process.cwd()}/mongo-db-certificate.pem`,
}
*/
const config = { serverApi: ServerApiVersion.v1 }

//let client = new MongoClient(uri,config);

/*
export const connectToDatabase = async () => {
    try {

        const client = new MongoClient(uri, config);
        await client.connect();
        const db = client.db("news");
        console.log('[api][utils][mongo-db] Connected to MongoDB');
        return { client, db };

    } catch (error) {
        console.error('[api][utils][mongo-db] Failed to connect to MongoDB:', error);
        throw error;
    }
};
*/
async function createCollectionIfNotExists(collectionName) {
    const client = new MongoClient(uri, config);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const collectionExists = await db
            .listCollections({ name: collectionName })
            .hasNext();

        if (!collectionExists) {
            await db.createCollection(collectionName);
            console.log("[api][utils][mongo-db] Collection created successfully.");
            return { message: "Collection created successfully." };
        } else {
            console.log("[api][utils][mongo-db] Collection already exists.");
            return { message: "Collection already exists." };
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    } finally {
        await client.close();
    }
}

// Fetch documents by collection name with an optional filter
export const getDocuments = async ({collectionName, filter = {} }) => {
    const client = new MongoClient(uri, config);
    try {
        console.log(
            "[api][mongo-db][[getDocuments]] collectionName:",
            collectionName
        );
        await client.connect();
        console.log("[api][mongo-db][[getDocuments]] client connected");
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        const documents = await collection.find(filter).toArray();
        return documents;
    } finally {
        await client.close();
    }
};

// Fetch a document by collection name and id
export const getDocumentById = async (collectionName, documentId) => {
    const client = new MongoClient(uri, config);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        const document = await collection.findOne({ id: documentId });
        return document;
    } finally {
        await client.close();
    }
};

// Update a document by collection name and id with updated data
export const updateDocument = async (
    collectionName,
    documentId,
    updatedData
) => {
    console.log("[mongodb][updateDocument] data:\n", updatedData);
    const client = new MongoClient(uri, config);
    try {
        await client.connect();

        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        const response = await collection.updateOne(
            { id: documentId },
            { $set: updatedData }
        );
        return response;

        return {};
    } finally {
        await client.close();
    }
};

// Delete a document by collection name and id
export const deleteDocument = async (collectionName, documentId) => {
    const client = new MongoClient(uri, config);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        await collection.deleteOne({ id: documentId });
    } finally {
        await client.close();
    }
};

// Delete multiple documents by collection name and ids
export const deleteDocuments = async (collectionName, documentIds = []) => {
    const client = new MongoClient(uri, config);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        await collection.deleteMany({ id: { $in: documentIds } });
    } finally {
        await client.close();
    }
};
// Check if a document with the same unique property already exists
const checkIfDocumentExists = async (collection, uniqueProperty, value) => {
    const query = { [uniqueProperty]: value };
    console.log("[api][mongo-db][checkIfDocumentExists] query:\n", query);
    const count = await collection.countDocuments(query);
    return count > 0;
};

// Save a new document
export const saveDocument = async (
    collectionName,
    document,
    uniqueProperty
) => {
    const client = new MongoClient(uri, config);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        let documentExists = false;
        if (typeof uniqueProperty !== "undefined") {
            const value = document[uniqueProperty];
            documentExists = await checkIfDocumentExists(
                collection,
                uniqueProperty,
                value
            );
        }
        if (documentExists) {
            throw new Error(
                `A document with ${uniqueProperty} '${value}' already exists.`
            );
        }
        const newDocument =
            typeof document.id === "undefined"
                ? { ...document, id: uuidv4() }
                : document;
        const result = await collection.insertOne(newDocument);
        return result.insertedId;
    } finally {
        await client.close();
    }
};

// Save an array of documents only if a specified property is unique
export const saveDocuments = async (
    collectionName,
    documents,
    uniqueProperty
) => {
    const client = new MongoClient(uri, config);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);

        const uniqueDocuments = await Promise.all(
            documents.map(async (document) => {
                const value = document[uniqueProperty];
                const documentExists = await checkIfDocumentExists(
                    collection,
                    uniqueProperty,
                    value
                );
                return { document, documentExists };
            })
        ).then((results) => {
            return results
                .filter((result) => !result.documentExists)
                .map((result) => {
                    const newDocument = { ...result.document, id: uuidv4() };
                    return newDocument;
                });
        });

        console.log(
            "[api][mongo-db][saveDocuments] documents:\n",
            documents.length
        );
        console.log(
            "[api][mongo-db][saveDocuments] uniqueDocuments:\n",
            uniqueDocuments.length
        );
        if (uniqueDocuments.length > 0) {
            console.log(
                "[api][mongo-db][saveDocuments] uniqueDocuments:\n",
                uniqueDocuments.length
            );
            const result = await collection.insertMany(uniqueDocuments);
            console.log(
                "[api][mongo-db][saveDocuments]  result.insertedCount",
                result.insertedCount
            );
            return uniqueDocuments;
        } else {
            return [];
        }
    } finally {
        await client.close();
    }
};

const mongodb = {
    getDocumentById,
    getDocuments,
    updateDocument,
    deleteDocument,
    deleteDocuments,
    saveDocument,
    saveDocuments,
};

export default mongodb;
