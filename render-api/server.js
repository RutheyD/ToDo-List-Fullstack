// import express from "express";
// import dotenv from "dotenv";
// import fetch from "node-fetch";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.get("/apps", async (req, res) => {
//   try {
//     const response = await fetch("https://api.render.com/v1/services", {
//       headers: { Authorization: `Bearer ${process.env.RENDER_API_KEY}` },
//     });

//     if (!response.ok) {
//       throw new Error(`Render API error: ${response.statusText}`);
//     }

//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
// import renderApi from '@api/render-api';

// renderApi.auth('rnd_ofXM3KEiWSKACuNPF4gLuzRQ1yAE');
// renderApi.listServices({includePreviews: 'true', limit: '20'})
//   .then(({ data }) => console.log(data))
//   .catch(err => console.error(err));
const express = require('express');
const renderApi = require('@api/render-api');

const app = express();
const port = 3000;

// אתחול האוטנטיקציה עם ה-API Key
const apiKey = 'rnd_ofXM3KEiWSKACuNPF4gLuzRQ1yAE';
renderApi.auth(apiKey);

app.get('/services', (req, res) => {
    renderApi.listServices({ includePreviews: 'true', limit: '20' })
        .then(({ data }) => {
            res.json(data); // החזרת נתוני השירותים
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching data from Render API'); // טיפול בשגיאות
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});