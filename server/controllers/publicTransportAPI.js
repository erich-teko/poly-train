export async function getStations(station) {
  const url = new URL("http://transport.opendata.ch/v1/locations");
  url.searchParams.set("query", station);
  const request = await fetch(url);
  if (!request.ok) {
    throw new Error(`Failed to fetch stations for ${station}: ${request.status} ${request.statusText}`);
  }
  const data = await request.json();
  return data.stations;
}

export async function getConnections(startStation, endStation, travelDate, travelTime, isArrivalTime) {
  const url = new URL("http://transport.opendata.ch/v1/connections");
  url.searchParams.set("from", startStation);
  url.searchParams.set("to", endStation);

  if (travelDate) {
    url.searchParams.set("date", travelDate);
  }
  if (travelTime) {
    url.searchParams.set("time", travelTime);
  }
  if (typeof isArrivalTime !== "undefined") {
    url.searchParams.set("isArrivalTime", String(isArrivalTime));
  }

  const request = await fetch(url);
  if (!request.ok) {
    throw new Error(`Failed to fetch connections from ${startStation} to ${endStation}: ${request.status} ${request.statusText}`);
  }
  const data = await request.json();
  return data.connections;
}
