import { deepOrange, deepPurple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// Define your primary and secondary colors
const theme = createTheme({
    palette: {
        primary: {
            main: deepPurple[500], // Accessing the 500 shade of deepPurple
        },
        secondary: {
            main: deepOrange[500], // Accessing the 500 shade of deepOrange
        },
    },
});

export default theme;
