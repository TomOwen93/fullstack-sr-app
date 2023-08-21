import {
    Container,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { Content, User, Genre } from "../utils/interfaces";
import ContentCard from "./ContentCard";

interface FavouritesPageProps {
    contentlist: Content[];
    handleUser: (event: string | number) => void;
    userList: User[];
    activeUser?: User;
    genreList: Genre[];
}

export default function FavouritesPage({
    contentlist,
    activeUser,
    userList,
    handleUser,
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
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
