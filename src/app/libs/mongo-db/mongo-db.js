import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
const path = require("path");
import { v4 as uuidv4 } from "uuid";
//const { ENV, MONGO_URI, MONGO_LOCAL_URI } = process.env;
const { ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

//const caCert = fs.readFileSync(caCertPath);
const uri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

const config = { serverApi: ServerApiVersion.v1 };

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

/**
 * Retrieves documents from a MongoDB collection based on a filter.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.collectionName - The name of the MongoDB collection.
 * @param {Object} [params.filter={}] - The filter to apply to the query.
 * @returns {Promise<Array<Object>>} - A promise that resolves with an array of documents.
 * @throws {Error} - Throws an error if there is an issue connecting to the database or querying the collection.
 *
 * @example
 * // Retrieve documents from 'exampleCollection' with a filter
 * const result = await getDocuments({
 *   collectionName: 'exampleCollection',
 *   filter: { key: 'value' }
 * });
 * // Result: Array of documents
 */
export const getDocuments = async ({ collectionName, filter = {} }) => {
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
    console.log("[api][mongo-db][[getDocuments]] documents:\n", documents);
    return documents;
  } finally {
    await client.close();
  }
};

// Fetch document by collection name with an optional filter
export const getOneDocument = async ({ collectionName, filter = {} }) => {
  const client = new MongoClient(uri, config);
  try {
    console.log(
      "[api][mongo-db][[getOneDocument] collectionName:",
      collectionName
    );
    await client.connect();

    const db = client.db(DB_NAME);
    const collection = db.collection(collectionName);
    const document = await collection.findOne(filter);
    console.log("[api][mongo-db][[getOneDocument] document:\n", document);
    return document;
  } finally {
    await client.close();
  }
};

// Fetch a document by collection name and id
export const getDocumentById = async ({ collectionName, documentId }) => {
  const client = new MongoClient(uri, config);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(collectionName);
    // Convert documentId to ObjectId
    const objectId = new ObjectID(documentId);
    const document = await collection.findOne({ _id: objectId });
    return document;
  } finally {
    await client.close();
  }
};
/**
 * Updates a document in a MongoDB collection by its ID with new data.
 *
 * @async
 * @function
 * @param {Object} options - The options object.
 * @param {string} options._id - The unique identifier of the document to be updated.
 * @param {string} options.collectionName - The name of the MongoDB collection.
 * @param {Object} options.updatedData - The updated data to be applied to the document.
 * @returns {Promise<Object>} - A promise that resolves with the update result from the MongoDB operation.
 *
 * @throws {Error} - Throws an error if there is an issue connecting to the database or performing the update.
 *
 * @example
 * const updateResult = await updateDocument({
 *   _id: '603486e3a8b107001c249c75', // Example document ID
 *   collectionName: 'users',
 *   updatedData: {
 *     username: 'newUsername',
 *     email: 'newemail@example.com',
 *   },
 * });
 * console.log(updateResult); // MongoDB update result
 */
export const updateDocument = async ({ _id, collectionName, updatedData }) => {
  console.log("[mongodb][updateDocument] data:\n", updatedData);
  const client = new MongoClient(uri, config);
  try {
    await client.connect();

    const db = client.db(DB_NAME);
    const collection = db.collection(collectionName);
    const response = await collection.updateOne({ _id }, { $set: updatedData });
    return response;
  } finally {
    await client.close();
  }
};

// Delete a document by collection name and id
export const deleteDocument = async ({ collectionName, documentId }) => {
  const client = new MongoClient(uri, config);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(collectionName);
    const objectId = new ObjectID(documentId);
    await collection.deleteOne({ _id: objectId });
  } finally {
    await client.close();
  }
};

// Delete multiple documents by collection name and ids
export const deleteDocuments = async ({ collectionName, documentIds = [] }) => {
  const client = new MongoClient(uri, config);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(collectionName);
    const objectIds = documentIds.map((id) => {
      return new ObjectID(id);
    });
    await collection.deleteMany({ _id: { $in: objectIds } });
  } finally {
    await client.close();
  }
};
// Check if a document with the same unique property already exists
const checkIfDocumentExists = async ({ collection, uniqueProperty, value }) => {
  const query = { [uniqueProperty]: value };
  //console.log("[api][mongo-db][checkIfDocumentExists] query:\n", query);
  if (collection != null) {
    const count = await collection.countDocuments(query);
    return count > 0;
  } else {
    return false;
  }
};

/**
 * Saves a document to a MongoDB collection.
 *
 * @param {Object} options - The options object.
 * @param {string} options.collectionName - The name of the MongoDB collection.
 * @param {Object} options.document - The document to be saved.
 * @param {string} options.uniqueProperty - The unique property to check for existence.
 * @returns {Promise<string>} - A promise that resolves with the inserted document's ID.
 * @throws {Error} - Throws an error if a document with the specified unique property already exists.
 *
 * @example
 * const result = await saveDocument({
 *   collectionName: 'users',
 *   document: {
 *     name: 'John Doe',
 *     email: 'john.doe@example.com',
 *   },
 *   uniqueProperty: 'email',
 * });
 * console.log(result); // Inserted document ID
 */
export const saveDocument = async ({
  collectionName,
  document,
  uniqueProperty,
}) => {
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
export const saveDocuments = async ({
  collectionName,
  documents,
  uniqueProperty,
}) => {
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

    if (uniqueDocuments.length > 0) {
      const result = await collection.insertMany(uniqueDocuments);

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
