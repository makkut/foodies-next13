"use client";
import Image from "next/image";
import { useCart } from "@/state/state";
import { Add, Close, Remove } from "@mui/icons-material";
import { Box, Divider, Drawer, IconButton, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import { CartItemInterface } from "@/interfaces/interfaces";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    increaseCount,
    decreaseCount,
    removeFromCart,
  } = useCart();
  const router = useRouter();

  var map = cart.reduce((acc: any, cur: { id: string; count: number }) => {
    acc[cur.id] = acc[cur.id] || {
      id: cur.id,
      count: [],
    };
    acc[cur.id].count.push(cur.count);
    return acc;
  }, {});

  var result = Object.values(map);
  console.log("result", result);
  result.forEach((element: any) => {
    console.log("element1", element);
    const initialValue = 0;
    const sumWithInitial = element.count.reduce(
      (accumulator: number, currentValue: number) => accumulator + currentValue,
      initialValue
    );
    element.count = sumWithInitial;
  });

  const totalPrice = cart.reduce(
    (total: number, item: { count: number; price: number }) => {
      return total + item.count * item.price;
    },
    0
  );

  return (
    <>
      <Drawer open={isCartOpen} anchor="right" onClose={() => setIsCartOpen()}>
        <Box sx={{ width: 320, paddingX: 2 }} role="presentation">
          <div className="text-right">
            <IconButton onClick={() => setIsCartOpen()}>
              <Close />
            </IconButton>
          </div>
          <h3 className="text-center font-bold">SHOPPING BAG</h3>
          <Box>
            {cart.map((item: CartItemInterface) => {
              console.log("item", item);
              return (
                <Box key={`${item.name}-${item.id}`}>
                  <FlexBox p="15px 0">
                    <Box flex="1 1 40%">
                      <Image
                        alt={item?.imageUrl}
                        width={123}
                        height={164}
                        src={item?.imageUrl}
                      />
                    </Box>
                    <Box flex="1 1 60%" className="pl-2">
                      <FlexBox mb="5px">
                        <p className="font-bold">{item.name}</p>
                        <IconButton
                          onClick={() => removeFromCart({ id: item.id })}
                        >
                          <Close />
                        </IconButton>
                      </FlexBox>
                      <p>{`${item.details.slice(0, 80)}...`}</p>
                      <p className="pl-2 pt-2 font-bold">{item.price} $</p>
                      <FlexBox m="15px 0">
                        <Box className="flex items-center border-spacing-[1.5px]">
                          <IconButton
                            onClick={() => decreaseCount({ id: item.id })}
                          >
                            <Remove />
                          </IconButton>
                          <p>{item.count}</p>
                          <IconButton
                            onClick={() => increaseCount({ id: item.id })}
                          >
                            <Add />
                          </IconButton>
                        </Box>
                      </FlexBox>
                    </Box>
                  </FlexBox>
                  <Divider />
                </Box>
              );
            })}
          </Box>
          {cart.length > 0 && (
            <Box className="w-[100%]">
              <FlexBox>
                <p className="font-bold">SUBTOTAL</p>
                <p className="font-bold">{totalPrice} $</p>
              </FlexBox>

              <button
                className="px-[40px] py-[15px] min-w-[100%] my-[20px] bg-red-500 text-white font-bold hover:bg-red-800 duration-500
              transform rounded-md"
                onClick={() => {
                  router.push("/checkout");
                  setIsCartOpen();
                }}
              >
                CHECKOUT
              </button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default CartDrawer;
