import { useEffect, useState } from "react";
// import { Line } from 'react-chartjs-2';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import 'chart.js/auto';

function DashboardDetail() {

    const [gh_data, setGhData] = useState([]);

    useEffect(() => {
        axios.get(`http://40.82.144.200:8000`)
        .then(response => {
            console.log(response.data.data)
            // setGhData(response.data.data)
            const formattedData = response.data.data.map((item) => ({
              event_time: new Date(item.event_time).toLocaleString(),
              "UM-PYR20 함수율": item.value
            }));
            setGhData(formattedData);
        }).catch(error => {
            console.log(error)
        })
    }, [])

   

    return (
        <div>
          <h1>Device Data Charts</h1>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              width={500}
              height={300}
              data={gh_data}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="event_time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="UM-PYR20 함수율" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
}

export default DashboardDetail;