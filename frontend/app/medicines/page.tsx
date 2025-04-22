"use client";

import { useEffect, useState } from "react";
import client from "../lib/client";
import dynamic from "next/dynamic";
import { Medicine } from "../lib/interface";

const TimeDiff = dynamic(() => import("./timer"), {
	ssr: false,
});

const Medicines = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  // APIからデータを取得
  const getMedicines = async () => {
    try {
      const response = await client.get("medicines");
      // リクエスト成功時
      if (response.status === 200) {
        setMedicines(response.data);
      } else {
        console.log("Error fetching medicines");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMedicines();
  }, []);

  return (
  <div>
      <h1>Medicines</h1>
      <ul>
      {medicines.map((medicine) => (
          <li key={medicine.id}>
            <h2>{medicine.name}</h2>
            <p>Time: {`${medicine.hour.toString().padStart(2, "0")}:${medicine.minute.toString().padStart(2, "0")}:${medicine.second.toString().padStart(2, "0")}`}</p>
            <p>Memo: {medicine.memo}</p>
            <p>Created at: {medicine.created_at}</p>
            <p>Updated at: {medicine.updated_at}</p>
            <p>残り: <TimeDiff hour={medicine.hour} minute={medicine.minute} second={medicine.second} update_at={medicine.updated_at}/></p>
          </li>
      ))}
      </ul>
  </div>
  );
};

export default Medicines;