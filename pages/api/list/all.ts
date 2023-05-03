import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const { user } = req.headers;
    const userInfo = JSON.parse(user as string);

    try {
      const lists = await prisma.list.findMany({
        where: { authorId: userInfo.id },
      });

      return res.status(200).json({ lists });
    } catch (error) {
      return res.status(400).json({ message: "unable to fetch lists", error });
    }
  }

  return res.status(200).json({ message: "get all lists" });
}
