import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        message: "email, username, password are required...",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
        },
      });

      res.status(201).json({
        message: "user successfully created...",

        user: {
          username: newUser.username,
          email: newUser.email,
          id: newUser.id,
        },
      });
    } catch (error) {
      res.status(400).json({ message: "Unable to register user", error });
    }
  } else {
    res.status(200).json({ route: "register" });
  }
}
