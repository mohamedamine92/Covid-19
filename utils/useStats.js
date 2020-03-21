import { useState, useEffect } from "react";
const nf = Intl.NumberFormat();

export function useStats(url) {
    const [stats, setStats] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError();
            try {
                const res = await fetch(url);
                const data = await res.json();
                if (res.status === 404 && data.error) {
                    setError(data.error.message);
                }
                setStats(data);
                setLoading(false);
            } catch (err) {
                console.log(`Fetch error : ${err}`);
                setError(err);
            }
        }
        fetchData();
    }, [url]);

    return {
        stats,
        loading,
        error
    };
}



export const formatDate = (dateString) => {
    const dt = new Date(dateString);
    return `${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt
    .getDate()
    .toString()
    .padStart(2, '0')}/${dt
    .getFullYear()
    .toString()
    .padStart(4, '0')} ${dt
    .getHours()
    .toString()
    .padStart(2, '0')}:${dt
    .getMinutes()
    .toString()
    .padStart(2, '0')}:${dt
    .getSeconds()
    .toString()
    .padStart(2, '0')}`;
};

export const formatNumber = (num) => {
    return nf.format(num)
}