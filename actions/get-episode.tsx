import { Episode, InfoProps } from "@/types";

interface getEpisodesProps {
  id: string
}

const getEpisode = async ({
  id
}: getEpisodesProps): Promise<Episode> => {
  let URL = `https://rickandmortyapi.com/api/episode/${id}`;

  const res = await fetch(URL);
  const data = await res.json();
  return data;
};

export default getEpisode;
