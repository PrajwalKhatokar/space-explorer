export const getNasaImage = async () => {
  try {

    const API_KEY = process.env.REACT_APP_NASA_API_KEY;

    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&thumbs=true`
    );

    const data = await response.json();

    return data;

  } catch (error) {
    console.error("NASA API error:", error);
    return null;
  }
};