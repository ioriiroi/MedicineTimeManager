"use client";

import { useEffect, useState } from "react";
import client from "../lib/client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Medicine } from "../lib/interface";

const TimeDiff = dynamic(() => import("./timer"), {
	ssr: false,
});

const Medicines = () => {
	const [medicines, setMedicines] = useState<Medicine[]>([]);

	const router = useRouter();

	// APIからデータを取得
	const getMedicines = async () => {
		try {
			const response = await client.get("medicines");
			// リクエスト成功時
			if (response.status === 200) {
				// データをリストに格納
				setMedicines(response.data);
			} else {
				console.log("Error fetching medicines");
			}
		} catch (error) {
			console.log(error);
		}
	};

	// タスクの削除
	const destroyMedicines = async (id: number) => {
		try {
			const response = await client.delete("medicines/" + id);
			// リクエスト成功時
			if (response.status === 200) {
				alert("削除しました");
				setMedicines((prev) => prev.filter((medicine) => medicine.id !== id));
			} else {
				console.log("Error deleting medicines");
			}
		} catch (error) {
			console.log(error);
		}
		//useState管理だと効かない
		//router.refresh();
	};

	useEffect(() => {
		getMedicines();
	}, []);

	return (
		<div>
			<h1>Medicines</h1>
			<button onClick={() => router.push("/medicines/new")}>新規作成</button>
			<ul>
				{medicines.map((medicine) => (
					<li key={medicine.id}>
						<h2>{medicine.name}</h2>
						<p>
							Time:{" "}
							{`${medicine.hour.toString().padStart(2, "0")}:${medicine.minute
								.toString()
								.padStart(2, "0")}:${medicine.second.toString().padStart(2, "0")}`}
						</p>
						<p>Memo: {medicine.memo}</p>
						<p>Created at: {medicine.created_at}</p>
						<p>Updated at: {medicine.updated_at}</p>
						<p>
							残り:{" "}
							<TimeDiff
								hour={medicine.hour}
								minute={medicine.minute}
								second={medicine.second}
								update_at={medicine.updated_at}
							/>
						</p>
						<button onClick={() => destroyMedicines(medicine.id)}>削除</button>
						<button onClick={() => router.push("/medicines/edit/" + medicine.id)}>
							編集
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Medicines;
