import {
    Button,
    Card,
    Container,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

type FormValues = {
    name: string;
    title: string;
    summary: string;
    youtube_url: string;
    article_url: string;
};

export default function SubmitForm() {
    const form = useForm<FormValues>({
        defaultValues: {
            name: "",
            title: "",
            summary: "",
            youtube_url: "",
            article_url: "",
        },
    });

    const { register, handleSubmit } = form;
    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

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
                                label="Summary"
                                variant="filled"
                                {...register("summary")}
                            />
                            <TextField
                                id="outlined-basic"
                                label="YouTube URL"
                                variant="filled"
                                {...register("youtube_url")}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Article URL"
                                variant="filled"
                                type="url"
                                {...register("article_url")}
                            />
                            {/* <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={name}
                            label="name"

                        ></Select> */}
                            <Button type="submit" variant="contained">
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </Card>
            </Container>
        </>
    );
}
