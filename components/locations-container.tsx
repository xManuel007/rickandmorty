'use client'
import React, { useEffect, useState } from "react";
import { Location } from "@/types";
import SearchBar from "@/components/ui/searchbar";
import Pagination from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import getLocations from "@/actions/get-locations";
import LocationCard from "./ui/location-card";

const LocationsContainer = () => {
  const [episodes, setEpisodes] = useState<Location[]>([]);
  const [numberPages, setNumberPages] = useState<number>(0);
  const [totalEpisodes, setTotalEpisodes] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [name, setName] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationsData = await getLocations({
          page: currentPage,
          name: name,
        });

        if (locationsData.results.length === 0) {
          // No se encontraron personajes, puedes manejar esto de la forma que prefieras
          console.log("No se encontraron personajes.");
          return;
        }


        setEpisodes(locationsData.results)
        setNumberPages(locationsData.info.pages);
        setTotalEpisodes(locationsData.info.count)
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchData();
  }, [currentPage, name]);

  return (
    <div className="flex flex-col gap-4 pt-10 w-5/6 justify-center">
      <SearchBar
        value={name}
        placeholder="Earth"
        onChange={(e) => {
          setName(e.target.value)
        }}
      />
      <div className="font-light">Total results: <span className="font-bold"> {totalEpisodes}</span> </div>
      <div className="font-thin"><span className="font-bold">Note: </span>This API only show 20 episodes per page</div>
      <Separator />
      {episodes && episodes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[50vh] w-full items-center p-3">
          {episodes.map((item, index) => (
            <LocationCard
              id={item.id}
              key={item.id}
              name={item.name}
              type={item.type}
              dimesion={item.dimension}
              residents={item.residents.length}
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
          <p className="text-center">No Episodes founded</p>
        </div>
      )}
      <Pagination currentPage={currentPage} totalPages={numberPages} onPageChange={setCurrentPage} />
    </div>
  );
}

export default LocationsContainer;
