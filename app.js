// tidak bisa perulangan (program sekali jalan)
// masih BUG
const readline = require('readline'); // notepad require
const prompt = require('prompt-sync')(); // prompt/input
const fs = require('fs').promises; // file sistem

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function createNote() {
    let isExist = false;
    let noteTitle = await prompt('Create Title: ');
    // cek apakah sudah ada file di direktori
    fs.readdir('note/', (err, files) => {
        if (err) {
            console.log("Error while read", err);
            return err;
        }

        files.forEach(file => {
            noteTitle = noteTitle + ".txt";
            if (file == noteTitle) {
                console.log("File is exist! can't add :(");
                isExist = true;
                process.exit();
            }
        });
        
        // Jika file belum ada
        if (isExist == false) {
            rl.question('Create Note: ', (note) => {
                fs.appendFileSync('note/' + noteTitle + '.txt', note + "\n");
                console.log("Added!");
                rl.close();
            });
        }
    });
}


async function readNote() {
    const dirPath = 'note/';
    let arrFiles = [];

    try {
        arrFiles = await fs.readdir(dirPath); // Menggunakan await untuk menunggu hasil operasi readdir

        console.log("Files in directory: ");
        let i = 1;
        arrFiles.forEach(file => {
            console.log(`${i++} - ${file}`);
        });

        let getNote = await prompt("Choose note by number: ");
        if(isNaN(getNote)){
            console.log("Not a Number");
            console.log("- Program exit");
        }
        if(getNote > i+1 || getNote < 1){
            const note = await fs.readFileSync(`note/${arrFiles[getNote-1]}`, 'utf-8');
            console.log('Your Note: ');
            console.log(note);
            rl.close();
        } else {
            console.log("Input tidak valid");
        }
        
    } catch (error) {
        console.log("Error while processing:", error);
    }
}


console.log("Note App by Haydar");
console.log("1 - Create Note");
console.log("2 - Read Note");
console.log("3 - Update Note");
console.log("4 - Delete Note");
console.log("5 - Exit");
let choose = prompt("Choose [1/2/3]: ");

async function menuChoose() {
    if (choose == "1") {
        await createNote();
    } else if (choose == "2") {
        await readNote();
    } else if (choose == "3") {
        await updateNote();
    } else if (choose == "4") {
        await deleteNote();
    } else {
        console.log("Thanks for use haydar's program");
        process.exit();
    }
}

menuChoose();