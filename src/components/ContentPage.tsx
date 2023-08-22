import ContentCard from "./ContentCard";
import { Comment, Content, Genre, User } from "../utils/interfaces";
import {
    Box,
    Container,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import SubmitForm from "./SubmitForm";

interface ContentPageProps {
    contentlist: Content[];
    handleUser: (event: string | number) => void;
    userList: User[];
    activeUser?: User;
    genreList: Genre[];
    activePage: string;
    favouritesList?: Content[];
    handleFavouriteUpdate: () => void;
    fetchSongs: () => void;
    commentsList?: Comment[];
    fetchComments: () => void;
}

export default function ContentPage({
    contentlist,
    handleUser,
    userList,
    activeUser,
    genreList,
    favouritesList,
    handleFavouriteUpdate,
    fetchSongs,
    commentsList,
    fetchComments,
}: ContentPageProps): JSX.Element {
    return (
        <>
            {" "}
            <Container sx={{ textAlign: "center", width: "50rem" }}>
                <FormControl sx={{ m: 1, minWidth: 120, bgcolor: "black" }}>
                    <InputLabel id="demo-simple-select-helper-label">
                        Name
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={activeUser !== undefined ? activeUser.id : ""}
                        label="Name"
                        sx={{ color: "secondary" }}
                        onChange={(e) => handleUser(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {userList.map((user, index) => (
                            <MenuItem key={index} value={user.id}>
                                {user.username}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Choose a user to login as</FormHelperText>
                </FormControl>
            </Container>
            <SubmitForm
                activeUser={activeUser}
                genreList={genreList}
                fetchSongs={fetchSongs}
            />
            <Box sx={{ alignContent: "center" }}>
                <Grid
                    container
                    spacing={3}
                    justifyContent={
                        contentlist.length === 1 ? "center" : "flex-start"
                    }
                >
                    {contentlist.map((content, index) => (
                        <Grid item xs={4} key={index}>
                            <ContentCard
                                content={content}
                                activeUser={activeUser}
                                favouritesList={favouritesList}
                                handleFavouriteUpdate={handleFavouriteUpdate}
                                commentsList={commentsList}
                                fetchComments={fetchComments}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
}
