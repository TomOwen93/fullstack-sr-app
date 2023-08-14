import ContentCard from "./ContentCard";
import { Content } from "../utils/interfaces";
import { Container, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import SubmitForm from "./SubmitForm";

interface CategoryPageProps {
    contentlist: Content[];
}

export default function CategoryPage({
    contentlist,
}: CategoryPageProps): JSX.Element {
    const [name, setName] = useState("");
    const handleChange = (event: SelectChangeEvent) => {
        setName(event.target.value);
    };

    return (
        <>
            <SubmitForm />

            <Container>
                {contentlist.map((content, index) => (
                    <ContentCard key={index} content={content} />
                ))}
            </Container>
        </>
    );
}
