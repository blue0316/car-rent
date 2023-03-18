import { useEffect, useState } from 'react';
import axios from 'axios';

// import { server } from "./_app";
import Car from '@/components/Car';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/cars").then(res => {
      setData(res.data);
    })
  }, [])

  return (
    <main className="main p-3">
      {
        data.length > 0 && data.map((item, index) =>
          <Car key={`car-${index}`} car={item} className="mb-3" />
        )}
    </main>
  )
}
