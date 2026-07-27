export async function getStations(station) {
  const url = encodeURI(
    `http://transport.opendata.ch/v1/locations?query=${station}`,
  );
  const request = await fetch(url);
  if (!request.ok){return};
  const data = await request.json();
  return data.stations;
}
