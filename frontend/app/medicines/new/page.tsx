"use client";

import { Medicine } from "../../lib/interface";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import client from "../../lib/client";
import header from "../../lib/header";

const MakeNewTask = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Medicine>({mode: "onChange"});

    const router = useRouter();
    
    // ボタンを押した時にAPIにPOSTリクエストを送信
    const onSubmit = async (data: Medicine) => {
        try {
            const response = await client.post("medicines", data, {headers: header});
            if (response.status === 201) {
                alert("作成しました");
                router.push("/medicines");
            }
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