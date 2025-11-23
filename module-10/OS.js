//  os-module.js
//  Node.js এর built-in "os" module
//  Operating System সম্পর্কিত তথ্য পাওয়ার জন্য ব্যবহার করা হয়

const os = require("os"); // os module import

/* ----------------------------------------------------------------------
 1) System / OS Information
 এই অংশ দিয়ে OS সম্পর্কিত basic তথ্য পাওয়া যায়
---------------------------------------------------------------------- */

console.log("OS Type:", os.type()); // OS এর ধরন (Windows_NT / Linux / Darwin)
console.log("Platform:", os.platform()); // OS platform (win32, linux, darwin)
console.log("Release:", os.release()); // OS version
console.log("Full Version:", os.version()); // Full OS version
console.log("Hostname:", os.hostname()); // কম্পিউটার hostname
console.log("Architecture:", os.arch()); // CPU architecture (x64 / arm)
console.log("Endianness:", os.endianness()); // CPU byte order (LE / BE)

/* ----------------------------------------------------------------------
 2) Memory (RAM)
 RAM এর total ও free status জানা যায়
---------------------------------------------------------------------- */

console.log("Total RAM:", os.totalmem()); // মোট RAM (bytes এ)
console.log("Free RAM:", os.freemem()); // ফ্রি RAM (bytes এ)

/* ----------------------------------------------------------------------
 3) CPU Related
 CPU cores এবং system load
---------------------------------------------------------------------- */

console.log("CPU Details:", os.cpus()); // CPU core details
console.log("Core Count:", os.cpus().length); // কতগুলো core আছে
console.log("System Load:", os.loadavg()); // System load (Linux/Mac)

// Process Priority (extra useful)
console.log("Priority:", os.getPriority()); // বর্তমান process priority
// os.setPriority(0, 10); // priority change (dangerous – সাধারণত ব্যবহার করা হয় না)

/* ----------------------------------------------------------------------
 4) Network Info
 Network interface এর details
---------------------------------------------------------------------- */

console.log("Network Interfaces:", os.networkInterfaces());

/* ----------------------------------------------------------------------
 5) User & System Paths
 User এবং path সম্পর্কিত তথ্য
---------------------------------------------------------------------- */

console.log("User Info:", os.userInfo()); // বর্তমান user তথ্য
console.log("Home Dir:", os.homedir()); // user এর home folder
console.log("Temp Dir:", os.tmpdir()); // temp folder path

/* ----------------------------------------------------------------------
 6) Time / Uptime
 System কতক্ষণ ধরে চলমান
---------------------------------------------------------------------- */

console.log("Uptime:", os.uptime(), "seconds");

/* ----------------------------------------------------------------------
 7) Constants & Properties
 Error codes, signal codes, fs flags
---------------------------------------------------------------------- */

console.log("Constants:", os.constants); // system constants
console.log("EOL:", JSON.stringify(os.EOL)); // OS অনুযায়ী new line character

/* ----------------------------------------------------------------------
 Importance Notes (Very Important)
----------------------------------------------------------------------
==>: os module server monitoring এ খুব কাজে লাগে
==>: Memory কম থাকলে server crash prevent করতে পারে
==>: Logs & debugging এ useful
==>: Environment অনুযায়ী behavior change করতে কাজে লাগে
---------------------------------------------------------------------- */
