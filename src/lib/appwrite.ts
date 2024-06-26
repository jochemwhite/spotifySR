import { Client, Databases } from "node-appwrite";

const client = new Client().setEndpoint(process.env.APPWRITE_ENDPOINT).setProject(process.env.APPWRITE_PROJECT).setKey(process.env.APPWRITE_API_KEY);

const database = new Databases(client);

export { client, database };
