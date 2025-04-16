"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Timer = dynamic(() => import("./timer"), {
	ssr: false,
});

type Medicine = {
  id: number;
  name: string;
  hour: Int16Array;
  minute: Int16Array;
  second: Int16Array;
  memo: string;
  created_at: string;
  updated_at: string;
  url: string;
};

const Medicines = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  let num:number = 0;

  useEffect(() => {
    fetch("http://localhost:3000/api/medicines")
        .then((response) => response.json())
        .then((medicines) => setMedicines(medicines))
        .catch((error) => console.error("Error fetching medicines:", error));
    }, []);

  console.log(medicines);

  return (
  <div>
      <h1>Medicines</h1>
      <ul>
      {medicines.map((medicine) => (
          <li key={medicine.id}>
            <h2>{medicine.name}</h2>
            <p>Time: {`${medicine.hour}:${medicine.minute}:${medicine.second}`}</p>
            <p>Memo: {medicine.memo}</p>
            <p>Created at: {medicine.created_at}</p>
            <p>Updated at: {medicine.updated_at}</p>
          </li>
      ))}
      </ul>
      <Timer num={0} />
  </div>
  );
};

export default Medicines;