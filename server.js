const express = require('express');
const app = express();
const port = 3000;
const author = "Jakub Mazur";

app.use(express.urlencoded({ extended: true }));

const weatherData = {
  "Polska-Lublin": { temp: "15°C", desc: "Częściowo zachmurzone" },
  "Niemcy-Berlin": { temp: "18°C", desc: "Słonecznie" },
  "Włochy-Rzym": { temp: "25°C", desc: "Gorąco i słonecznie" }
};

app.get('/', (req, res) => {
  res.send(`
    <h2>Wybierz lokalizację, aby sprawdzić pogodę</h2>
    <form action="/pogoda" method="POST">
      <select name="location">
        <option value="Polska-Lublin">Polska - Lublin</option>
        <option value="Niemcy-Berlin">Niemcy - Berlin</option>
        <option value="Włochy-Rzym">Włochy - Rzym</option>
      </select>
      <button type="submit">Sprawdź</button>
    </form>
  `);
});

app.post('/pogoda', (req, res) => {
  const loc = req.body.location;
  const data = weatherData[loc];
  if (data) {
    res.send(`<h3>Pogoda dla: ${loc}</h3><p>Temperatura: ${data.temp}</p><p>Opis: ${data.desc}</p><a href="/">Powrót</a>`);
  } else {
    res.send(`<p>Brak danych dla tej lokalizacji.</p><a href="/">Powrót</a>`);
  }
});

app.listen(port, () => {
  const startDate = new Date().toISOString();
  console.log(`[LOG] Data uruchomienia: ${startDate}`);
  console.log(`[LOG] Autor programu: ${author}`);
  console.log(`[LOG] Aplikacja nasłuchuje na porcie TCP: ${port}`);
});