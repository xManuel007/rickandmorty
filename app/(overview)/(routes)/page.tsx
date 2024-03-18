'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <div className="flex justify-center min-h-screen items-center w-full">
      <div className="flex flex-col gap-4 text-4xl text-center font-bold">
        <Button onClick={() => router.push('/characters')}>Characters</Button>
        <Button onClick={() => router.push('/locations')}>Locations</Button>
        <Button onClick={() => router.push('/episodes')}>Episodes</Button>
      </div>
    </div>
  );
}
