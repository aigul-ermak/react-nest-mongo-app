import { Box, Typography } from "@mui/material";

export const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                width: "100%",
                textAlign: "center",
                p: 2,
                bgcolor: "primary.main",
                color: "white",
            }}
        >
            <Typography variant="body2">© 2025 Blog Platform</Typography>
        </Box>
    );
};