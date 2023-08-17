import { Genre } from "./interfaces";

export default function matchGenreId(
    tags: string[],
    genreList: Genre[]
): number[] {
    const matchedGenre: Genre[] = [];

    for (const tag of tags) {
        const foundGenre = genreList.find((genre) => genre.genre === tag);
        if (foundGenre !== undefined) {
            matchedGenre.push(foundGenre);
        }
    }

    const listOfMatchingIds = matchedGenre.map((genre) => genre.id);

    return listOfMatchingIds;
}
