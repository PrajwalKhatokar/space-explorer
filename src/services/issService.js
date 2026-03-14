export const getISSLocation = async () => {
  const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
  const data = await response.json();

  return {
    iss_position: {
      latitude: data.latitude,
      longitude: data.longitude
    }
  };
};