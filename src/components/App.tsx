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
import { Comment, Content, Genre, User } from "../utils/interfaces";
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
    const [refreshFavourite, setRefreshFavourite] = useState<number>(0);
    const [commentsList, setCommentsList] = useState<Comment[]>();

    const fetchSongs = async () => {
        const results = await axios.get(`${baseUrl}/songs`);
        setAllSongsList(results.data);
    };

    const fetchUsers = async () => {
        const results = await axios.get(`${baseUrl}/users`);
        setUserList(results.data.data);
    };

    const fetchGenres = async () => {
        const genres = await axios.get(`${baseUrl}/genres`);
        setGenreList(genres.data.result);
    };

    const fetchComments = async () => {
        const comments = await axios.get(`${baseUrl}/comments`);
        setCommentsList(comments.data.rows);
    };

    const handleUser = (value: string | number) => {
        setActiveUser(userList.find((user) => user.id === value));
    };

    const handleFavouriteUpdate = () => {
        setRefreshFavourite((prev) => (prev += 1));
    };

    useEffect(() => {
        fetchSongs();
        fetchUsers();
        fetchGenres();
        fetchComments();
    }, []);

    useEffect(() => {
        const fetchFavourites = async () => {
            const favourites = await axios.get(
                `${baseUrl}/favourites/${activeUser?.id}`
            );
            setFavouritesList(favourites.data);
        };

        if (activeUser !== undefined) {
            fetchFavourites();
        }
    }, [activeUser, activePage, refreshFavourite]);

    const location = useLocation();

    useEffect(() => {
        setActivePage(location.pathname);
    }, [location.pathname]);

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
                                activePage={activePage}
                                favouritesList={favouritesList}
                                handleFavouriteUpdate={handleFavouriteUpdate}
                                fetchSongs={fetchSongs}
                                fetchComments={fetchComments}
                                commentsList={commentsList}
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
                                activePage={activePage}
                                handleFavouriteUpdate={handleFavouriteUpdate}
                                commentsList={commentsList}
                                fetchComments={fetchComments}
                                fetchSongs={fetchSongs}
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
