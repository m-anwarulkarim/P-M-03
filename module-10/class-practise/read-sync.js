const fs = require("fs");

console.log("Stert reading...");
// synccroonas file shdharonoto try catch ar vitor thake tai atake amra  kenona error hole catch korbe k tai try catch ar vitor lekhvbo
console.time("a");
try {
  const data = fs.readFileSync("./data/diary.txt", "utf-8");
  console.log("file content");
  console.log(data);
} catch (error) {
  console.log(error.message);
}

console.log("Finished");
console.timeEnd("a");
