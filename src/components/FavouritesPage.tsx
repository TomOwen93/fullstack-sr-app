import {
    Container,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { Comment, Content, Genre, User } from "../utils/interfaces";
import ContentCard from "./ContentCard";

interface FavouritesPageProps {
    contentlist: Content[];
    handleUser: (event: string | number) => void;
    userList: User[];
    activeUser?: User;
    genreList: Genre[];
    activePage: string;
    handleFavouriteUpdate: () => void;
    commentsList?: Comment[];
    fetchComments: () => void;
}

export default function FavouritesPage({
    contentlist,
    activeUser,
    userList,
    handleUser,
    handleFavouriteUpdate,
    commentsList,
    fetchComments,
}: FavouritesPageProps): JSX.Element {
    return (
        <>
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

            {contentlist.length > 0 && activeUser !== undefined ? (
                <Grid
                    container
                    spacing={3}
                    justifyContent={
                        contentlist.length === 1 ? "center" : "flex-start"
                    }
                >
                    {contentlist.map((content, index) => (
                        <Grid item xs="auto" key={index}>
                            <ContentCard
                                content={content}
                                activeUser={activeUser}
                                handleFavouriteUpdate={handleFavouriteUpdate}
                                commentsList={commentsList}
                                fetchComments={fetchComments}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <>
                    <Divider />
                    <Typography sx={{ textAlign: "center" }} variant="h4">
                        You have no favourites! Go back to the home page and
                        start finding some new music!
                    </Typography>
                </>
            )}
        </>
    );
}
