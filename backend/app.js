import express from "express";
import dotenv from "dotenv";
import watchFolder from './Watcher.js'

dotenv.config();

const PORT = process.env.PORT;
const app = express();

watchFolder();
app.listen(PORT, () => {
	console.log(`port is connected ${process.env.PORT}`);
})