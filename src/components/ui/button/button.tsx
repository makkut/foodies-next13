import { Button, ButtonProps, styled } from "@mui/material";
import { grey, red } from "@mui/material/colors";

export const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  height: 45,
  color: "white",
  backgroundColor: red[500],
  "&:hover": {
    backgroundColor: red[700],
  },
}));

export const LogoutButton = styled(Button)<ButtonProps>(({ theme }) => ({
  height: 45,
  color: "white",
  backgroundColor: grey[500],
  "&:hover": {
    backgroundColor: grey[700],
  },
}));
