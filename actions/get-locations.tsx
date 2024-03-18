import { InfoProps, Location } from "@/types";

interface getLocationsProps {
  page: number;
  name: string;
}

const getLocations = async ({
  page,
  name,
}: getLocationsProps): Promise<{
  results: Location[];
  info: InfoProps;
}> => {
  let URL = `https://rickandmortyapi.com/api/location?page=${page}`;

  if (name) {
    URL += `&name=${name}`;
  }

  const res = await fetch(URL);
  const data = await res.json();
  return data;
};

export default getLocations;
