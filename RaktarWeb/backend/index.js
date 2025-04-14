import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

const port = 5500;
// setup
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/monitorok', (req,res)=>{
    const monitorok = [
        { "name": "LG", "price": 100000, "available": true },
        { "name": "ASUS", "price": 120000, "available": true },
        { "name": "DELL", "price": 200000, "available": false }
    ];
    res.json(monitorok);
});

app.get('/nyomtatok', (req,res)=>{
    const nyomtatok = [
        { "name": "HP", "price": 12000, "szines": false },
        { "name": "Canon", "price": 70000, "szines": true },
        { "name": "Konica Minolta", "price": 400000, "szines": true }
    ];
    res.json(nyomtatok);
});

app.get('/egerek', (req,res)=>{
    const egerek = [
        { "name": "Logitech", "price": 15000, "gamer": true },
        { "name": "Razer", "price": 25000, "gamer": true },
        { "name": "Microsoft", "price": 30000, "gamer": false }
    ];
    res.json(egerek);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
