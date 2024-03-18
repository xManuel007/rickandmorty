import { Episode, InfoProps } from "@/types";

interface getEpisodesProps {
  page: number;
  name: string;
}

const getEpisodes = async ({
  page,
  name,
}: getEpisodesProps): Promise<{
  results: Episode[];
  info: InfoProps;
}> => {
  let URL = `https://rickandmortyapi.com/api/episode?page=${page}`;

  if (name) {
    URL += `&name=${name}`;
  }
  const res = await fetch(URL);
  const data = await res.json();
  return data;
};

export default getEpisodes;
