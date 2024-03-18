'use client'
import React, { useEffect, useState } from "react";
import getCharacters from "@/actions/get-characters";
import { Character } from "@/types";
import CharacterCard from "@/components/ui/character-card";
import SearchBar from "@/components/ui/searchbar";
import Pagination from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import Filters from "@/components/ui/filters";
import Image from "next/image";

const CharactersContainer = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [numberPages, setNumberPages] = useState<number>(0);
  const [totalCharacters, setTotalCharacters] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [name, setName] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterGender, setFilterGender] = useState<string>('');
  const [episodeNames, setEpisodeNames] = useState<string[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const charactersData = await getCharacters({
          page: currentPage,
          name: name,
          filterStatus: filterStatus,
          filterGender: filterGender
        });

        if (charactersData.results.length === 0) {
          // No se encontraron personajes, puedes manejar esto de la forma que prefieras
          console.log("No se encontraron personajes.");
          return;
        }

        const episodeDetails = await Promise.all(
          charactersData.results.map(async (character) => {
            const firstEpisodeUrl = character.episode[0]; // Obtener solo el primer episodio
            const res = await fetch(firstEpisodeUrl);
            const data = await res.json();
            return data.name;
          })
        );

        setEpisodeNames(episodeDetails);

        setCharacters(charactersData.results);
        setNumberPages(charactersData.info.pages);
        setTotalCharacters(charactersData.info.count)
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchData();
  }, [currentPage, name, filterStatus, filterGender]);

  // Opciones de filtro
  const filterStatusOptions = ["Alive", "Dead", "Unknown"];
  const filterGenderOptions = ["Female", "Male", "Genderless", "Unknown"];

  return (
    <div className="flex flex-col gap-4 pt-10 w-5/6 justify-center">
      <SearchBar
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
        placeholder="Rick Sanchez"
      />
      <div className="font-light">Total results: <span className="font-bold"> {totalCharacters}</span> </div>
      <div className="font-thin"><span className="font-bold">Note: </span>This API only show 20 character per page</div>
      <Filters
        filter={filterStatus}
        options={filterStatusOptions}
        onChange={(newFilter) => setFilterStatus(newFilter)}
      />
      <Filters
        filter={filterGender}
        options={filterGenderOptions}
        onChange={(newFilter) => setFilterGender(newFilter)}
      />
      <Separator />
      {characters && characters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[50vh] w-full items-center p-3">
          {characters.map((item, index) => (
            <CharacterCard
              id={item.id}
              key={item.id}
              imageUrl={item.image}
              name={item.name}
              status={item.status}
              gender={item.gender}
              species={item.species}
              location={item.location.name}
              firstEpisode={episodeNames[index]}
            />
          ))}
        </div>
      ) : (
        <div className="min-h-[50vh] flex flex-col justify-center items-center">
          <Image
            width={200}
            height={200}
            priority
            alt="Dancing Rick"
            src='https://media1.tenor.com/m/EX79Pf9E018AAAAC/rick-and-morty-rick-sanchez.gif'
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1024px"
          />
          <p className="text-center">No characters founded</p>
        </div>
      )}
      <Pagination currentPage={currentPage} totalPages={numberPages} onPageChange={setCurrentPage} />
    </div>
  );
}

export default CharactersContainer;
