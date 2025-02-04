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
//     res.json(data);{"message":"Error fetching data"}
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
// const express = require('express');
// const renderApi = require('@api/render-api');

// const app = express();
// const port = 5047;

// // אתחול האוטנטיקציה עם ה-API Key
// const apiKey = 'rnd_ofXM3KEiWSKACuNPF4gLuzRQ1yAE';
// renderApi.auth(apiKey);

// app.get('/services', (req, res) => {
//     renderApi.listServices({ includePreviews: 'true', limit: '20' })
//         .then(({ data }) => {
//             res.json(data); // החזרת נתוני השירותים
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(500).send('Error fetching data from Render API'); // טיפול בשגיאות
//         });
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });
// const express = require('express');
// const axios = require('axios');
// require('dotenv').config(); // טעינת משתני הסביבה מקובץ .env

// const app = express();
// const port = 5047;

// // טעינת ה-API Key מקובץ .env
// const API_KEY = process.env.RENDER_API_KEY;
// const RENDER_API_URL = 'https://api.render.com/v1/services';
// console.log("API Key:", API_KEY);

// app.get('/services', async (req, res) => {
//     try {
//         const response = await axios.get(RENDER_API_URL, {
//             headers: { 'Authorization': `Bearer ${API_KEY}` } // שימוש במפתח API שמאוחסן ב-.env
//         });

//         res.json(response.data); // החזרת הנתונים ללקוח
//     } catch (error) {
//         console.error('Error fetching data from Render API:', error);
//         res.status(500).json({ error: 'Failed to fetch services' });
//     }
// });

// app.listen(port, () => {
//     console.log(`✅ Server running at http://localhost:${port}`);
// });


const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.get('/render-apps', async (req, res) => {
  try {
    // קבלת ה-API Key מהסביבה
    const apiKey = process.env.RENDER_API_KEY;

    // שליחת בקשה ל-Render API כדי לקבל את רשימת האפליקציות
    const response = await axios.get('https://api.render.com/v1/services', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    // החזרת נתוני האפליקציות ב-JSON
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Render API:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
