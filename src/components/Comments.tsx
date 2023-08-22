import { ExpandMoreOutlined } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { baseUrl } from "../utils/baseurl";
import axios from "axios";
import { User, Comment } from "../utils/interfaces";
import moment from "moment";

interface CommentsProps {
    activeUser?: User;
    songid: number;
    songsComments?: Comment[];
    fetchComments: () => void;
}

export default function Comments({
    activeUser,
    songid,
    songsComments,
    fetchComments,
}: CommentsProps): JSX.Element {
    const form = useForm({
        defaultValues: {
            commentText: "",
        },
    });

    const { register, handleSubmit, reset } = form;

    const onSubmit = async (data: { commentText: string }) => {
        if (activeUser !== undefined) {
            const formattedData = {
                ...data,
                userid: activeUser !== undefined ? activeUser.id : 0,
                song_id: songid,
            };

            await axios.post(`${baseUrl}/comments/`, formattedData);
        }
        fetchComments();
        reset();
    };

    return (
        <>
            <Accordion>
                <AccordionSummary
                    sx={{ justifyContent: "center" }}
                    expandIcon={<ExpandMoreOutlined />}
                >
                    <Typography align="center" sx={{ width: "100%" }}>
                        Load Comments
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {songsComments?.map((comment, index) => (
                        <div key={index}>
                            <Divider />
                            <Stack>
                                <Typography variant="body1">
                                    {comment.comment}
                                </Typography>
                                <Typography variant="subtitle2">
                                    {comment.username} -{" "}
                                    {moment(comment.created_at).format(
                                        "DD/MM/YYYY h:MMA"
                                    )}
                                </Typography>
                            </Stack>
                            <Divider />
                        </div>
                    ))}
                    <Typography align="center" sx={{ width: "100%" }}>
                        Enter Comment:
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <TextField
                            id="outlined-basic"
                            label="Comment"
                            variant="filled"
                            {...register("commentText")}
                        />
                    </form>
                </AccordionDetails>
            </Accordion>
        </>
    );
}
