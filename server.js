const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 1332;
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/main.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
