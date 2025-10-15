const express = require('express');
const app = express();
const port = 3000;

function loggerMiddleware(req, res, next) {
  console.log('loggerMiddleware, req.body =', req.body);
  next();
}

app.use(loggerMiddleware);
app.use(express.json());
app.use(loggerMiddleware);
app.use(express.static('templates'));
app.use(express.static('public'));


app.post('/', (req, res) => {
  res.json({ received: req.body });
});

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
