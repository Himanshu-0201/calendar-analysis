import express from 'express';
const route = express.Router();

route.get('/favicon.ico', (req, res) => res.status(204).json({ message: "No favicon, error handled by express js" }));

route.get('/', (req, res) => res.status(200).send("You made request to default route"));

export default route;