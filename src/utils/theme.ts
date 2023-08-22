import { deepOrange, deepPurple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: deepPurple[500],
        },
        secondary: {
            main: deepOrange[500],
        },
    },
});

export default theme;
