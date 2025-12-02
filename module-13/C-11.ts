/*

Declaration Merging:
TypeScript-এ একই নামের interface বা namespace-এর নতুন property বা method যোগ করলে পুরোনো interface/namespace merge হয়ে যায়।

উদাহরণ:

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}


এখানে Express.Request interface-এর সাথে user?: JwtPayload merge হলো।

Type Augmentation:
এটা TypeScript-এ existing type/namespace-এর extra property যোগ করা।

মূল purpose: type-safe way এ middleware বা custom property ব্যবহার করা

যেমন: req.user

🔹 সংক্ষেপে নাম:

TypeScript Declaration Merging

বা Type Augmentation

Express-এ middleware এর জন্য এই pattern সাধারণভাবে ব্যবহার হয়।
*/
