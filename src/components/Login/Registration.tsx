import { List, ListItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import { ColorButton } from "../ui/button/button";
import { useLogin } from "@/state/state";

const Form = styled("form")(() => ({
  width: "100%",
  maxWidth: 800,
  margin: "0 auto",
}));

const Registration = () => {
  const { isAuth, setIsAuth } = useLogin((state: any) => state);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({
    name,
    email,
    password,
    confirmPassword,
  }: any) => {
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
    } catch (err) {
      toast.error("Error");
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit(submitHandler)} className="text-center">
        <Typography component="h3" variant="h3" textAlign="center">
          Register
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="name"
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
                  id="name"
                  label="Name"
                  inputProps={{ type: "name" }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === "minLength"
                        ? "Name length is more than 1"
                        : "Name is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
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
            <Controller
              name="confirmPassword"
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
                  id="confirmPassword"
                  label="Confirm Password"
                  inputProps={{ type: "password" }}
                  error={Boolean(errors.confirmPassword)}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.type === "minLength"
                        ? "Confirm Password length is more than 5"
                        : "Confirm Password is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <ColorButton
              variant="contained"
              type="submit"
              fullWidth
              size="medium"
            >
              Registrierung
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
          Autorisierung
        </button>
      </Form>
    </>
  );
};
export default Registration;
