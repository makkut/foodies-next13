import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { getGoodAsync } from "@/service/handlers";

async function getData(id: string) {
  const response = await getGoodAsync(id);
  return response;
}

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: Props) {
  const data = await getData(id);
  return { title: `${data[0].name} | Shop`, description: "Shop" };
}

export default function ItemPage({ params: { id } }: Props) {
  return (
    <div>
      <ProductDetails id={id} />
    </div>
  );
}
