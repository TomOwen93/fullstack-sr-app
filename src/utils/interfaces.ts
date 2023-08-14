export interface Content {
    title: string;
    artist: string;
    username: string;
    youtube_url?: string;
    spotify_url?: string;
    tags: string;
}

export interface User {
    username: string;
    id: number;
}
