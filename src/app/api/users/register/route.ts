import { NextResponse } from "next/server";
import axios from "axios";
import bcrypt from "bcryptjs";
import { signToken } from "@/service/handlers";
import { client } from "../../../../../utils/sanity.client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;

export async function POST(req: any) {
  const body = await req.json();
  const createMutations = [
    {
      create: {
        _type: "user",
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password),
        isAdmin: false,
      },
    },
  ];
  const existUser = await client.fetch(
    `*[_type == "user" && email == "${body.email}"][0]`,
    {
      email: body.email,
    }
  );
  if (existUser) {
    return NextResponse.json(
      { message: "Email aleardy exists" },
      {
        status: 401,
      }
    );
  }
  const { data } = await axios.post(
    `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
    { mutations: createMutations },
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokenWithWriteAccess}`,
      },
    }
  );
  const userId = data.results[0].id;
  console.log(userId);
  const user = {
    _id: userId,
    name: req.body.name,
    email: req.body.email,
    isAdmin: false,
  };
  const token = signToken(user);
  return NextResponse.json({ ...user, token });
}

export async function GET(req: Request) {
  return NextResponse.json({ message: "hello" });
}
