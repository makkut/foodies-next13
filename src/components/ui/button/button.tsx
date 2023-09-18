import { Button, ButtonProps, styled } from "@mui/material";
import { purple } from "@mui/material/colors";

export const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "black",
  backgroundColor: "purple",
  "&:hover": {
    backgroundColor: "blue",
  },
}));
