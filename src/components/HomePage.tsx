import { Container, Typography, Paper } from "@mui/material";

interface HomePageProps {}

export default function HomePage(props: HomePageProps): JSX.Element {
    return (
        <Container maxWidth="sm">
            <Paper elevation={3} />
            <Typography></Typography>{" "}
        </Container>
    );
}
