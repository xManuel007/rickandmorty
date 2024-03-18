'use client'
import getCharacter from "@/actions/get-character";
import { Skeleton } from "@/components/ui/skeleton";
import { Character, Episode } from "@/types";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CharacterDetails = ({
  params
}: {
  params: { characterId: string }
}) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const charId = params.characterId;

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const result = await getCharacter({ id: charId });
        setCharacter(result);

        // Fetch episode details
        let episodeDetailsPromise;

        if (typeof result.episode === 'string') {
          // Si result.episode es una string, simplemente lo añadimos al array
          episodeDetailsPromise = Promise.resolve([result.episode]);
        } else if (Array.isArray(result.episode)) {
          // Si result.episode es un array, obtenemos los nombres de los episodios
          episodeDetailsPromise = Promise.all(result.episode.map(async (episodeUrl: string) => {
            const res = await fetch(episodeUrl);
            const data = await res.json();
            return data;
          }));
        } else {
          // Si result.episode no es una string ni un array, retornamos un array vacío
          episodeDetailsPromise = Promise.resolve([]);
        }

        // Esperamos a que se resuelva la promesa antes de continuar
        const episodeDetails = await episodeDetailsPromise;

        setEpisodes(episodeDetails)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching character:", error);
      }
    };

    fetchCharacter();
  }, [charId]);

  const handleStatus = (status: string) => {
    if (status === 'Alive') {
      return 'bg-green-500'
    } else if (status === 'Dead') {
      return 'bg-red-500'
    } else {
      return 'bg-slate-300'
    }
  };

  const extractIdFromUrl = (url: string): string => {
    // Supongamos que la URL es algo como 'https://example.com/locations/123'
    const parts = url.split('/'); // Dividimos la URL por las '/'
    return parts[parts.length - 1]; // Tomamos el último segmento de la URL como el ID
  }


  return (
    <div>
      {character ? (
        <div className="min-h-screen w-screen flex pt-16 flex-col items-center">
          <div>
            {isLoading ? (
              <Skeleton className="w-[350px] h-[350px]" />
            ) : (

              <Image
                width={350}
                height={350}
                priority
                alt={character.name}
                src={character.image}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1024px"
              />
            )}
          </div>
          <div>
            <h2 className="font-bold text-2xl">{character.name}</h2>
            <div className="flex flex-row gap-2">
              <p className="flex flex-row items-center gap-1">
                <span className={`${handleStatus(character.status)} w-2 h-2 rounded-full`} />
                {character.status} -
              </p>
              <p>{character.species} -</p>
              <p>{character.gender}</p>
            </div>
            <p>{character.type}</p>
            <div>
              <span className="font-bold">Origin: </span>
              <Link
                className="hover:text-slate-500 duration-200 flex flex-row gap-1 items-center"
                href={`/locations/${extractIdFromUrl(character.origin.url)}`}
              >
                {character.origin.name}
                <ExternalLink size={15} />
              </Link>
            </div>
            <div>
              <span className="font-bold">Last seen known: </span>
              <Link
                href={`/locations/${extractIdFromUrl(character.location.url)}`}
                className="hover:text-slate-500 duration-200 flex flex-row gap-1 items-center"
              >
                {character.location.name}
                <ExternalLink size={15} />

              </Link>
            </div>
            <div>
              <p><span className="font-bold">Episodes: </span></p>
              <div className="flex flex-col gap-2">
                {episodes.map((episode, index) => (
                  <Link
                    href={`/episodes/${episode.id}`}
                    className="hover:text-slate-500 duration-200 flex flex-row gap-1 items-center"
                    key={index}
                  >- {episode.name}
                    <ExternalLink size={15} />
                  </Link>
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
          {character !== null ? (
            <p className="text-center font-bold text-2xl">Loading</p>
          ) : (
            <p className="text-center font-bold text-2xl">Character not available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CharacterDetails;
