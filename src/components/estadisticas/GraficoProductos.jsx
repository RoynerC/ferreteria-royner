import { Card, CardBody } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


const GraficoProductos = ({ nombres, precios }) => {

    const data = {
        labels: nombres, //Nombres de los productos
        datasets: [
            {
                label: 'precio (C$)',
                data: precios, //precios de los productos
                backgroundcolor: 'rgba(10, 228, 141, 0.2)',
                borderwidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'precios de productos',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'precio (C$)',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'productos',
                },
            },
        },
    };


    return (
        <div stlyle={{ width: "100%", height: "400px"}}>
            <Card stlyle={{ height: "100%" }}>
                <Card.Body>
                    <Card.Title>Grafico Productos</Card.Title>
                    <div style={{heigth: "100%", position:"relative"}}>
                        <Bar data={data} options={options} />
                            </div>
                            </Card.Body>.
            </Card>
        </div>
    );
};

export default GraficoProductos;
