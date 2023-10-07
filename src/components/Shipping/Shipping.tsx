import { List, ListItem, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { useCookies } from "@/state/state";
import { ColorButton } from "../ui/button/button";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import CheckoutWizard from "../CheckoutWizard/CheckoutWizard";

const Form = styled("form")(() => ({
  width: "100%",
  maxWidth: 800,
  margin: "0 auto",
}));

const Shipping = () => {
  const router = useRouter();
  const { setShippingAddress, shippingAddress, userInfo } = useCookies(
    (state: any) => state
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  console.log("shippingAddress", shippingAddress);

  useEffect(() => {
    if (!userInfo) {
      return redirect("/login");
    }
    setValue("fullname", shippingAddress?.fullName);
    setValue("address", shippingAddress?.address);
    setValue("city", shippingAddress?.city);
    setValue("postalCode", shippingAddress?.postalCode);
    setValue("country", shippingAddress?.country);
  }, [shippingAddress]);

  const submitHandler = async ({
    fullName,
    address,
    city,
    postalCode,
    country,
  }: any) => {
    Cookies.set(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    setShippingAddress({
      fullName,
      address,
      city,
      postalCode,
      country,
    });

    router.push("/payment");
  };
  return (
    <div className="pt-5">
      <CheckoutWizard activeStep={1}></CheckoutWizard>
      <Form onSubmit={handleSubmit(submitHandler)} className="pt-5">
        <Typography component="h3" variant="h3" textAlign="center">
          Shipping Address
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  inputProps={{ type: "fullName" }}
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === "minLength"
                        ? "Full Name length is more than 1"
                        : "Full Name is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="address"
                  label="Address"
                  inputProps={{ type: "address" }}
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address
                      ? errors.address.type === "minLength"
                        ? "Address length is more than 1"
                        : "Address is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="city"
                  label="City"
                  inputProps={{ type: "city" }}
                  error={Boolean(errors.city)}
                  helperText={
                    errors.city
                      ? errors.city.type === "minLength"
                        ? "City length is more than 1"
                        : "City is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="postalCode"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="postalCode"
                  label="Postal Code"
                  inputProps={{ type: "postalCode" }}
                  error={Boolean(errors.postalCode)}
                  helperText={
                    errors.postalCode
                      ? errors.postalCode.type === "minLength"
                        ? "Postal Code length is more than 1"
                        : "Postal Code is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="postalCode"
                  label="Country"
                  inputProps={{ type: "country" }}
                  error={Boolean(errors.country)}
                  helperText={
                    errors.country
                      ? errors.country.type === "minLength"
                        ? "Country length is more than 1"
                        : "Country is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <ColorButton variant="contained" type="submit" fullWidth>
              Continue
            </ColorButton>
          </ListItem>
        </List>
      </Form>
    </div>
  );
};
export default Shipping;
