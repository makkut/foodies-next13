import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useCookies } from "@/state/state";
import { ColorButton } from "../ui/button/button";
import { useEffect } from "react";
import Cookies from "js-cookie";
import CheckoutWizard from "../CheckoutWizard/CheckoutWizard";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Form = styled("form")(() => ({
  width: "100%",
  maxWidth: 800,
  margin: "0 auto",
}));

const Payment = () => {
  const router = useRouter();
  const { shippingAddress, setPaymentMethod, paymentMethod } = useCookies(
    (state: any) => state
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/shipping");
    } else {
      setPaymentMethod(Cookies.get("paymentMethod") || "");
    }
  }, [shippingAddress]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (!paymentMethod) {
      toast.error("Payment method is required");
    } else {
      Cookies.set("paymentMethod", paymentMethod);
      router.push("/placeorder");
    }
  };
  return (
    <div className="pt-5">
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <Form onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          Payment Method
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  label="PayPal"
                  value="PayPal"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Stripe"
                  value="Stripe"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Cash"
                  value="Cash"
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <ColorButton variant="contained" type="submit" fullWidth>
              Continue
            </ColorButton>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type="button"
              variant="contained"
              color="secondary"
              onClick={() => router.push("/shipping")}
            >
              Back
            </Button>
          </ListItem>
        </List>
      </Form>
    </div>
  );
};
export default Payment;
