import { ButtonGroup, Button, Typography } from "@mui/material";
import {
    CategoryOutlined,
    HomeOutlined,
    StarOutlineOutlined,
    InfoOutlined,
} from "@mui/icons-material";

interface NavbarProps {}

export default function Navbar(props: NavbarProps): JSX.Element {
    return (
        <div className="title-bar">
            <Typography variant="h2">The Academy Library</Typography>
            <div className="nav-buttons">
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button
                        startIcon={
                            <HomeOutlined
                                style={{ width: "2rem", height: "2rem" }}
                            />
                        }
                    >
                        Home
                    </Button>

                    <Button
                        startIcon={
                            <CategoryOutlined
                                style={{ width: "2rem", height: "2rem" }}
                            />
                        }
                    >
                        Categories
                    </Button>
                    <Button
                        startIcon={
                            <StarOutlineOutlined
                                style={{ width: "2rem", height: "2rem" }}
                            />
                        }
                    >
                        Favourites
                    </Button>
                    <Button
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
        </div>
    );
}
