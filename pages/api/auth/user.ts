import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const { user } = req.headers;

    const userInfo = JSON.parse(user as string);

    return res.status(200).json({ user: userInfo, status: 200 });
  }

  return res.status(200).json({ message: "get logged-in user" });
}
