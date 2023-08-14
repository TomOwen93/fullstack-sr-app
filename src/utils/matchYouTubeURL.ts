export default function matchYouTubeURL(url: string): string {
    let matchedEmbed = url.replace(/.*=/g, "");

    return matchedEmbed;
}
