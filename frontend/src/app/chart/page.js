"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
);
const MyChart = () => {
    const [array, setArray] = useState([])

    const getFavorites = async () => {
        try {
            const response = await axios.get("/api/favourites");
            if (response.data) {
                console.log(response.data.favouriteProducts[0])
                setArray(response.data.favouriteProducts[0]["a_price_change"])
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getFavorites();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        }
    };
    const labels = ['November', 'December', 'January', 'Febuary', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Iphone 15',
                data: array,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <div>
            <div className="w-[1100px] h-screen flex mx-auto my-auto">
                <div className='w-full pt-0 my-auto border border-gray-400 shadow-xl rounded-xl h-fit'>

                    <Line options={options} data={data} />
                </div>
            </div>
        </div>
    );
};
export default MyChart;