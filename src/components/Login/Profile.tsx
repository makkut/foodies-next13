import { List, ListItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { useCookies } from "@/state/state";
import { toast } from "react-toastify";
import { ColorButton, LogoutButton } from "../ui/button/button";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";

const Form = styled("form")(() => ({
  width: "100%",
  maxWidth: 800,
  margin: "0 auto",
}));

const Profile = () => {
  const { setUserInfo, logOut, userInfo } = useCookies((state: any) => state);
  const queryClient = useQueryClient();
  //   const user = JSON.parse(userInfo);
  //   const { data, isLoading, isError } = useUser(user._id);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  useEffect(() => {
    if (!userInfo) {
      return redirect("/login");
    }
    setValue("name", userInfo.name);
    setValue("email", userInfo.email);
  }, [userInfo]);

  //   const { mutate } = useMutation({
  //     mutationFn: (body: any) =>
  //       axios.put("/api/users/profile", body, {
  //         headers: { authorization: `Bearer ${body.token}` },
  //       }),
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["employees"] });
  //     },
  //   });
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
      //   mutate({
      //     id: user._id,
      //     name,
      //     email,
      //     password,
      //     token: user.token,
      //   });
      const { data } = await axios.put(
        "/api/users/profile",
        {
          id: userInfo._id,
          name,
          email,
          password,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      setUserInfo(data);
      Cookies.set("userInfo", JSON.stringify(data));
      toast.success("saved successfully");
    } catch (err: any) {
      console.log("err", err);
      //   toast.error(err.message);
      toast.error(err.response.statusText);
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Typography component="h3" variant="h3" textAlign="center">
          Edit
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
            <ColorButton variant="contained" type="submit" fullWidth>
              Save
            </ColorButton>
          </ListItem>
          <ListItem>
            <LogoutButton
              onClick={() => {
                logOut();
                Cookies.remove("userInfo");
                redirect("/login");
              }}
              fullWidth
            >
              Logout
            </LogoutButton>
          </ListItem>
        </List>
      </Form>
    </>
  );
};
export default Profile;
