import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Typography,
} from "@mui/material";
import YoutubeEmbed from "./YoutubeEmbed";
import { Content } from "../utils/interfaces";
import { StarOutlineOutlined } from "@mui/icons-material";

interface ContentCardProps {
    content: Content;
}
export default function ContentCard({
    content,
}: ContentCardProps): JSX.Element {
    return (
        <>
            <Card
                variant="outlined"
                sx={{
                    width: "50rem",
                    marginTop: "2rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                <CardContent>
                    <YoutubeEmbed embedId="xIIJfmDnvPE" />
                    <Typography variant="h4">{content.title}</Typography>
                    <Divider />
                    <Typography variant="body1">{content.summary}</Typography>
                    <Typography variant="body2">
                        Submitted by: {content.username}
                    </Typography>
                </CardContent>
                <Button
                    startIcon={
                        <StarOutlineOutlined
                            style={{ width: "2rem", height: "2rem" }}
                        />
                    }
                >
                    Add to Favourites
                </Button>
            </Card>
        </>
    );
}
