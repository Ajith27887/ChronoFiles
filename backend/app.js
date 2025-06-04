import express from "express";
import dotenv from "dotenv";
import os from 'os'
import path from "path";
import fs from 'node:fs'
import { log } from "node:console";
dotenv.config();

const PORT = process.env.PORT;
const app = express();

const Home = os.homedir(),
	dirname = path.dirname(Home),
	Resume = path.join(Home +"/Downloads" +"/Resume"),
	checkdir = fs.existsSync(Resume)

	if (!checkdir) {
		fs.mkdirSync(Resume)
	}else{
		console.log("folder already exists");
	}

	if (checkdir) {
		fs.readdir(Resume, (err, files) => {
	        if (err) {
	            console.error('Error reading directory:', err);
	            return;
	        }
	        if (files.length > 0) {
	            console.log('Existing files:', files);
				files.forEach((file) => {
					if (path.extname(file) !== ".pdf") {
						fs.unlink(path.join(Resume, file), (err) => {
                    if (err) {
                        console.error(`Error deleting file ${file}:`, err);
                        return;
                    }
                    console.log(`Successfully deleted: ${file}`);
                });
					}
				})
				
	        } else {
	            console.log('No files in the directory');
	        }
	    });

		fs.watch(Resume, { persistent: true }, (eventType, filename) => {
			console.log(`Event type is: ${eventType}`);	
		})
	}

app.listen(PORT, () => {
	console.log(`port is connected ${process.env.PORT}`);
})