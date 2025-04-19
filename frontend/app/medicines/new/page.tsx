"use client";

import { Medicine } from "../../lib/interface";
import { useForm } from "react-hook-form";
import client from "../../lib/client";

const MakeNewTask = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Medicine>({mode: "onChange"});

    const header = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }

    // ボタンを押した時にAPIにPOSTリクエストを送信
    const onSubmit = async (data: Medicine) => {
        try {
            const response = await client.post("medicines", data, {headers: header});
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <div>
            <h1>作成</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">名前</label>
                    <input
                        type="text"
                        id="name"
                        {...register("name", { required: true })}
                    />
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
                    <input
                        type="string"
                        id="memo"
                        {...register("memo", { required: true })}
                    />
                </div>
                <div>
                    <button type="submit">作成</button>
                </div>
            </form>
            
        </div>
    )
}

export default MakeNewTask;