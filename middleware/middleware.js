const express = require('express');
const cors = require('cors')
const app = express();
const port = 5000;
const serversLogs = [{server: "server1", logs: []}, {server: "server2", logs: []}]

app.use(cors());
app.use(express.json());

setInterval(async () => {
    let text = "";
    try {
        await fetch(`http://localhost:4001/healthCheck`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => text = data.answer)
        const time = new Date();
        const fecha = time.toLocaleDateString();
        const hora = time.toLocaleTimeString();
        serversLogs[0].logs.push(fecha + " - "  + hora + " - " + text)
        console.log("server1:" , fecha, "-" , hora, "-" , text);
    } catch (error) {
        const time = new Date();
        const fecha = time.toLocaleDateString();
        const hora = time.toLocaleTimeString();
        serversLogs[0].logs.push(fecha + " - "  + hora + " - " + "T.O")
        console.log("server1:" , fecha, "-" , hora, "-" , "T.O");        
    }

}, 1000);

setInterval(()=> {
    console.log(serversLogs[0].logs[0])
}, 5000)

setInterval(async () => {
    try {
        let text = "";
        await fetch(`http://localhost:4002/healthCheck`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => text = data.answer)
    
        const time = new Date();
        const fecha = time.toLocaleDateString();
        const hora = time.toLocaleTimeString();
        serversLogs[1].logs.push(fecha + " - "  + hora + " - " + text)
        console.log("server2:" , fecha, "-" , hora, "-" , text);
    } catch (error) {
        const time = new Date();
        const fecha = time.toLocaleDateString();
        const hora = time.toLocaleTimeString();
        serversLogs[1].logs.push(fecha + " - "  + hora + " - " + "T.O")
        console.log("server2:" , fecha, "-" , hora, "-" , "T.O");
    }
}, 1000);

app.get('/status', (req, res) => {
    res.json(serversLogs);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
