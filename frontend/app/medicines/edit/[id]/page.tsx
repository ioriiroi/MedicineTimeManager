"use client";

import { Medicine } from "../../../lib/interface";
import { set, useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import client from "../../../lib/client";
import header from "../../../lib/header";

const EditTask = () => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<Medicine>({ mode: "onChange" });

	const router = useRouter();
	const params = useParams();

	const [medicine, setMedicines] = useState<Medicine>();

	const getPostId = async () => {
		try {
			const response = await client.get("medicines/" + params.id);
			if (response.status == 200) {
				setMedicines(response.data);
				setValue("name", response.data.name);
				setValue("hour", response.data.hour);
				setValue("minute", response.data.minute);
				setValue("second", response.data.second);
				setValue("memo", response.data.memo);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getPostId();
	}, []);

	// ボタンを押した時にAPIにPUTリクエストを送信
	const onSubmit = async (data: Medicine) => {
		try {
			const response = await client.put("medicines/" + params.id, data, { headers: header });
			if (response.status === 200) {
				alert("編集しました");
				router.push("/medicines"); // 作成後にリダイレクト
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h1>編集</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="name">名前</label>
					<input type="text" id="name" {...register("name", { required: true })} />
					{errors.name && <span>名前は必須です</span>}
				</div>
				<div>
					<label htmlFor="hour">時間</label>
					<input
						type="number"
						id="hour"
						{...register("hour", { required: true, min: 0, max: 23 })}
					/>
				</div>
				<div>
					<label htmlFor="minute">分</label>
					<input
						type="number"
						id="minute"
						{...register("minute", { required: true, min: 0, max: 59 })}
					/>
				</div>
				<div>
					<label htmlFor="second">分</label>
					<input
						type="number"
						id="second"
						{...register("second", { required: true, min: 0, max: 59 })}
					/>
				</div>
				<div>
					<label htmlFor="memo">メモ</label>
					<input type="string" id="memo" {...register("memo", { required: false })} />
				</div>
				<div>
					<button type="submit">編集</button>
				</div>
			</form>
		</div>
	);
};

export default EditTask;
