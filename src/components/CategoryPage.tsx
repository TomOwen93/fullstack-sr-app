import { Paper } from "@mui/material";
import ContentCard from "./ContentCard";
import { Content } from "../utils/interfaces";

interface CategoryPageProps {
    contentlist: Content[];
}

export default function CategoryPage({
    contentlist,
}: CategoryPageProps): JSX.Element {
    return (
        <>
            <div className="content-grid">
                {contentlist.map((content, index) => (
                    <ContentCard key={index} content={content} />
                ))}
            </div>
        </>
    );
}
