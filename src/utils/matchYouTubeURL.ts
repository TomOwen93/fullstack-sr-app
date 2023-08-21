export default function matchYouTubeURL(url: string): string {
    const matchedEmbed = url.replace(/.*=/g, "");

    return matchedEmbed;
}
