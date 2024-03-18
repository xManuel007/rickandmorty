import { Location } from "@/types";

interface getLocationProps {
  id: string
}

const getLocation = async ({
  id
}: getLocationProps): Promise<Location> => {
  let URL = `https://rickandmortyapi.com/api/location/${id}`;

  const res = await fetch(URL);
  const data = await res.json();
  return data;
};

export default getLocation;
