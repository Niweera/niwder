import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/styles";

const CustomizedToolTip = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    children={props.children}
    classes={{ popper: className }}
  />
))(({ theme, nomaxwidth }) => {
  return {
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.tooltip,
      color: theme.palette.text.primary,
      boxShadow: theme.shadows[1],
      fontSize: 14,
      maxWidth: !nomaxwidth ? "none" : null,
    },
  };
});

export default CustomizedToolTip;
