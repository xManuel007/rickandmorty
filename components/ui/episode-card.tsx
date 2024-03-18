import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Skeleton } from "./skeleton";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Character } from "@/types";

interface EpisodeCardProps {
  id: number
  name: string
  air_date: string
  episode: string
  characters: number
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({
  id,
  name,
  air_date,
  episode,
  characters
}) => {

  return (
    <Card className="h-[20rem] border-2 w-80 flex flex-col items-center justify-between rounded-md hover:bg-slate-100 hover:shadow-md duration-200">
      <CardHeader className="w-full">
        <CardTitle className="font-bold">{name}</CardTitle>
        <CardDescription className="flex flex-row gap-2">
          <span>{air_date} </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-full p-5 flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="font-bold">Episode: </div>
          <div>{episode}</div>
        </div>
        <div className="flex gap-2">
          <div className="font-bold">Characters: </div>
          <div>{characters}</div>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/episodes/${id}`}
          className="flex flex-row items-center justify-between gap-2 bg-black text-white border-2 rounded-md px-3 py-1">More</Link>
      </CardFooter>
    </Card>
  );
}

export default EpisodeCard;
