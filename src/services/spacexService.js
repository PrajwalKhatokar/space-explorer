export const getLatestLaunch = async () => {
  const response = await fetch("https://api.spacexdata.com/v5/launches/latest");
  const data = await response.json();
  return data;
};