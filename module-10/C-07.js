// OS module import করা হলো। Node.js এর built-in module, আলাদাভাবে install করতে হয় না
const os = require("os");

// ===============================
// Header
// ===============================
console.log("System info \n");
console.log("-".repeat(50)); // "-" কে 50 বার repeat করে line divider বানানো

// ===============================
// Platform / OS সম্পর্কিত তথ্য
// ===============================
console.log("Platform Details: ");
console.log("Platform: ", os.platform()); // OS platform (win32, linux, darwin)
console.log("Architecture: ", os.arch()); // CPU architecture (x64, arm)
console.log("OS type: ", os.type()); // OS type (Windows_NT, Linux, Darwin)
console.log("OS Release: ", os.release()); // OS version/release
console.log("Hostname: ", os.hostname()); // কম্পিউটারের host name

// ===============================
// CPU সম্পর্কিত তথ্য
// ===============================
console.log("\nCPU info : ");
const cpus = os.cpus(); // সব CPU core এর info array হিসেবে পাওয়া
console.log("CPU Model : ", cpus[0].model); // প্রথম CPU core এর model
console.log("Number of cores : ", cpus.length); // CPU cores সংখ্যা
console.log("CPU Speed : ", cpus[0].speed, "MHz"); // CPU speed (MHz)

// ===============================
// Memory সম্পর্কিত তথ্য
// ===============================
console.log("-".repeat(50));

const totalMem = os.totalmem(); // মোট RAM (bytes)
const freeMem = os.freemem(); // ফ্রি RAM (bytes)

console.log(
  "Total Memory : ",
  (totalMem / 1024 / 1024 / 1024).toFixed(2), // bytes → GB এ convert
  "GB"
);
console.log(
  "Free Memory : ",
  (freeMem / 1024 / 1024 / 1024).toFixed(2), // bytes → GB
  "GB"
);

// ===============================
// System Uptime
// ===============================
console.log("-".repeat(50));

const uptime = os.uptime(); // system uptime in seconds

// seconds থেকে days, hours, minutes এ convert
const days = Math.floor(uptime / 86400); // 1 day = 86400 seconds
const hours = Math.floor((uptime % 86400) / 3600); // remaining hours
const minutes = Math.floor((uptime % 3600) / 60); // remaining minutes

console.log(`System Uptime: ${days} days ${hours} hours ${minutes} minutes`);
