import { Avatar, Badge, styled } from "@mui/material";
import { useMemo } from "react";

export const CustomAvatar = (props) => {
  let { avatarsrc, avatarsx, avataralt, dotColor, children, ...other } = props;
  const StyledBadge = useMemo(() => {
    return styled(Badge)(({ theme }) => ({
      "& .MuiBadge-badge": {
        backgroundColor: dotColor,
        color: dotColor,
        width: "16%",
        height: "16%",
        borderRadius: "50%",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
          position: "absolute",
          top: -1,
          left: -0.7,
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          animation: "ripple 1.2s infinite ease-in-out",
          border: "1px solid currentColor",
          content: '""',
        },
      },
      "@keyframes ripple": {
        "0%": {
          transform: "scale(.8)",
          opacity: 1,
        },
        "100%": {
          transform: "scale(2.4)",
          opacity: 0,
        },
      },
    }));
  }, [dotColor]);

  return (
    <StyledBadge {...other}>
      <Avatar alt={avataralt} src={avatarsrc} sx={avatarsx} />
      {children}
    </StyledBadge>
  );
};
