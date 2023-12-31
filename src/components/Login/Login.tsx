import { List, ListItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import { useCookies, useLogin } from "@/state/state";
import { ColorButton } from "../ui/button/button";
import Cookies from "js-cookie";

const Form = styled("form")(() => ({
  width: "100%",
  maxWidth: 800,
  margin: "0 auto",
}));

const Login = () => {
  const { isAuth, setIsAuth } = useLogin((state: any) => state);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { setUserInfo } = useCookies((state: any) => state);

  const submitHandler = async ({ email, password }: any) => {
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      Cookies.set("userInfo", JSON.stringify(data));
      setUserInfo(data);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit(submitHandler)} className="text-center">
        <Typography component="h3" variant="h3" textAlign="center">
          Login
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: "email" }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === "pattern"
                        ? "Email is not valid"
                        : "Email is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: "password" }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === "minLength"
                        ? "Password length is more than 5"
                        : "Password is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <ColorButton variant="contained" type="submit" fullWidth>
              Autorisierung
            </ColorButton>
          </ListItem>
        </List>
        <button
          className="text-center"
          onClick={(e) => {
            e.preventDefault;
            setIsAuth();
          }}
        >
          Registrierung
        </button>
      </Form>
    </>
  );
};
export default Login;
