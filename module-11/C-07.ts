// ============================
// parseBody.ts
// ============================
import { IncomingMessage } from "http";

/*
🔹 parseBody helper function
- এই function POST/PUT request এর body কে পড়তে সাহায্য করে
- Node.js raw server এ data chunk হিসেবে আসে, তাই একত্র করে parse করা হয়
- async function + Promise ব্যবহার করা হয়েছে, যাতে await/async দিয়ে সহজে ব্যবহার করা যায়
*/
const parseBody = async (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    // 🔹 সব data একত্র করার জন্য খালি string তৈরি
    let body = "";

    // 🔹 যখন client data পাঠাবে, "data" event trigger হবে
    // chunk আকারে data আসে, buffer type
    req.on("data", (chunk) => {
      body += chunk.toString(); // Buffer কে string এ convert করে body তে যোগ করা
    });

    // 🔹 যখন client সব data পাঠানো শেষ করবে, "end" event trigger হবে
    req.on("end", () => {
      try {
        // 🔹 body কে JSON.parse করে JS object বানানো
        resolve(JSON.parse(body));
      } catch (error: any) {
        // 🔹 যদি JSON parse করতে error হয়, reject করবে
        reject(error);
      }
    });

    // 🔹 যদি request এর মধ্যে কোনো error আসে, Promise reject হবে
    req.on("error", reject);
  });
};

/*
🔹 এখানে কি হচ্ছে:
1. req আসলেই Node.js এর IncomingMessage object
2. আমরা event listener ব্যবহার করে data receive করি
3. সব chunk একত্র করে string বানাই
4. শেষ হলে JSON parse করি এবং Promise resolve করি
5. error হলে reject করি
*/

// 🔹 Export করা হলো যাতে অন্য ফাইল থেকে import করে ব্যবহার করা যায়
export default parseBody;
