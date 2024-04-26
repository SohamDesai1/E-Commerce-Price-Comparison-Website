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
    const [array_a, setArray_a] = useState([])
    const [array_f, setArray_f] = useState([])

    const getFavorites = async () => {
        try {
            const response = await axios.get("/api/favourites");
            if (response.data) {
                console.log(response.data.favouriteProducts[0])
                setArray_a(response.data.favouriteProducts[0]["a_price_change"])
                setArray_f(response.data.favouriteProducts[0]["f_price_change"])
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
                text: 'Price Line Chart',
            },
        }
    };
    const labels = ['July','August','August', 'September', 'October','October', 'November', 'December', 'January', 'Febuary', 'March',"April"];

    const data_a = {
        labels,
        datasets: [
            {
                label: 'Iphone 15',
                data: array_a,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const data_f = {
        labels,
        datasets: [
            {
                label: 'Iphone 15',
                data: array_f,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <div className="bg-gradient-to-r from-[#010003] via-[#221C4C] to-[#002D2B] max-md:px-5 ">
            <div className="text-6xl text-white font-customfont"> Amazon</div>
            <div className="w-[1100px] h-screen flex mx-auto my-auto">
                <div className='w-full pt-0 my-auto bg-white border border-gray-400 shadow-xl rounded-xl h-fit'>
                    <Line options={options} data={data_a} />
                </div>
            </div>
            <div className="text-6xl text-white font-customfont"> Flipkart</div>
            <div className="w-[1100px] h-screen flex mx-auto my-auto">
                <div className='w-full pt-0 my-auto bg-white border border-gray-400 shadow-xl rounded-xl h-fit'>
                    <Line options={options} data={data_f} />
                </div>
            </div>
        </div>
    );
};
export default MyChart;