import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Skeleton } from "./skeleton";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Character } from "@/types";

interface LocationCardProps {
  id: number
  name: string
  type: string
  dimesion: string
  residents: number
}

const LocationCard: React.FC<LocationCardProps> = ({
  id,
  name,
  type,
  dimesion,
  residents
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
    <Card className="h-[20rem] border-2 w-80 flex flex-col items-center justify-between rounded-md hover:bg-slate-100 hover:shadow-md duration-200">
      <CardHeader className="w-full">
        <CardTitle className="font-bold">{name}</CardTitle>
        <CardDescription className="flex flex-row gap-2">
          <span>{type} </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-full p-5 flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="font-bold">Dimension: </div>
          <div>{dimesion}</div>
        </div>
        <div className="flex gap-2">
          <div className="font-bold">Residents: </div>
          <div>{residents}</div>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`locations/${id}`}
          className="flex flex-row items-center justify-between gap-2 bg-black text-white border-2 rounded-md px-3 py-1">More</Link>
      </CardFooter>
    </Card>
  );
}

export default LocationCard;
