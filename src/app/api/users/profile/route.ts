import axios from "axios";
import { NextResponse } from "next/server";
import { signToken } from "@/service/handlers";
import { client } from "../../../../../utils/sanity.client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;

export async function PUT(req: any) {
  const body = await req.json();
  const user1 = await client.fetch(`*[_type == "user" && _id == $id][0]`, {
    id: body.id,
  });
  console.log("user1", user1);
  console.log("body", body);
  await axios.post(
    `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}`,
    {
      mutations: [
        {
          patch: {
            id: user1._id,
            set: {
              name: body.name,
              email: body.email,
            },
          },
        },
      ],
    },
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokenWithWriteAccess}`,
      },
    }
  );

  const user = {
    _id: user1._id,
    name: body.name,
    email: body.email,
    isAdmin: user1.isAdmin,
  };
  const token = signToken(user);
  return NextResponse.json({ ...user, token });
}
