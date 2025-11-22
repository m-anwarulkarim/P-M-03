// 1.join() 2.existsSync() 3.mkdirSync 4.mkdir 5.{ recursive: true } 6.Object.entries() 7.statSync() 8.isDirectory()

const fs = require("fs");

const path = require("path");

const sourceDir = path.join(__dirname, "output", "messy-filse");

const organizedDir = path.join(__dirname, "output", "organized");

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

const initializeDirectories = () => {
  if (!fs.existsSync(sourceDir))
    fs.mkdirSync(sourceDir, { recursive: true }),
      testFiles.forEach((file) => {
        fs.writeFileSync(path.join(sourceDir, file), `content of ${file}`);
      });

  if (!fs.existsSync(organizedDir)) {
    fs.mkdirSync(organizedDir, { recursive: true });
  }

  Object.keys(categories).forEach((category) => {
    const categoryPath = path.join(organizedDir, categories);
    if (fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath);
    }
  });
};
initializeDirectories();
