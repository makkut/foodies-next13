import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/service/handlers";
import { client } from "../../../../../utils/sanity.client";

export async function POST(req: any) {
  const body = await req.json();
  const user = await client.fetch(`*[_type == "user" && email == $email][0]`, {
    email: body.email,
  });
  console.log("body", body);
  console.log("user", user);
  if (user && bcrypt.compareSync(body.password, user.password)) {
    const token = signToken({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    return NextResponse.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } else {
    return NextResponse.json(
      { message: "Invalid email or password" },
      {
        status: 400,
      }
    );
  }
}
