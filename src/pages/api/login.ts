import { NowRequest, NowResponse } from "@now/node";

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  const value = Math.floor(Math.random() * 3 + 1);

  if (value === 1) {
    res.statusCode = 401;
    res.json({ message: "Wrong Password" });
  } else if (value === 2) {
    res.statusCode = 403;
    res.json({ message: "Something went wrong" });
  } else {
    res.statusCode = 200;
    res.end();
  }
};
