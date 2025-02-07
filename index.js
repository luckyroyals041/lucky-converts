const express = require('express');
const convert = require('./convert');
const app = express();

app.use(express.json());

app.get('/convert', (req, res) => {
    const { inr } = req.query;
    
    if (!inr || isNaN(inr)) {
        return res.status(400).json({ 
            error: 'Missing or invalid query parameter: inr must be a number' 
        });
    }

    try {
        const usd = convert(Number(inr));
        return res.json({ inr: Number(inr), usd });
    } catch (error) {
        console.error('Conversion error:', error);
        return res.status(500).json({ 
            error: error.message || 'Internal server error' 
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', (error) => {
    console.error('Server failed to start:', error);
});
