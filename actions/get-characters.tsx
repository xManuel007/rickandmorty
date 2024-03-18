import { Character, FiltersType, InfoProps } from "@/types";

interface getCharactersProps {
  page: number;
  name: string;
  filterStatus: string;
  filterGender: string;
}

const getCharacters = async ({
  page,
  name,
  filterStatus,
  filterGender
}: getCharactersProps): Promise<{
  results: Character[];
  info: InfoProps;
}> => {
  let URL = `https://rickandmortyapi.com/api/character?page=${page}`;

  if (name) {
    URL += `&name=${name}`;
  }

  if (filterStatus) {
    URL += `&status=${filterStatus}`;
  }

  if (filterGender) {
    URL += `&gender=${filterGender}`;
  }

  const res = await fetch(URL);
  const data = await res.json();
  return data;
};

export default getCharacters;
