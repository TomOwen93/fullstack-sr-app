import { ButtonGroup, Button, Typography, Box } from "@mui/material";
import {
    CategoryOutlined,
    HomeOutlined,
    StarOutlineOutlined,
    InfoOutlined,
} from "@mui/icons-material";
import { grey } from "@mui/material/colors";

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

                    <Button
                        sx={{ color: grey[900] }}
                        startIcon={
                            <CategoryOutlined
                                style={{ width: "2rem", height: "2rem" }}
                            />
                        }
                    >
                        Categories
                    </Button>
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
                </ButtonGroup>
            </div>
        </Box>
    );
}
