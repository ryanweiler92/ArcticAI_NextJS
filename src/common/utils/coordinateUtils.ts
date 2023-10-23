import { transform } from 'ol/proj';

export const transformCoordinatesPair = (
  startCoordinates: [number, number],
  endCoordinates: [number, number],
  currentFormat: string,
  desiredFormat: string
) => {
  const startCoords = transform(startCoordinates, currentFormat, desiredFormat);
  const endCoords = transform(endCoordinates, currentFormat, desiredFormat);

  const packagedCoords = { startCoords, endCoords };

  return packagedCoords;
};
