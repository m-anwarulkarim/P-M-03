/*

✅ 1) req.body এর টাইপ

যদি payload আসে body থেকে, যেমন:

{
  "name": "Anwar",
  "email": "test@gmail.com",
  "age": 20
}


তাহলে TypeScript টাইপ হবে:

type UserPayload = {
  name: string;
  email: string;
  age: number;
};


Route এ ব্যবহার:

app.post("/user", (req: Request<{}, {}, UserPayload>, res: Response) => {
  const payload = req.body;
  
  // payload: UserPayload
  res.json(payload);
});

✅ 2) req.params এর টাইপ

যদি URL params থাকে /user/:id এর মতো:

type UserParams = {
  id: string;
};

app.get(
  "/user/:id",
  (req: Request<UserParams>, res: Response) => {
    const { id } = req.params;
    res.json({ id });
  }
);

✅ 3) req.query এর টাইপ

যদি query string থাকে /search?name=anwar

type SearchQuery = {
  name?: string;
  page?: string;
};

app.get(
  "/search",
  (req: Request<{}, {}, {}, SearchQuery>, res: Response) => {
    const { name, page } = req.query;
    res.json({ name, page });
  }
);

🎯 Express Request টাইপের স্ট্রাকচার

TypeScript এ Request এর generic signature হলো —

Request<Params, ResBody, ReqBody, ReqQuery>

