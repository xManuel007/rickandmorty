'use client'
import getLocation from "@/actions/get-location";
import CharacterCard from "@/components/ui/character-card";
import { Character, Location } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const LocationDetails = ({
  params
}: {
  params: { locationId: string }
}) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [residents, setResidents] = useState<Character[]>([]);
  const [episode, setEpisode] = useState<string[]>([]);
  const locationId = params.locationId;

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const locationData = await getLocation({ id: locationId });
        setLocation(locationData);

        // Fetch episode details
        let residentsDetailsPromise;

        if (typeof locationData.residents === 'string') {
          // Si result.episode es una string, simplemente lo añadimos al array
          residentsDetailsPromise = Promise.resolve([locationData.residents]);
        } else if (Array.isArray(locationData.residents)) {
          // Si result.episode es un array, obtenemos los nombres de los episodios
          residentsDetailsPromise = Promise.all(locationData.residents.map(async (residentUrl: string) => {
            const residentResponse = await fetch(residentUrl);
            const residentData = await residentResponse.json();
            return residentData;
          }));
        } else {
          // Si result.episode no es una string ni un array, retornamos un array vacío
          residentsDetailsPromise = Promise.resolve([]);
        }

        // Esperamos a que se resuelva la promesa antes de continuar
        const residentDetails = await residentsDetailsPromise;

        const episodeDetails = await Promise.all(
          residentDetails.map(async (character) => {
            const firstEpisodeUrl = character.episode[0]; // Obtener solo el primer episodio
            const res = await fetch(firstEpisodeUrl);
            const data = await res.json();
            return data.name;
          })
        );

        setEpisode(episodeDetails);

        setResidents(residentDetails)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching character:", error);
      }
    };

    fetchCharacter();
  }, [locationId]);

  return (
    <div>
      {location ? (
        <div className="min-h-screen w-screen flex pt-16 flex-col p-8">
          <div>
            <h2 className="font-bold text-2xl">{location.name}</h2>
            <div className="flex flex-row gap-2">
              <p>{location.type} -</p>
              <p>{location.dimension}</p>
            </div>
            <div>
              <p><span className="font-bold">Residents: {residents.length}</span></p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[50vh] w-full items-center p-3">

                {residents.map((resident, index) => (
                  <CharacterCard
                    key={index}
                    name={resident.name}
                    gender={resident.gender}
                    firstEpisode={episode[index]}
                    imageUrl={resident.image}
                    species={resident.species}
                    id={resident.id}
                    status={resident.status}
                    location={resident.location.name}
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

export default LocationDetails;
