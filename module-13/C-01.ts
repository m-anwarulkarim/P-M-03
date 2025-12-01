/* ====================================================
   TODO: Project Structure ও প্রতিটি ফাইলের ব্যাখ্যা
==================================================== */

// =====================================================
// 1️⃣ কেন dotenv config আলাদা ফাইলে রাখি?
// =====================================================

/*
Centralized configuration:
  সব environment variables এক জায়গায় load করলে 
  পরবর্তীতে কোনো variable change করতে সহজ হয়।
  উদাহরণ: ডাটাবেস URL, API keys, port number ইত্যাদি।

Code cleanliness:
  প্রতিটি ফাইলের শুরুতে dotenv.config() লিখলে messy হয়ে যায়।
  আলাদা config ফাইলে রাখলে মূল app.ts/server.ts clean থাকে।

Reusability:
  একবার config ফাইল বানালে সব ফাইল import করে ব্যবহার করতে পারো।

Type safety (TypeScript):
  Config ফাইলে আমরা variable এর type define করতে পারি।
  যেমন: PORT number, DB_URL string।
*/

// =====================================================
// 2️⃣ app.ts কিসের জন্য?
// =====================================================

/*
Middleware, routes, error handlers সব define করার জন্য।

এখানে server start করা হয় না। শুধু app object তৈরি হয় এবং export করা হয়।

কারণ:
  অনেক সময় আমরা শুধু app কে import করে test বা integration test করতে চাই।
  যদি app.ts এবং server একসাথে থাকতো, তখন test করার জন্য server বারবার start করতে হতো।
*/

// =====================================================
// 3️⃣ server.ts কিসের জন্য?
// =====================================================

/*
এখানে শুধু server run করা হয়। .env থেকে port নেওয়া হয়।
app import করে app.listen(port) চালানো হয়।

কারণ:
  Production, Development বা Testing environment আলাদা করতে সহজ হয়।
  Server control আলাদা থাকে, app logic clean থাকে।
*/

// =====================================================
// 4️⃣ Flow / সম্পর্ক
// =====================================================

/*
server.ts  →  app.ts  →  routes.ts  →  controller.ts  →  service.ts

server.ts:
  App কে চালায় (port এ listen)।
  Environment setup করতে পারে (dotenv)।

app.ts:
  Middleware & router attach করে।
  Example: JSON parser, logger, CORS, ইত্যাদি।

routes.ts:
  Endpoint গুলো define করে।
  কোন URL কোন controller call করবে সেটা ঠিক করে।

controller.ts:
  Request handle করে।
  Validation, response formatting ইত্যাদি করে।
  Service call করে business logic handle করার জন্য।

service.ts:
  Business logic বা DB query manage করে।
  Controller কে clean রাখে।

Dependency ভাব:
  Server শুধু চালায় → App
  App attach করে → Router
  Router call করে → Controller
  Controller use করে → Service
*/
