export const getAstronauts = async () => {
  try {
    const res = await fetch("http://api.open-notify.org/astros.json");
    const data = await res.json();

    // return full response
    return data;

  } catch (error) {
    console.error("Astronaut API error:", error);
    return { people: [] };
  }
};