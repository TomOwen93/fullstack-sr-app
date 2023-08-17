export interface Content {
    title: string;
    artist: string;
    userid: number;
    youtube_url?: string;
    spotify_url?: string;
    tags: string;
}

export interface User {
    username: string;
    id: number;
}

export interface Genre {
    id: number;
    genre: string;
}
