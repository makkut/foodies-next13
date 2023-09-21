import jwt from "jsonwebtoken";
import { client } from "../../utils/sanity.client";

export const getGoodsAsync = async (
  page: number,
  itemsPerPage: number,
  category: string,
  query: string,
  sort: string
) => {
  const skip = (page - 1) * itemsPerPage;
  let gQuery = '*[_type == "goods"';
  if (category !== "all") {
    gQuery += ` && category->slug.current match "${category}" `;
  }
  if (query !== "all") {
    gQuery += ` && name match "${query}*" `;
  }
  let order = "";
  if (sort !== "default") {
    if (sort === "lowest") order = "| order(price asc)";
    if (sort === "highest") order = "| order(price desc)";
    if (sort === "toprated") order = "| order(rating desc)";
  }

  gQuery += `] ${order} {
    "id": _id,
    name,
    "category": category->slug.current,
    details,
    price,
    "imageUrl": image[0].asset->url} [${skip}...${skip + itemsPerPage}]`;

  return await client.fetch(gQuery);
};

export const getGoodAsync = async (id: string) => {
  let gQuery = `*[_type == 'goods' && _id == "${id}"] {
      "id": _id,
      name,
      "category": category->slug.current,
      details,
      price,
      "imageUrl": image[0].asset->url
    }`;
  return await client.fetch(gQuery);
};

export const getUser = async (id: string) => {
  let gQuery = `*[_type == 'user' && _id == "${id}"] {
      "id": _id,
      name,
      email,
      isAdmin
    }`;
  return await client.fetch(gQuery);
};

export const getCategoriesAsync = async () => {
  return await client.fetch(`*[_type == 'category']{
"id": _id,
"category": slug.current,
  name,
  "imageUrl": image.asset->url
}`);
};

export const lengthGoodsAsync = async (category: string) => {
  let gQuery = 'length(*[_type == "goods"';
  if (category !== "all") {
    gQuery += ` && category->slug.current match "${category}" `;
  }
  gQuery += "])";
  return await client.fetch(gQuery);
};

export const registr = async (req: any) => {
  return await client.fetch(`*[_type == "user" && email == $email][0]`, {
    email: req.body.email,
  });
};

export const signToken = (user: any) => {
  return jwt.sign(user, String(process.env.SANITY_AUTH_TOKEN), {
    expiresIn: "30d",
  });
};

export const isAuth = async (req: any, res: any, next: any) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // BEARER XXX
    jwt.verify(
      token,
      String(process.env.SANITY_AUTH_TOKEN),
      (err: Error | null, decode: any) => {
        if (err) {
          res.status(401).send({ message: "Token is not valid" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "Token is not suppiled" });
  }
};
