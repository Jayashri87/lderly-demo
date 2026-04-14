const ORS_API_KEY = "YOUR_ORS_API_KEY";

export async function getRoute(start: [number, number], end: [number, number]) {
  const response = await fetch(
    "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
    {
      method: "POST",
      headers: {
        Authorization: ORS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coordinates: [
          [start[1], start[0]],
          [end[1], end[0]],
        ],
      }),
    }
  );

  const data = await response.json();

  const coordinates =
    data.features?.[0]?.geometry?.coordinates?.map(
      ([lng, lat]: [number, number]) => [lat, lng]
    ) || [];

  const summary = data.features?.[0]?.properties?.summary;

  return {
    coordinates,
    distanceKm: summary ? (summary.distance / 1000).toFixed(1) : "0",
    etaMin: summary ? Math.ceil(summary.duration / 60) : 0,
  };
}