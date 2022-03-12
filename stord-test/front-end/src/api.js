
export const generateShortenUrl = (url) => {
    return fetch(`/shorten`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({url})
    }).then((response) => response.json());
}