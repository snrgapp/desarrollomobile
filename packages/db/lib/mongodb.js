
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let conex;
let conexiondb;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    conex = new MongoClient(uri, options);
    global._mongoClientPromise = conex.connect();
  }
  conexiondb = global._mongoClientPromise;
} else {
  conex = new MongoClient(uri, options);
  conexiondb = conex.connect();
}

export default conexiondb;