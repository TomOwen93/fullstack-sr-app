import {
    Alert,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Snackbar,
    Stack,
    Typography,
} from "@mui/material";
import YoutubeEmbed from "./YoutubeEmbed";
import { Comment, Content, User } from "../utils/interfaces";
import { StarOutlineOutlined, StarOutlineSharp } from "@mui/icons-material";
import matchYouTubeURL from "../utils/matchYouTubeURL";
import { SpotifyEmbed } from "spotify-embed";
import axios from "axios";
import { baseUrl } from "../utils/baseurl";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Comments from "./Comments";

interface ContentCardProps {
    content: Content;
    activeUser?: User;
    favouritesList?: Content[];
    handleFavouriteUpdate: () => void;
    commentsList?: Comment[];
    fetchComments: () => void;
}

export default function ContentCard({
    content,
    activeUser,
    favouritesList,
    handleFavouriteUpdate,
    commentsList,
    fetchComments,
}: ContentCardProps): JSX.Element {
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const handleAddFavourite = async (song: Content) => {
        if (activeUser === undefined) {
            setOpenAlert(true);
        } else {
            await axios.post(`${baseUrl}/favourites`, {
                id: song.id,
                userid: activeUser.id,
            });
            handleFavouriteUpdate();
        }
    };

    const handleRemoveFavourite = async (song: Content) => {
        if (activeUser === undefined) {
            setOpenAlert(true);
        } else {
            await axios.delete(`${baseUrl}/favourites/${song.id}`, {
                data: { activeUser },
            });
            handleFavouriteUpdate();
        }
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const location = useLocation();

    console.log(favouritesList);

    const songsComments = commentsList?.filter(
        (comment) => comment.song_id === Number(content.id)
    );

    return (
        <>
            <Card
                variant="outlined"
                sx={{
                    marginTop: "2rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center",
                }}
            >
                <CardContent>
                    {content.youtube_url !== "" &&
                        content.youtube_url !== null &&
                        content.youtube_url !== undefined && (
                            <Container>
                                <YoutubeEmbed
                                    embedId={matchYouTubeURL(
                                        content.youtube_url
                                    )}
                                />
                            </Container>
                        )}
                    {content.spotify_url !== null && (
                        <SpotifyEmbed src={`${content.spotify_url}`} />
                    )}

                    <Stack>
                        <Typography gutterBottom variant="h4">
                            {content.title}
                        </Typography>
                    </Stack>
                    <Typography gutterBottom variant="h4">
                        {content.artist}
                    </Typography>

                    <Divider />
                    <Typography variant="body1">
                        Submitted by: {content.username}
                    </Typography>
                    <Divider />
                    {content.genre[0] !== null && (
                        <Typography variant="subtitle2">
                            Tags:{" "}
                            {content.genre.map((genre, index) =>
                                index === content.genre.length - 1
                                    ? `${genre}`
                                    : `${genre}, `
                            )}
                        </Typography>
                    )}
                </CardContent>
                {location.pathname === "/favourites" ||
                favouritesList?.some((fav) => fav.title === content.title) ? (
                    <Button
                        onClick={() => handleRemoveFavourite(content)}
                        startIcon={
                            <StarOutlineSharp
                                style={{ width: "2rem", height: "2rem" }}
                            />
                        }
                    >
                        Remove From Favourites
                    </Button>
                ) : (
                    <Button
                        onClick={() => handleAddFavourite(content)}
                        startIcon={
                            <StarOutlineOutlined
                                style={{ width: "2rem", height: "2rem" }}
                            />
                        }
                    >
                        Add to Favourites
                    </Button>
                )}
                <Comments
                    activeUser={activeUser}
                    songid={content.id}
                    songsComments={songsComments}
                    fetchComments={fetchComments}
                />
            </Card>

            <Snackbar
                open={openAlert}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
            >
                <Alert onClose={handleCloseAlert} severity="warning">
                    You need to login to add favourites!
                </Alert>
            </Snackbar>
        </>
    );
}
