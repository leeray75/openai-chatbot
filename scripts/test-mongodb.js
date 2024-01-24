const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

// Database Configuration
const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} = process.env;



// Connection URL
const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
console.log("[test-mongodb] url:",url);
const client = new MongoClient(url);

async function testMongoDBConnection() {
  try {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to MongoDB server');

    // Check if the connection is established
    const database = client.db(DB_NAME);
    const collections = await database.listCollections().toArray();

    if (collections.length > 0) {
      console.log('MongoDB container is working.');
    } else {
      console.error('Error: No collections found in the database.');
    }

  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  } finally {
    await client.close();
  }
}

testMongoDBConnection();
