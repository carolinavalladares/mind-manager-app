import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "PUT") {
    const { color, title, description, tasks, id } = req.body;

    try {
      const updatedList = await prisma.list.update({
        where: { id: id },
        data: { title, color, tasks, description },
      });

      res.status(200).json({
        message: "Successfully updated list",
        status: 200,
        updatedList,
      });
    } catch (error) {
      res.status(400).json({ error, status: 400 });
    }
  }

  res.status(200).json({ message: "update list route" });
}
