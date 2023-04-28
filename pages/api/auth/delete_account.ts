import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "DELETE") {
    const { user } = req.headers;

    if (!user) {
      return res
        .status(400)
        .json({ message: "user not found...", status: 400 });
    }

    const userInfo = JSON.parse(user as string);

    try {
      const userDeleted = await prisma.user.delete({
        where: { id: userInfo.id },
      });

      // remember to delete all user's posts later

      return res.status(200).json({
        message: "account deleted successfully!",
        status: 200,
        user: userDeleted,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Error deleting account...", status: 400, error });
    }
  }

  return res.status(200).json({ message: "delete account route", status: 200 });
}
