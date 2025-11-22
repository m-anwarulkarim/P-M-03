//  akhane amra shikbo Asynchronously fs reading file

const fs = require("fs");

console.log("stert reading...");

fs.readFile("./data/diary.js", "utf-8", (err, data) => {
  if (err) {
    console.error("error hapend", err.message);
  }
  console.log("fole content: ");
  console.log("data");
});

console.log("this runs immidiatly"); // akhane ata fs ar agei run hobe kenona
