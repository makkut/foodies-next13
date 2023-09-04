"use client";
import Image from "next/image";
import { useCart, useFavorites } from "@/state/state";
import { Close } from "@mui/icons-material";
import { Box, Divider, Drawer, IconButton, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FavoritesInterface } from "@/interfaces/interfaces";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FavoritesDrawer = () => {
  const {
    favorites,
    isFavoritesOpen,
    setIsFavoritesOpen,
    removeFromFavorites,
  } = useFavorites();
  const { addToCart } = useCart();
  const router = useRouter();

  return (
    <>
      <Drawer
        open={isFavoritesOpen}
        anchor="right"
        onClose={() => setIsFavoritesOpen()}
      >
        <Box sx={{ width: 320, paddingX: 2 }} role="presentation">
          <div className="text-right">
            <IconButton onClick={() => setIsFavoritesOpen()}>
              <Close />
            </IconButton>
          </div>
          <h3 className="text-center font-bold">FAVORITES</h3>
          <Box>
            <Box>
              {favorites.map((item: FavoritesInterface) => {
                return (
                  <Box key={`${item.name}-${item.id}`}>
                    <FlexBox p="15px 0">
                      <Box flex="1 1 40%">
                        <Image
                          className="cursor-pointer"
                          alt={item?.name}
                          width={123}
                          height={164}
                          src={item.imageUrl}
                          onClick={() => {
                            setIsFavoritesOpen();
                            router.push(`/items/${item.id}`);
                          }}
                        />
                      </Box>
                      <Box flex="1 1 60%" className="pl-2">
                        <FlexBox mb="5px">
                          <p
                            className="font-bold cursor-pointer"
                            onClick={() => {
                              setIsFavoritesOpen();
                              router.push(`/items/${item.id}`);
                            }}
                          >
                            {item.name}
                          </p>
                          <IconButton
                            onClick={() => removeFromFavorites({ id: item.id })}
                          >
                            <Close />
                          </IconButton>
                        </FlexBox>
                        <p>{`${item.details.slice(0, 80)}...`}</p>
                        <p className="pl-2 pt-2 font-bold">{item.price} $</p>
                        <FlexBox m="15px 0">
                          <button
                            onClick={() => {
                              addToCart({
                                item: { ...item, count: 1 },
                              });
                              toast.success(`${item.name} - 1 added to cart`);
                            }}
                            className="text-white bg-red-600 hover:bg-red-500 px-5 py-2 duration-500 transform rounded-sm"
                          >
                            Add to Cart
                          </button>
                        </FlexBox>
                      </Box>
                    </FlexBox>
                    <Divider />
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default FavoritesDrawer;
