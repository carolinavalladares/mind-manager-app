import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "please provide id of the list" });
    }

    try {
      const deletedList = await prisma.list.delete({
        where: { id: parseInt(id as string) },
      });

      res.status(200).json({
        message: "list deleted successfully",

        deletedList,
      });
    } catch (error) {
      res.status(400).json({ message: "unable to delete" });
    }
  }

  res.status(200).json({ message: "delete list route" });
}
