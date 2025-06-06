import path from "path";
import fs from 'fs'
import os from 'os';

const Home = os.homedir(),
	dirname = path.dirname(Home),
	Resume = path.join(Home +"/Downloads" +"/Resume"),
	checkdir = fs.existsSync(Resume)

	if (!checkdir) {
		fs.mkdirSync(Resume)
	}else{
		console.log("folder already exists");
	}

export default function watchFolder () {	
	const watcher = fs.watch(Resume, { persistent: true }, async (eventType, filename) => {
        if (!filename) return;

        const filePath = path.join(Resume, filename);
        
        try {
            if (path.extname(filename).toLowerCase() !== '.pdf') {
                try {
                    await fs.unlink(filePath);
                    console.log(`Deleted non-PDF file: ${filename}`);
                } catch (error) {
                    console.error(`Error deleting file: ${filename}`, error);
                }
            }
        } catch (error) {
            if (eventType === 'rename') {
                console.log(`File deleted: ${filename}`);
            }
        }
    });

    watcher.on('error', (error) => {
        console.error('Watch error:', error);
    });

    console.log(`Watching directory: ${Resume}`);
}
