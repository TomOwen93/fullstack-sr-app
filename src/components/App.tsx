import { useEffect, useState } from "react";
import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import Navbar from "./Navbar";
import CategoryPage from "./ContentPage";
import Footer from "./Footer";
import HomePage from "./HomePage";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import axios from "axios";
import { baseUrl } from "../utils/baseurl";
import { Content, Genre, User } from "../utils/interfaces";

export const themeOptions: ThemeOptions = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#1afb98",
        },
        secondary: {
            main: "#ffffff",
        },
    },
});

console.log(process.env.NODE_ENV);

function App() {
    const [activePage, setActivePage] = useState("home");
    const [contentList, setContentList] = useState<Content[]>([]);
    const [activeUser, setActiveUser] = useState<User>();
    const [userList, setUserList] = useState<User[]>([]);
    const [genreList, setGenreList] = useState<Genre[]>([]);

    const fetchSongs = async () => {
        const results = await axios.get(`${baseUrl}/songs`);
        setContentList(results.data.data);
        console.log(results.data.data);
        console.log("fetched");
    };

    const fetchUsers = async () => {
        const results = await axios.get(`${baseUrl}/users`);
        setUserList(results.data.data);
        console.log(results.data.data);
        console.log("fetched");
    };

    const fetchGenres = async () => {
        const genres = await axios.get(`${baseUrl}/genres`);
        setGenreList(genres.data.result);
    };

    const handleUser = (value: string | number) => {
        console.log(value);
        setActiveUser(userList.find((user) => user.id === value));
    };

    useEffect(() => {
        fetchSongs();
        fetchUsers();
        fetchGenres();
    }, []);

    return (
        <div className="App">
            <ThemeProvider theme={themeOptions}>
                <Navbar />
                <HomePage />
                {userList.length > 0 && (
                    <CategoryPage
                        contentlist={contentList}
                        handleUser={handleUser}
                        userList={userList}
                        activeUser={activeUser}
                        genreList={genreList}
                    />
                )}
                <Footer />
            </ThemeProvider>
        </div>
    );
}

export default App;
