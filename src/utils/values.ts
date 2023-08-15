const genres = [
    "Acoustic",
    "Alternative",
    "Ambient",
    "Blues",
    "Classical",
    "Country",
    "Electronic",
    "Folk",
    "Funk",
    "Hip-Hop",
    "Indie",
    "Jazz",
    "Metal",
    "Pop",
    "Punk",
    "R&B",
    "Reggae",
    "Rock",
    "Soul",
    "Techno",
    "Trance",
    "World",
];

function mapValues(arr: string[]): string[] {
    const mappedArr = arr.map((element) => `(${element})`);

    return mappedArr;
}

console.log(mapValues(genres));
