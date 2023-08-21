export default function YoutubeEmbed({
    embedId,
}: YoutubeEmbedPropTypes): JSX.Element {
    return (
        <div className="video-responsive">
            <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/${embedId}`}
                allowFullScreen
                title="Embedded youtube"
            />
        </div>
    );
}

interface YoutubeEmbedPropTypes {
    embedId: string;
}
