import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Skeleton } from "./skeleton";
import { Plus } from "lucide-react";
import Link from "next/link";

interface CharacterCardProps {
  id: number
  imageUrl: string
  name: string
  status: string
  gender: string
  species: string
  location: string
  firstEpisode: string | string[]
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  id,
  imageUrl,
  name,
  status,
  gender,
  species,
  location,
  firstEpisode
}) => {

  const handleStatus = (status: string) => {
    if (status === 'Alive') {
      return 'bg-green-500'
    } else if (status === 'Dead') {
      return 'bg-red-500'
    } else {
      return 'bg-slate-300'
    }
  }


  return (
    <Card className="min-h-[30rem] border-2 w-80 flex flex-col items-center justify-between rounded-md hover:bg-slate-100 hover:shadow-md duration-200">
      <CardHeader className="w-full">
        <div className="relative min-h-48 w-full sm:rounded-lg">
          <Skeleton className="min-h-48 w-full sm:rounded-lg" />
          <Image
            fill
            src={imageUrl}
            alt="image"
            className="object-cover  object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1024px"
            priority />
        </div>
        <CardTitle className="font-bold">{name}</CardTitle>
        <CardDescription className="flex flex-row gap-2">
          <span className="flex flex-row items-center gap-1">
            <span className={`${handleStatus(status)} w-2 h-2 rounded-full`} />
            {status} -
          </span>
          <span>{species} - </span>
          <span>{gender}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-full p-2 flex flex-col gap-2">
        <div>
          <div className="font-bold">Last known location: </div>
          <div>{location}</div>
        </div>
        <div>
          <div className="font-bold">First seen in: </div>
          <div>{firstEpisode}</div>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/characters/${id}`}
          className="flex flex-row items-center justify-between gap-2 bg-black text-white border-2 rounded-md px-3 py-1">More</Link>
      </CardFooter>
    </Card>
  );
}

export default CharacterCard;
