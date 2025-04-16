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

function secToTime(second: number) {
    const changeHour = (Math.floor(second / 3600)).toString().padStart(2, "0");
    const changeMinute = (Math.floor((second / 60) % 60)).toString().padStart(2, "0");
    const changeSec = (Math.floor(second) % 60).toString().padStart(2, "0");

    if (second > 0) {
        return `${changeHour}:${changeMinute}:${changeSec}`;
    } else {
        return "00:00:00";
    }
}

export default function TimeDiff({hour, minute, second, update_at}: {hour: number, minute: number, second: number, update_at: string}) {
    const now = useTime();
    const updateTime = new Date(update_at);
    updateTime.setHours(updateTime.getHours() + hour);
    updateTime.setMinutes(updateTime.getMinutes() + minute);
    updateTime.setSeconds(updateTime.getSeconds() + second);
    const timeDiff = (updateTime.getTime() - now.getTime()) / 1000;

    return secToTime(timeDiff);
}