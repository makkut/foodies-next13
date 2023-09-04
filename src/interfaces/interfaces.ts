export type ItemInterface = {
  id: string;
  category: string;
  name: string;
  imageUrl: string;
  price: number;
};

export type CartItemInterface = {
  id: string;
  category: string;
  name: string;
  imageUrl: string;
  price: number;
  details: string;
  count: number;
};

export type FavoritesInterface = {
  id: string;
  category: string;
  name: string;
  imageUrl: string;
  price: number;
  details: string;
};
