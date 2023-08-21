import {
    Alert,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Snackbar,
    Typography,
} from "@mui/material";
import YoutubeEmbed from "./YoutubeEmbed";
import { Content, User } from "../utils/interfaces";
import { StarOutlineOutlined } from "@mui/icons-material";
import matchYouTubeURL from "../utils/matchYouTubeURL";
import { SpotifyEmbed } from "spotify-embed";
import axios from "axios";
import { baseUrl } from "../utils/baseurl";
import { useState } from "react";

interface ContentCardProps {
    content: Content;
    activeUser?: User;
}

export default function ContentCard({
    content,
    activeUser,
}: ContentCardProps): JSX.Element {
    const [openAlert, setOpenAlert] = useState<boolean>(false);

    const handleFavourite = async (song: Content) => {
        if (activeUser === undefined) {
            setOpenAlert(true);
        } else {
            await axios.post(`${baseUrl}/favourites`, {
                id: song.id,
                userid: activeUser.id,
            });
        }
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

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
                    <Typography gutterBottom variant="h4">
                        {content.title}
                    </Typography>
                    <Divider />
                    <Typography variant="body1">{content.artist}</Typography>
                    <Typography variant="subtitle2">
                        Submitted by: {content.username}
                    </Typography>
                    <Divider />
                    <Typography variant="h6">
                        Tags: {content.genre.map((genre) => `${genre}, `)}
                    </Typography>
                </CardContent>
                <Button
                    onClick={() => handleFavourite(content)}
                    startIcon={
                        <StarOutlineOutlined
                            style={{ width: "2rem", height: "2rem" }}
                        />
                    }
                >
                    Add to Favourites
                </Button>
                {/* <Comments /> */}
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
