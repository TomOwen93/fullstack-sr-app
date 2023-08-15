import ContentCard from "./ContentCard";
import { Content, Genre, User } from "../utils/interfaces";
import {
    Container,
    FormControl,
    FormHelperText,
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
}

export default function ContentPage({
    contentlist,
    handleUser,
    userList,
    activeUser,
    genreList,
}: ContentPageProps): JSX.Element {
    console.log(activeUser);
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
            <Container>
                <SubmitForm activeUser={activeUser} genreList={genreList} />
                {contentlist.map((content, index) => (
                    <ContentCard key={index} content={content} />
                ))}
            </Container>
        </>
    );
}
