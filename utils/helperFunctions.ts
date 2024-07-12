export const convertTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}H ${remainingMinutes}M`;
};

export const getMarkers = (segments: any) => {
  const markers: { lat: any; lng: any; time: any }[] = [];
  segments.forEach((segment: any) => {
    markers.push({
      lat: segment.start_lat,
      lng: segment.start_lng,
      time: segment.create_time,
    });
  });
  return markers;
};
export const formatDistance = (miles: number | undefined): string => {
  if (miles === undefined) return "";
  return `${miles.toFixed(1) ?? 0} mi`;
};

export const formatRouteDistance = (route: any | undefined): string => {
  if (route?.length === undefined) return "";
  return formatDistance(route.length);
};
