import { ButtonGroup, Button, Typography, Box } from "@mui/material";
import {
    HomeOutlined,
    StarOutlineOutlined,
    InfoOutlined,
} from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";

export default function Navbar(): JSX.Element {
    return (
        <Box
            sx={{
                bgcolor: "primary.main",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography variant="h2" sx={{ padding: "1rem" }}>
                TuneKeeper - Share Your Music
            </Typography>
            <div className="nav-buttons">
                <ButtonGroup
                    variant="text"
                    aria-label="text button group"
                    sx={{ color: grey[900], alignText: "center" }}
                >
                    <Link to={"/"}>
                        <Button
                            sx={{ color: grey[900] }}
                            startIcon={
                                <HomeOutlined
                                    style={{ width: "2rem", height: "2rem" }}
                                />
                            }
                        >
                            Home
                        </Button>
                    </Link>

                    <Link to={"favourites"}>
                        <Button
                            sx={{ color: grey[900] }}
                            startIcon={
                                <StarOutlineOutlined
                                    style={{ width: "2rem", height: "2rem" }}
                                />
                            }
                        >
                            Favourites
                        </Button>
                    </Link>
                    <Link to={"about"}>
                        <Button
                            sx={{ color: grey[900] }}
                            startIcon={
                                <InfoOutlined
                                    style={{ width: "2rem", height: "2rem" }}
                                />
                            }
                        >
                            About
                        </Button>
                    </Link>
                </ButtonGroup>
            </div>
        </Box>
    );
}
