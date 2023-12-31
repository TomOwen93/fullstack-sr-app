export interface Content {
    title: string;
    artist: string;
    userid: number;
    username: string;
    youtube_url?: string;
    spotify_url?: string;
    tags: string;
    id: number;
    genre: string[];
    created_at?: Date;
}

export interface User {
    username: string;
    id: number;
}

export interface Genre {
    id: number;
    genre: string;
}

export interface Comment {
    song_id: number;
    comment: string;
    created_at: Date;
    user_id: number;
    username: string;
}
