import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

function DashboardDetail() {

    const [gh_data, setGhData] = useState([]);

    useEffect(() => {
        axios.get(`http://server:8000`)
        .then(response => {
            console.log(response.data.data)
            setGhData(response.data.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const precessData = gh_data => {
        const devices = {};

        gh_data.forEach(element => {
            if (!devices[element.device_name]) {
                devices[element.device_name] = {};
            }
            if (!devices[element.device_name][element.data_type_name]) {
                devices[element.device_name][element.data_type_name] = {
                    labels: [],
                    values: []
                };
            }
            devices[element.device_name][element.data_type_name].labels.push(element.event_time);
            devices[element.device_name][element.data_type_name].values.push(element.data_value);
        });

        return devices;
    }

    const devicesData = precessData(gh_data);

    return (
        <div>
          <h1>Device Data Charts</h1>
          {Object.keys(devicesData).map((deviceName, idx) => (
            <div key={idx}>
              <h2>{deviceName}</h2>
              <Line
                data={{
                  labels: devicesData[deviceName][Object.keys(devicesData[deviceName])[0]].labels,
                  datasets: Object.keys(devicesData[deviceName]).map((dataType, index) => ({
                    label: dataType,
                    data: devicesData[deviceName][dataType].values,
                    fill: false,
                    borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
                    tension: 0.1
                  }))
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: `Device: ${deviceName}`
                    }
                  }
                }}
              />
            </div>
          ))}
        </div>
      );
}

export default DashboardDetail;