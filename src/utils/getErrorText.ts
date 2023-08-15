export default function getErrorText(errorMessage: string) {
    let message;
    switch (errorMessage) {
        case "User":
            message = "You must be logged in as a specific user!";
            break;
        case "Title/Artist":
            message = "You must enter both a title and an artist!";
            break;
        case "URL":
            message = "You must enter either a spotify URL or a YouTube URL!";
    }
    return message;
}
