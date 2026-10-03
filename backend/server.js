const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: ".env" });

const app = express();
app.use(cors());

const PORT = 3000;

app.get("/weather", async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({
            error: "City name is required"
        });
    }

    try {
        const API_KEY = process.env.OPENWEATHER_API_KEY;

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);

const data = await response.json();

if (!response.ok) {
    return res.status(response.status).json({
        error: data.message
    });
}

        res.json(data);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Server error"
        });
    }
});
app.get("/forecast", async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({
            error: "City name is required"
        });
    }

    try {
        const API_KEY = process.env.OPENWEATHER_API_KEY;

        const url =
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                error: data.message
            });
        }

        res.json(data);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Server error"
        });
    }
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});