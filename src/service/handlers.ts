import { client } from "../../utils/sanity.client";

export const getGoodsAsync = async (
  category: string,
  query: string,
  sort: string
) => {
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
    "imageUrl": image[0].asset->url}`;

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
