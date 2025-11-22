// 1.join() 2.existsSync() 3.mkdirSync 4.mkdir 5.{ recursive: true } 6.Object.entries() 7.statSync() 8.isDirectory()
/*

 File Organizer Project (Full Explanation with Detailed Comments)
=================================================================

এই স্ক্রিপ্টটির কাজ:
 এলোমেলো ফাইল তৈরি করা (init)
 ফাইলগুলো extension অনুযায়ী category তে সাজানো (organize)
 Organized ফোল্ডারে কপি করা
 CLI command system দিয়ে control করা

এখানে আমরা step-by-step ব্যাখ্যা যোগ করেছি যাতে প্রতিটি অংশ সহজে বোঝা যায়।

*/

const fs = require("fs"); // File System module - ফাইল তৈরি, পড়া, কপি করার জন্য
const path = require("path"); // Path handling module - file path এবং extension handle করতে

/* -----------------------------
 Folder Path Setup
------------------------------
sourceDir → যেখানে এলোমেলো ফাইল থাকবে
organizedDir → যেখানে সাজানো ফাইল রাখা হবে
*/
const sourceDir = path.join(__dirname, "output", "messy-files"); // messy ফাইলের folder path
const organizedDir = path.join(__dirname, "output", "organized"); // organized folder path
/*
              __dirname বর্তমান js ফাইল যে folder এ আছে সেই folder
              তারপর join করে বানাচ্ছে:
              [current folder]/output/messy-files
              */

/* -----------------------------
 Category Rules
------------------------------
এই object দিয়ে আমরা define করেছি কোন file extension কোন category তে যাবে
*/
const categories = {
  images: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"],
  documents: [".pdf", ".doc", ".docx", ".txt", ".rtf"],
  videos: [".mp4", ".avi", ".mkv", ".mov", ".wmv"],
  audio: [".mp3", ".wav", ".flac", ".aac", ".ogg"],
  code: [".js", ".py", ".java", ".cpp", ".html", ".css"],
  archives: [".zip", ".rar", ".tar", ".gz", ".7z"],
  spreadsheets: [".xls", ".xlsx", ".csv"],
  others: [],
};

/* -----------------------------
 Test file list
------------------------------
প্রথমবার init করলে এগুলো messy-files folder এ তৈরি হবে
*/
const testFiles = [
  "vacation.jpg",
  "report.pdf",
  "presentation.pptx",
  "music.mp3",
  "video.mp4",
  "script.js",
  "data.csv",
  "archive.zip",
  "photo.png",
  "notes.txt",
  "app.py",
  "movie.avi",
  "song.wav",
  "backup.tar.gz",
  "random.xyz",
  "nodejs.zip",
];

/* -----------------------------------------------------
 initializeDirectories() - ফোল্ডার ও test ফাইল তৈরি করা
------------------------------------------------------
*/
function initializeDirectories() {
  // যদি messy-files ফোল্ডার না থাকে, তৈরি করো
  if (!fs.existsSync(sourceDir)) {
    fs.mkdirSync(sourceDir, { recursive: true });

    // testFiles তৈরি করে messy-files folder এ লিখো
    testFiles.forEach((file) => {
      fs.writeFileSync(path.join(sourceDir, file), `Content of ${file}`);
    });
  }

  console.log("Messy directories files are created!!!");

  // যদি organized folder না থাকে, তৈরি করো
  if (!fs.existsSync(organizedDir)) {
    fs.mkdirSync(organizedDir, { recursive: true });
  }

  // organized folder এর মধ্যে category অনুযায়ী sub-folder তৈরি করো
  Object.keys(categories).forEach((category) => {
    // Object.keys(categories) এর দ্বারা object এর key গুলোকে নিয়ে একটি array বানিয়ে দেয়
    const categoryPath = path.join(organizedDir, category);
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath);
    }
  });
}

/* -----------------------------------------------------
 getCategory(filename) - কোন category তে ফাইল যাবে তা নির্ধারণ
------------------------------------------------------
*/
function getCategory(filename) {
  const ext = path.extname(filename).toLowerCase(); // file extension বের করা

  // categories object iterate করে match খোঁজা
  // এখানে category   কে  array  বানাচছে । সেই array থেকে Destructur করা হচ্ছে
  for (const [category, extensions] of Object.entries(categories)) {
    if (extensions.includes(ext)) {
      return category; // match হলে category return করো
    }
  }

  return "others"; // match না হলে others category
}

/* -----------------------------------------------------
 organizeFiles() - মূল logic ফাইল সাজানো
------------------------------------------------------
*/
function organizeFiles() {
  console.log("file organizer \n");
  console.log("source: ", sourceDir);
  console.log("Destination: ", organizedDir);
  console.log("\n" + "-".repeat(50) + "\n");

  const files = fs.readdirSync(sourceDir); // messy-files থেকে সব files পড়ো

  if (files.length === 0) {
    console.log("No files to work on!!");
    return;
  }

  console.log(`found ${files.length} files to organize \n`);

  const stats = {
    total: 0,
    byCategory: {},
  };

  files.forEach((file) => {
    const sourcePath = path.join(sourceDir, file);
    const stat = fs.statSync(sourcePath);

    if (stat.isDirectory()) {
      return; // যদি folder হয় skip করো
    }

    const category = getCategory(file); // ফাইলের category নির্ধারণ
    const destDir = path.join(organizedDir, category); // destination folder
    const destPath = path.join(destDir, file); // destination path

    fs.copyFileSync(sourcePath, destPath); // ফাইল copy করা

    // statistics update করা
    stats.total++;
    stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;

    console.log(`${file} → ${category} (${stat.size} bytes)`);
  });
}

/* -----------------------------------------------------
 showHelp() - command usage guide
------------------------------------------------------
*/
function showHelp() {
  console.log(`
        file organizer - usage:

        commands: 
        init - create files
        organize - organize files into categories

        example:
        node file-organizer init
        node file-organizer organize
        `);
}

/* -----------------------------------------------------
 Command System
------------------------------------------------------
process.argv[2] → user command detect করে
*/
const command = process.argv[2];

switch (command) {
  case "init":
    initializeDirectories(); // test files তৈরি করা
    break;
  case "organize":
    organizeFiles(); // files organize করা
    break;
  default:
    showHelp(); // help message
    break;
}

/* -----------------------------------------------------
 Diagram & Summary
------------------------------------------------------

Diagram:

            ┌──────────────┐
            │ messy-files  │
            └──────┬───────┘
                   │ read files
                   ▼
           ┌──────────────────┐
           │  getCategory()   │
           └──────┬───────────┘
                  │
        ┌─────────┼─────────┐
        ▼         ▼         ▼
    images    documents   audio   ... others
        │         │         │
        ▼         ▼         ▼
 organized/images/
 organized/documents/
 organized/audio/
 organized/others/

Summary:
✔ fs → ফাইল read, write, copy করার জন্য ব্যবহৃত
✔ path → ফাইলের path, extension handle করার জন্য
✔ categories → কোন file কোন group এ যাবে তা define করে
✔ getCategory → file কোন category তে যাবে তা return করে
✔ organizeFiles → messy-files থেকে files organize করে category folders এ copy করে
✔ init → messy-files & test files তৈরি করে
✔ organize → files sort & copy করে
✔ CLI → user command handle করে (init / organize)
*/
