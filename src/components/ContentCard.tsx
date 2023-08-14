import { Button, Card, CardContent, Divider, Typography } from "@mui/material";
import YoutubeEmbed from "./YoutubeEmbed";
import { Content } from "../utils/interfaces";
import { StarOutlineOutlined } from "@mui/icons-material";
import matchYouTubeURL from "../utils/matchYouTubeURL";

interface ContentCardProps {
    content: Content;
}

export default function ContentCard({
    content,
}: ContentCardProps): JSX.Element {
    if (content.youtube_url !== undefined) {
        console.log(matchYouTubeURL(content.youtube_url));
    }
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
                    {content.youtube_url !== undefined && (
                        <YoutubeEmbed
                            embedId={matchYouTubeURL(content.youtube_url)}
                        />
                    )}
                    <Typography gutterBottom variant="h4">
                        {content.title}
                    </Typography>
                    <Divider />
                    <Typography variant="body1">{content.summary}</Typography>
                    <Typography variant="subtitle2">
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
