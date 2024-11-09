import { usersLocation } from "./mockData";

export const getLocationByIdAndPeriod = (
  id: number
  //  from: Date,
  // to: Date
): Promise<[number, number][]> => {
  return new Promise<[number, number][]>((res) => {
    setTimeout(() => {
      res(usersLocation[id]);
    }, 1500);
  });
};
