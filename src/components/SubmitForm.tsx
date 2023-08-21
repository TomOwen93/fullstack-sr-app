import {
    Alert,
    Button,
    Card,
    Checkbox,
    Container,
    FormControlLabel,
    Menu,
    MenuItem,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../utils/baseurl";
import { Genre, User } from "../utils/interfaces";
import getErrorText from "../utils/getErrorText";
import matchGenreId from "../utils/matchGenreId";

interface SubmitFormProps {
    activeUser?: User;
    genreList: Genre[];
}

type FormValues = {
    userid: number;
    title: string;
    artist: string;
    youtube_url: string;
    spotify_url: string;
    tags: string;
};

export default function SubmitForm({ activeUser, genreList }: SubmitFormProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [openSubmit, setOpenSubmit] = useState<boolean>(false);

    const handleTagToggle = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((item) => item !== tag));
        } else {
            setSelectedTags((prev) => [...prev, tag]);
        }
    };

    const handleCloseAlert = () => {
        setOpenAlert(!openAlert);
    };

    const handleCloseSubmit = () => {
        setOpenSubmit(!openSubmit);
    };

    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };

    const form = useForm<FormValues>({
        defaultValues: {
            title: "",
            userid: 0,
            artist: "",
            youtube_url: "",
            spotify_url: "",
        },
    });

    const { register, handleSubmit, reset } = form;

    const onSubmit = async (data: FormValues) => {
        if (activeUser === undefined) {
            setOpenAlert(true);
            setError("User");
        } else if (data.title === "" || data.artist === "") {
            setOpenAlert(true);
            setError("Title/Artist");
        } else if (data.youtube_url === "" && data.spotify_url === "") {
            setOpenAlert(true);
            setError("URL");
        } else {
            const formattedData = {
                ...data,
                userid: activeUser !== undefined ? activeUser.id : 0,
            };

            const songid = await axios.post(`${baseUrl}/songs`, formattedData);

            if (selectedTags.length > 0) {
                const selectedIds = matchGenreId(selectedTags, genreList);

                await axios.post(`${baseUrl}/songs_genres`, {
                    songid: songid.data,
                    genreid: selectedIds,
                });
            }

            reset();
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const musicTags = genreList.map((genre) => genre.genre);
    return (
        <>
            <Container sx={{ textAlign: "center", width: "50rem" }}>
                <Card sx={{ marginTop: "1rem" }}>
                    <Typography variant="h4" sx={{ color: "primary.main" }}>
                        Submit a Song
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Stack>
                            <TextField
                                id="outlined-basic"
                                label="Title"
                                variant="filled"
                                {...register("title")}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Artist"
                                variant="filled"
                                {...register("artist")}
                            />
                            <TextField
                                id="outlined-basic"
                                label="YouTube URL"
                                variant="filled"
                                {...register("youtube_url")}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Spotify URL"
                                variant="filled"
                                {...register("spotify_url")}
                            />
                            <Button id="tags-button" onClick={handleClick}>
                                Choose tags
                            </Button>
                            <Menu
                                id="tags-dropdown"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                sx={{ color: "primary" }}
                                {...register("tags")}
                            >
                                {musicTags.map((tag, index) => (
                                    <MenuItem key={index}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedTags.includes(
                                                        tag
                                                    )}
                                                    onChange={() =>
                                                        handleTagToggle(tag)
                                                    }
                                                />
                                            }
                                            label={tag}
                                        />
                                    </MenuItem>
                                ))}
                            </Menu>
                            <Button type="submit">Submit</Button>
                        </Stack>
                    </form>
                </Card>
            </Container>

            {error && (
                <Snackbar
                    open={openAlert}
                    autoHideDuration={3000}
                    onClose={handleCloseAlert}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert onClose={handleCloseAlert} severity="error">
                        {getErrorText(error)}
                    </Alert>
                </Snackbar>
            )}

            <Snackbar
                open={openSubmit}
                autoHideDuration={3000}
                onClose={handleCloseSubmit}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSubmit} severity="success">
                    Song successfully submitted!
                </Alert>
            </Snackbar>
        </>
    );
}
