import { Box, Typography } from "@mui/material";

const ErrorMessage = ({ SeriesError }) => {
  
  return (
    <Box key={SeriesError}>
      <Typography
        sx={{
          color: "error.main",
          textAlign: "center",
          fontWeight: "bold",
          animation: "fadeIn 0.3s ease-in-out, shake 0.4s ease-in-out",
          "@keyframes fadeIn": {
            from: { opacity: 0, transform: "translateY(-5px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
          "@keyframes shake": {
            "0%, 100%": { transform: "translateX(0)" },
            "25%": { transform: "translateX(-3px)" },
            "50%": { transform: "translateX(3px)" },
            "75%": { transform: "translateX(-3px)" },
          },
        }}
      >
        You're kidding, right?
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
