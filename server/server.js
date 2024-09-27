const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT;



app.use(cors());
app.use(express.json());

app.get('/healthCheck', (req, res) => {
    res.send({ answer: 'OK' });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
