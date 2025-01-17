import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({ origin: true }));

app.use(express.json());
app.use(cors({ 
        origin: 'https://nasaserver-node.web.app'    
}));


const apiKey = process.env.API_KEY;

app.post('/api/gpt', async (req, res) => {
    const { message } = req.body; 

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }]
            })
        });

        
        const data = await response.json();
        res.json({ response: data.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error communicating with OpenAI API');
    }
});
 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
