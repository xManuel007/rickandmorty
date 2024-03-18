'use client'
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { useEffect, useState } from "react";

const ButtonBack = () => {
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {

    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Button onClick={() => router.back()}>
      Go Back
    </Button>
  );
}

export default ButtonBack;
