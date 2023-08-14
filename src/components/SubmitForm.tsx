import {
    Button,
    Card,
    Checkbox,
    Container,
    FormControlLabel,
    Menu,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../utils/baseurl";
import { User } from "../utils/interfaces";

interface SubmitFormProps {
    activeUser?: User;
}

type FormValues = {
    userid: number;
    title: string;
    artist: string;
    youtube_url: string;
    spotify_url: string;
    tags: string;
};

export default function SubmitForm({ activeUser }: SubmitFormProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleTagToggle = (tag: string) => {
        if (selectedTags.includes(tag)) {
            selectedTags.filter((item) => item !== tag);
        } else {
            setSelectedTags((prev) => [...prev, tag]);
        }
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

    const { register, handleSubmit } = form;
    const onSubmit = async (data: FormValues) => {
        const formattedData = {
            ...data,
            tags: selectedTags,
            userid: activeUser !== undefined ? activeUser.id : 0,
        };

        console.log(formattedData);
        const request = await axios.post(`${baseUrl}/songs`, formattedData);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const musicTags = [
        "Acoustic",
        "Alternative",
        "Ambient",
        "Blues",
        "Classical",
        "Country",
        "Electronic",
        "Folk",
        "Funk",
        "Hip-Hop",
        "Indie",
        "Jazz",
        "Metal",
        "Pop",
        "Punk",
        "R&B",
        "Reggae",
        "Rock",
        "Soul",
        "Techno",
        "Trance",
        "World",
    ];

    return (
        <>
            <Container sx={{ textAlign: "center", width: "50rem" }}>
                <Card sx={{ marginTop: "1rem" }}>
                    <Typography variant="h4" sx={{ color: "primary.main" }}>
                        Submit an article/video
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
        </>
    );
}
