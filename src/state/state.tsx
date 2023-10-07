import {
  CartItemInterface,
  FavoritesInterface,
  ItemInterface,
} from "@/interfaces/interfaces";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

type PageState = {
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (page: number) => void;
};
type CookiesInfo = {
  userInfo: any;
  shippingAddress: any;
  paymentMethod: any;
  setUserInfo: (value: string) => void;
};

type FilterState = {
  filter: string;
  setFilter: (value: string) => void;
};

type AuthState = {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
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

type MobileMenuState = {
  isMobileMenu: boolean;
  setMobileMenu: () => void;
  setMobileMenuFalse: () => void;
};

export const useLogin = create<AuthState>((set, get) => ({
  isAuth: false,
  setIsAuth: (value) => set({ isAuth: !get().isAuth }),
}));

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
  setSearch: (value) => set({ search: value }),
}));

export const useMobileMenu = create<MobileMenuState>((set, get) => ({
  isMobileMenu: false,
  setMobileMenu: () => {
    set({ isMobileMenu: !get().isMobileMenu });
  },
  setMobileMenuFalse: () => {
    set({ isMobileMenu: false });
  },
}));

export const useCart = create<any>(
  persist(
    (set, get) => ({
      isCartOpen: false,
      cart: [],
      addToCart: (item: any) => {
        const itemInCart = get().cart.find(
          (cartItem: ItemInterface) => cartItem.id === item.item.id
        );
        if (itemInCart) {
          set({
            cart: get().cart.map((el: CartItemInterface) =>
              el.id === item.item.id
                ? { ...el, count: itemInCart.count + item.item.count }
                : el
            ),
          });
        } else {
          set({ cart: [...get().cart, item.item] });
        }
      },
      removeFromCart: ({ id }: { id: string }) => {
        set({
          cart: get().cart.filter((el: CartItemInterface) => el.id !== id),
        });
      },
      increaseCount: ({ id }: { id: string }) => {
        set({
          cart: get().cart.map((el: CartItemInterface) =>
            el.id === id ? { ...el, count: el.count + 1 } : el
          ),
        });
      },

      decreaseCount: ({ id }: { id: string }) => {
        set({
          cart: get().cart.map((el: CartItemInterface) =>
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
          (el: FavoritesInterface) => el.id === item.item.id
        );
        if (itemInFavorites) {
          const index = get().favorites.findIndex(
            (i: FavoritesInterface) => i.id === item.item.id
          );
          if (index !== -1) {
            const newFavorites = get().favorites.slice();
            newFavorites.splice(index, 1);
            set({
              favorites: newFavorites,
            });
          }
        } else {
          set({ favorites: [...get().favorites, item.item] });
        }
      },
      removeFromFavorites: ({ id }: { id: string }) => {
        set({
          favorites: get().favorites.filter(
            (item: FavoritesInterface) => item.id !== id
          ),
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

export const usePage = create<PageState>((set) => ({
  currentPage: 1,
  itemsPerPage: 50,

  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },

  setItemsPerPage: (pages: number) => {
    set({ itemsPerPage: pages });
  },
}));

export const useCookies = create<CookiesInfo>((set) => {
  const { cart, setIsCartOpen } = useCart();
  return {
    // userInfo: null,
    // cartOrder: {
    //   cart,
    //   shippingAddress: Cookies.get("shippingAddress")
    //     ? JSON.parse(Cookies.get("shippingAddress") as string)
    //     : null,
    // },
    userInfo: Cookies.get("userInfo")
      ? JSON.parse(Cookies.get("userInfo") as string)
      : null,
    shippingAddress: Cookies.get("shippingAddress")
      ? JSON.parse(Cookies.get("shippingAddress") as string)
      : null,
    paymentMethod: Cookies.get("paymentMethod")
      ? Cookies.get("paymentMethod")
      : "",
    setUserInfo: (value: any) => {
      localStorage.setItem("userInfo", JSON.stringify(value));
      set({ userInfo: value });
    },
    setShippingAddress: (value: any) => {
      localStorage.setItem("shippingAddress", JSON.stringify(value));
      set({ shippingAddress: value });
    },
    setPaymentMethod: (value: any) => {
      localStorage.setItem("paymentMethod", value);
      set({ paymentMethod: value });
    },
    logOut: () => {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("shippingAddress");
      set({ userInfo: null });
      set({ shippingAddress: null });
    },
  };
});
