import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import * as jose from "jose";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ message: "user does not exist..." });
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res.status(401).json({ message: "incorrect password..." });
    }

    const loggedInUser = {
      username: user.username,
      email: user.username,
      id: user.id,
    };

    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const alg = process.env.PROTECTED_HEADER as string;

    const token = await new jose.SignJWT(loggedInUser)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(secret);

    res.status(200).json({
      message: "login successful.",

      user: loggedInUser,
      token,
    });
  } else {
    res.status(200).json({ route: "login" });
  }
}
