
import {Box, Typography} from "@mui/material";

export const Home = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "calc(100vh - 64px - 48px)",
                textAlign: "center",
            }}
        >
            <Typography variant="h4">
                Welcome to the Blog Platform
            </Typography>
        </Box>
    );
};

