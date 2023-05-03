import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { user } = req.headers;
    const { color, title, tasks, description } = req.body;
    const userInfo = JSON.parse(user as string);
    const tasksString = JSON.stringify(tasks);

    try {
      const newList = await prisma.list.create({
        data: {
          color,
          title,
          description,
          tasks: tasksString,
          authorId: userInfo.id,
        },
      });

      return res.status(201).json({
        message: "list created successfully!",

        list: newList,
      });
    } catch (error) {
      return res.status(400).json({ message: "error creating list...", error });
    }
  }

  return res.status(200).json({ message: "new list route" });
}
