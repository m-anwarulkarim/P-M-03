const args = process.argv;

// process.arg[0] = node path
// process.arg[1] = file path
// process.arg[] = first actual argument;

const name = args[2] || "Guast";
const time = new Date().getHours();

let greeting;

if (time < 12) {
  greeting = "Good Morning";
} else if (time < 18) {
  greeting = "Good After Noon";
} else {
  greeting = "Good evening";
}

console.log(`${greeting} ${name}`);
