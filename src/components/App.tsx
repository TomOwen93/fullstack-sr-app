import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import CategoryPage from "./CategoryPage";
import Footer from "./Footer";
import HomePage from "./HomePage";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeOptions, ThemeProvider } from "@mui/material/styles";
import theme from "../utils/theme";
import axios from "axios";
import { baseUrl } from "../utils/baseurl";
import { Content } from "../utils/interfaces";

export const themeOptions: ThemeOptions = {
    palette: {
        mode: "dark",
        primary: {
            main: "#7e57c2",
        },
        secondary: {
            main: "#aaa3a6",
        },
    },
};

console.log(process.env.NODE_ENV);

function App() {
    const [activePage, setActivePage] = useState("home");
    const [contentList, setContentList] = useState<Content[]>([]);

    const fetchContent = async () => {
        const results = await axios.get(`${baseUrl}/resources`);
        setContentList(results.data.data);
        console.log("fetched");
    };

    useEffect(() => {
        fetchContent();
    }, []);

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Navbar />
                <HomePage />
                {contentList.length > 0 && (
                    <CategoryPage contentlist={contentList} />
                )}
                <Footer />
            </ThemeProvider>
        </div>
    );
}

export default App;
