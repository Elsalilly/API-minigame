const soundAPI = 'DIXMsu28Ab9D5XzsDH6IOFAEYxEFGYosoX1juFLb'; //my key


export const playSound = async (soundId) => { //function to fetch and play sound
    try {
        const response = await fetch(`https://freesound.org/apiv2/sounds/${soundId}/`, {
            headers: {
                Authorization: `Token ${soundAPI}`,
            },
        });

        const data = await response.json();
        const previewUrl = data?.previews?.['preview-hq-mp3']; //Safely extract the preview url

        if (previewUrl) { // if a valid url exist, create and play sound
            new Audio(previewUrl).play();
        }
        } catch (error) {
            console.error("Fetching sound error:", error);
        }
};