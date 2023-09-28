"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);
        console.log(data)
      })

  }, [])


  return (
    <div>
      {message}
    </div>
  );
}
