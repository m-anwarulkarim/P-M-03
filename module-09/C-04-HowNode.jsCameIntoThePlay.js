// ===================================================================
// 🧠 JAVASCRIPT RUNTIME (BROWSER ENVIRONMENT)
// ===================================================================

// 1️⃣ CALL STACK
// - Synchronous কোড line-by-line execute হয়।
// - Function call হলে নতুন execution context stack এ push হয়।
// - Function শেষ হলে pop হয়।

// 2️⃣ HEAP
// - Object, array, function, data structures—সব বড় ডেটা এখানে store হয়।
// - Large, unstructured memory area।

// 3️⃣ WEB APIs
// - Browser এর async APIs: setTimeout, fetch, DOM events, geolocation, storage ইত্যাদি।
// - এগুলো JS Engine এর অংশ নয়।

// 4️⃣ DOM (Document Object Model)
// - HTML কে object tree তে convert করা কাঠামো।
// - JavaScript DOM কে modify করতে পারে।

// 5️⃣ CALLBACK QUEUE (TASK QUEUE)
// - Async কাজ শেষ হলে callback এখানে জমা থাকে।
// - Event Loop এখান থেকে callback গুলো call stack এ পাঠায়।

// 6️⃣ TIMERS QUEUE
// - setTimeout / setInterval এর callback এখানে আসে।

// 7️⃣ EVENT QUEUE (CLICK, KEYUP, SCROLL EVENT)
// - User interaction event callbacks এখানে থাকে।

// ===================================================================
// 🚀 WHY NODE.JS BECAME SO POPULAR
// ===================================================================

/*
1️⃣ JavaScript Everywhere  
- এক ভাষায় frontend + backend  
- Workflow সহজ, learning curve কম  

2️⃣ Non-blocking Asynchronous Architecture  
- Event-driven হওয়ায় হাজার হাজার request handle করতে পারে।  
- Real-time apps (chat, live updates, games) খুব simple।

3️⃣ NPM (Node Package Manager)  
- বিশ্বের সবচেয়ে বড় package ecosystem।  
- Ready-made modules = দ্রুত development।

4️⃣ Scalability  
- Single-threaded কিন্তু asynchronous হওয়ায় massive concurrency possible।  
- Microservices এর জন্য perfect।

5️⃣ Fast Execution (Google V8 Engine)  
- JavaScript → Machine code → Very fast execution।

6️⃣ Huge Community Support  
- Netflix, PayPal, Walmart, LinkedIn ব্যবহার করে।  
- Free tutorials, frameworks (Express, NestJS) সব available।
*/

// ===================================================================
// ⚙️ libuv — NODE.JS এর ASYNC ENGINE
// ===================================================================

/*
libuv কি?
- Node.js এর asynchronous ক্ষমতার প্রকৃত ইঞ্জিন।
- C language দিয়ে তৈরি।

libuv কী কাজ করে?
1️⃣ Event Loop manage করা  
2️⃣ Non-blocking I/O handle করা  
3️⃣ Thread Pool প্রদান করা  
4️⃣ Cross-platform abstraction (Windows + Linux + macOS)

libuv = Node.js এর পিছনের আসল মেশিন
*/

// ===================================================================
// 🔄 EVENT LOOP vs THREAD POOL (NODE.JS)
// ===================================================================

/*
1️⃣ EVENT LOOP
- Node.js এর main thread এ চলে।
- Synchronous code → call stack
- Async code → libuv এর কাছে যায়
- কাজ শেষ হলে callback → queue → call stack এ execute হয়

Event Loop এর কাজ:
✔ Callback observe করা  
✔ Queue clean করা  
✔ Stack খালি হলে callback পাঠানো  
✔ Non-blocking behavior নিশ্চিত করা  


2️⃣ THREAD POOL (libuv thread pool)
- File system operations, DNS lookup, crypto operations—CPU heavy কাজ চালায়।
- Default threads = 4 (UV_THREADPOOL_SIZE দিয়ে বাড়ানো যায়)

Process:
Main thread → heavy task → Thread Pool → কাজ শেষে callback → Event Loop
*/

// ===================================================================
// 🧩 PROCESS — OS LEVEL UNDERSTANDING
// ===================================================================

/*
Process কি?
- কোনো running program কে বলা হয় Process।
- Node.js চালু হলে OS একটি process তৈরি করে।

Process এর অংশ:
✔ Own memory (heap + stack)
✔ CPU execution context
✔ File handles, network ports

Process কীভাবে কাজ করে?
1. Program load  
2. OS process তৈরি করে  
3. CPU instructions run করে  
4. Process শেষ হলে terminate হয়
*/
