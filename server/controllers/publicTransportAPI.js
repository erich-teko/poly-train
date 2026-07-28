export async function getStations(station) {
  const url = encodeURI(`http://transport.opendata.ch/v1/locations?query=${station}`);
  const request = await fetch(url);
  if (!request.ok) {
    throw new Error(`Failed to fetch stations for ${station}: ${request.status} ${request.statusText}`);
  }
  const data = await request.json();
  return data.stations;
}

export async function getConnections(startStation, endStation, travelDate, travelTime, isArrivalTime) {
  const url = encodeURI(
    `http://transport.opendata.ch/v1/connections?from=${startStation}&to=${endStation}&date=${travelDate}&time=${travelTime}&isArrivalTime=${isArrivalTime}`,
  );
  const request = await fetch(url);
  if (!request.ok) {
    throw new Error(`Failed to fetch connections from ${startStation} to ${endStation}: ${request.status} ${request.statusText}`);
  }
  const data = await request.json();
  return data.connections;
}
