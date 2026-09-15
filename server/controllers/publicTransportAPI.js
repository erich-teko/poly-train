/**
 * Look up public transport stations matching a search term via the
 * Swiss transport.opendata.ch API.
 * @param {string} station - Station name or partial search term.
 * @returns {Promise<Array>} Matching stations.
 * @throws {Error} If the upstream API responds with a non-OK status.
 */
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

/**
 * Fetch public transport connections between two stations via the
 * Swiss transport.opendata.ch API.
 * @param {string} startStation - Departure station.
 * @param {string} endStation - Arrival station.
 * @param {string} [travelDate] - Travel date (YYYY-MM-DD); omitted if falsy.
 * @param {string} [travelTime] - Travel time (HH:MM); omitted if falsy.
 * @param {boolean} [isArrivalTime] - Treat travelTime as arrival instead of departure.
 * @returns {Promise<Array>} Matching connections.
 * @throws {Error} If the upstream API responds with a non-OK status.
 */
export async function getConnections(startStation, endStation, travelDate, travelTime, isArrivalTime) {
  const url = new URL("http://transport.opendata.ch/v1/connections");
  url.searchParams.set("from", startStation);
  url.searchParams.set("to", endStation);

  // Only append optional query params when a value was provided
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
