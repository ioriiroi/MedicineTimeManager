import { useEffect, useState } from "react";

const useTime = () => {
    const [time, setTime] = useState(new Date());
    const getTime = () => {
        setTime(new Date());
    };
    useEffect(() => {
        const intervalId = setInterval(getTime, 1000);
        return () => clearInterval(intervalId);
    }, []);
    return time;
};

export default function Timer({num}: {num: number}) {
    const time = useTime();
    return <div>{time.toLocaleTimeString()}</div>;
}