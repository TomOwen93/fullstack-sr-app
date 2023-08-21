import {
    Avatar,
    Card,
    CardContent,
    Container,
    Divider,
    Typography,
} from "@mui/material";

export default function AboutPage(): JSX.Element {
    return (
        <>
            <Container>
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
                        <Avatar
                            alt="Tom Owen"
                            src={"/src/tom.png"}
                            sx={{
                                width: 200,
                                height: 200,
                                margin: "auto",
                            }}
                        />

                        <Typography gutterBottom variant="h4">
                            Created by: Tom Owen
                        </Typography>
                        <Divider />

                        <Typography variant="body1">
                            A personal project for consolidating my full-stack
                            understanding. <br /> Created with Material UI core
                            components, React, Express, PostgreSQL and
                            Typescript.
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}
