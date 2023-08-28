import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type FilterState = {
  filter: string;
  setFilter: (value: string) => void;
};

type SortState = {
  sort: string;
  setSort: (value: string) => void;
};

type SearchState = {
  search: string;
  setSearch: (value: string) => void;
};

type CartItem = {
  id: string;
  count: number;
  // ... other properties of the cart item
};

type CartState = {
  isCartOpen: boolean;
  cart: CartItem[];
  addToCart: (item: { item: CartItem }) => void;
  //   removeFromCart: (item: { id: string }) => void;
  //   increaseCount: (item: { id: string }) => void;
  //   decreaseCount: (item: { id: string }) => void;
  //   setIsCartOpen: () => void;
};

export const useFilter = create<FilterState>((set) => ({
  filter: "all",
  setFilter: (value) => set({ filter: value }),
}));

export const useSort = create<SortState>((set) => ({
  sort: "default",
  setSort: (value) => set({ sort: value }),
}));

export const useSearch = create<SearchState>((set) => ({
  search: "",
  setSearch: (value: any) => set({ search: value }),
}));

export const useCart = create<any>(
  persist(
    (set, get) => ({
      isCartOpen: false,
      cart: [],
      addToCart: (item: any) => {
        const itemInCart = get().cart.find(
          (cartItem: any) => cartItem.id === item.item.id
        );
        if (itemInCart) {
          set({
            cart: get().cart.map((el: any) =>
              el.id === item.item.id
                ? { ...el, count: itemInCart.count + item.item.count }
                : el
            ),
          });
        } else {
          set({ cart: [...get().cart, item.item] });
        }
      },
      removeFromCart: ({ id }: any) => {
        set({
          cart: get().cart.filter((el: any) => el.id !== id),
        });
      },
      increaseCount: ({ id }: any) => {
        set({
          cart: get().cart.map((el: any) =>
            el.id === id ? { ...el, count: el.count + 1 } : el
          ),
        });
      },

      decreaseCount: ({ id }: any) => {
        set({
          cart: get().cart.map((el: any) =>
            el.id === id && el.count > 1 ? { ...el, count: el.count - 1 } : el
          ),
        });
      },

      setIsCartOpen: () => {
        set({ isCartOpen: !get().isCartOpen });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useFavorites = create<any>(
  persist(
    (set, get) => ({
      isFavoritesOpen: false,
      favorites: [],
      toggleFavorites: (item: any) => {
        const itemInFavorites = get().favorites.find(
          (el: any) => el.id === item.item.id
        );
        if (itemInFavorites) {
          const index = get().favorites.findIndex(
            (i: any) => i.id === item.item.id
          );
          if (index !== -1) {
            const newFavorites = get().favorites.slice(); // Создаем копию массива
            newFavorites.splice(index, 1);
            set({
              favorites: newFavorites,
            });
          }
        } else {
          set({ favorites: [...get().favorites, item.item] });
        }
      },
      removeFromFavorites: ({ id }: any) => {
        set({
          favorites: get().favorites.filter((item: any) => item.id !== id),
        });
      },
      setIsFavoritesOpen: () => {
        set({ isFavoritesOpen: !get().isFavoritesOpen });
      },
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
