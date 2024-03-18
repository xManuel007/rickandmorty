import { Character, FiltersType, InfoProps } from "@/types";

interface getCharacterProps {
  id: string
}

const getCharacter = async ({
  id
}: getCharacterProps): Promise<Character> => {
  let URL = `https://rickandmortyapi.com/api/character/${id}`;

  const res = await fetch(URL);
  const data = await res.json();
  return data;
};

export default getCharacter;
