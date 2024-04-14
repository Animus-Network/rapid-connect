import { Config } from '../config/config';
import { MongoClient, Collection, Document } from 'mongodb';

const mongodbClient: MongoClient = new MongoClient(Config.MONGODB_CONN_STRING);

export { mongodbClient, MongoClient, Collection, Document };