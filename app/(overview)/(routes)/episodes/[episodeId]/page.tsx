'use client'
import getEpisode from "@/actions/get-episode";
import CharacterCard from "@/components/ui/character-card";
import { Character, Episode } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const EpisodeDetails = ({
  params
}: {
  params: { episodeId: string }
}) => {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const episodeId = params.episodeId;
  const [characters, setCharacters] = useState<Character[]>([])

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const episodeData = await getEpisode({ id: episodeId });
        setEpisode(episodeData);

        // Fetch episode details
        let charactersDetailsPromise;

        if (typeof episodeData.characters === 'string') {
          // Si result.episode es una string, simplemente lo añadimos al array
          charactersDetailsPromise = Promise.resolve([episodeData.characters]);
        } else if (Array.isArray(episodeData.characters)) {
          // Si result.episode es un array, obtenemos los nombres de los episodios
          charactersDetailsPromise = Promise.all(episodeData.characters.map(async (characterUrl: string) => {
            const characterResponse = await fetch(characterUrl);
            const characterData = await characterResponse.json();
            return characterData;
          }));
        } else {
          // Si result.episode no es una string ni un array, retornamos un array vacío
          charactersDetailsPromise = Promise.resolve([]);
        }

        // Esperamos a que se resuelva la promesa antes de continuar
        const characterDetails = await charactersDetailsPromise;

        const episodeDetails = await Promise.all(
          characterDetails.map(async (character) => {
            const firstEpisodeUrl = character.episode[0]; // Obtener solo el primer episodio
            const res = await fetch(firstEpisodeUrl);
            const data = await res.json();
            return data.name;
          })
        );

        setCharacters(characterDetails);
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching character:", error);
      }
    };

    fetchCharacter();
  }, [episodeId]);

  return (
    <div>
      {episode ? (
        <div className="min-h-screen w-screen flex pt-16 flex-col p-8">
          <div>
            <h2 className="font-bold text-2xl">{episode.name}</h2>
            <div className="flex flex-row gap-2">
              <p>{episode.air_date} -</p>
              <p>{episode.episode}</p>
            </div>
            <div>
              <p><span className="font-bold">Characters: {characters.length}</span></p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[50vh] w-full items-center p-3">

                {characters.map((character, index) => (
                  <CharacterCard
                    key={index}
                    name={character.name}
                    gender={character.gender}
                    firstEpisode={episode.name}
                    imageUrl={character.image}
                    species={character.species}
                    id={character.id}
                    status={character.status}
                    location={character.location ? character.location.name : 'unknown'}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[100vh] flex flex-col justify-center items-center">
          <Image
            width={200}
            height={200}
            priority
            alt="Dancing Rick"
            src='https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGFmMWFrenhlZ2c2YWRuYXFkbGM1cnY1cXpkanhzNmt0bTE3bXhuOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/i2tLw5ZyikSFdkeGHT/giphy.gif'
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1024px"
          />
          {location !== null ? (
            <p className="text-center font-bold text-2xl">Loading</p>
          ) : (
            <p className="text-center font-bold text-2xl">Location not available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default EpisodeDetails;
