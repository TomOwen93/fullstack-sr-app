import { useEffect, useState } from "react";
import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import Navbar from "./Navbar";
import CategoryPage from "./ContentPage";
import Footer from "./Footer";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import axios from "axios";
import { baseUrl } from "../utils/baseurl";
import { Content, Genre, User } from "../utils/interfaces";
import { Routes, Route, useLocation } from "react-router-dom";
import AboutPage from "./AboutPage";
import FavouritesPage from "./FavouritesPage";

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

function App() {
    const [activePage, setActivePage] = useState("");
    const [allSongsList, setAllSongsList] = useState<Content[]>([]);
    const [favouritesList, setFavouritesList] = useState<Content[]>([]);
    const [activeUser, setActiveUser] = useState<User>();
    const [userList, setUserList] = useState<User[]>([]);
    const [genreList, setGenreList] = useState<Genre[]>([]);

    const fetchSongs = async () => {
        const results = await axios.get(`${baseUrl}/songs`);
        setAllSongsList(results.data);
        console.log(results.data);
        console.log("fetched songs");
    };

    const fetchUsers = async () => {
        const results = await axios.get(`${baseUrl}/users`);
        setUserList(results.data.data);
        console.log(results.data.data);
        console.log("fetched user list");
    };

    const fetchGenres = async () => {
        const genres = await axios.get(`${baseUrl}/genres`);
        setGenreList(genres.data.result);
        console.log("fetched genre list");
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

    useEffect(() => {
        const fetchFavourites = async () => {
            const favourites = await axios.get(
                `${baseUrl}/favourites/${activeUser?.id}`
            );
            setFavouritesList(favourites.data);
            console.log(favourites.data);
        };
        if (activeUser !== undefined) {
            fetchFavourites();
        }
    }, [activeUser, activePage]);

    const location = useLocation();

    useEffect(() => {
        setActivePage(location.pathname);
    }, [location.pathname]);

    console.log(activePage);
    return (
        <div className="App">
            <ThemeProvider theme={themeOptions}>
                <Navbar />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <CategoryPage
                                contentlist={allSongsList}
                                handleUser={handleUser}
                                userList={userList}
                                activeUser={activeUser}
                                genreList={genreList}
                            />
                        }
                    />

                    <Route
                        path="favourites"
                        element={
                            <FavouritesPage
                                contentlist={favouritesList}
                                handleUser={handleUser}
                                userList={userList}
                                activeUser={activeUser}
                                genreList={genreList}
                            />
                        }
                    />
                    <Route path="about" element={<AboutPage />} />
                </Routes>
                <Footer />
            </ThemeProvider>
        </div>
    );
}

export default App;
