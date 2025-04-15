import { useEffect, useState } from "react";
import Link from "next/link";

interface Medicine {
    id: number;
    name: string;
    hour: BigInteger;
    minute: BigInteger;
    second: BigInteger;
    memo: string;
    created_at: string;
    updated_at: string;
}

const MedicinesPage = () => {
    const [medicines, setMedicines] = useState<Medicine[]>([]);

    useEffect(() => {
        const fetchMedicines = async () => {
            const response = await fetch("http://localhost:8000/api/medicines");
            const data = await response.json();
            setMedicines(data);
        };
        fetchMedicines();
    }, []);

    return (
        <div>
            <h1>Medicines</h1>
            <Link href="/medicines/new">Add New Medicine</Link>
            <ul>
                {medicines.map((medicine) => (
                    <li key={medicine.id}>
                        <Link href={`/medicines/${medicine.id}`}>
                            {medicine.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}