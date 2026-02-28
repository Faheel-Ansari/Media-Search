
export async function fetchPhotos(query, page, per_page = 30) {
    if (!query) {
        return []
    }
    const key = import.meta.env.VITE_UNSPLASH_KEY;

    const url = new URL("https://api.unsplash.com/search/photos");
    url.search = new URLSearchParams({
        query,
        page,
        per_page,
    });

    const res = await fetch(url, {
        headers: {
            Authorization: `Client-ID ${key}`,
        },
    });

    let data = await res.json();

    return data.results.map((item) => ({
        id: item.id,
        type: "photo",
        thumbnail: item.urls.small,
        src: item.urls.full,
        desc: item.alt_description,
        username: item.user.username,
        downloadUrl: item.links.download_location
    }));
}

export async function downloadPhoto(imageUrl, photoID, downloadLocation) {
    const key = import.meta.env.VITE_UNSPLASH_KEY;
    await Promise.all([
        fetch(downloadLocation, { headers: { Authorization: `Client-ID ${key}` } }),
        fetch(imageUrl).then(res => res.blob()).then(blob => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `mediasearch-${photoID}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        })
    ]);
}
export async function downloadVideo(videoUrl, videoID) {
    const key = import.meta.env.VITE_PEXELS_KEY;

    try {
        const res = await fetch(videoUrl);
        const blob = await res.blob();
        
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        link.download = `mediasearch-${videoID}.mp4`; 
        
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Video Download failed:", error);
    }
}
export async function fetchVideos(query, page, per_page = 30) {
    if (!query) {
        return []
    }

    const key = import.meta.env.VITE_PEXELS_KEY;
    const url = new URL("https://api.pexels.com/videos/search");
    url.search = new URLSearchParams({
        query,
        page,
        per_page,
    });

    const res = await fetch(url, {
        headers: {
            Authorization: key,
        },
    });

    let data = await res.json();
    return data.videos.map((item) => {
        const lowestQualityVideo = item.video_files
            .filter((v) => v.file_type === "video/mp4")
            .sort((a, b) => a.width * a.height - b.width * b.height)[0];
        const highestQualityVideo = item.video_files
            .filter((v) => v.file_type === "video/mp4")
            .sort((a, b) => b.width * b.height - a.width * a.height)[0];
        const parts = item.url.split("/video/")[1].split("-");
        parts.pop();
        const title = parts.join(" ");
        const userName = item.user.url.split('@')[1]

        return {
            id: item.id,
            type: "video",
            thumbnail: lowestQualityVideo.link,
            src: highestQualityVideo.link,
            desc: title,
            username: userName
        };
    });
}