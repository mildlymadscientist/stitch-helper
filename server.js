import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import { createRequire } from 'module';
import axios from 'axios';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('pdfFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No PDF file uploaded' });
        }

        const dataBuffer = fs.readFileSync(req.file.path);
        const pdfData = await pdfParse(dataBuffer);
        const fileText = pdfData.text;

        const prompt = req.body.prompt || 'Convert this crochet pattern to standard American style with correct yarn size, returning only instructions as separate lines.';

        const combinedPrompt = `${prompt}\n\n${fileText}`;

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'user', content: combinedPrompt }
                ],
                max_tokens: 500,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Log the full OpenAI API response
        console.log('Full OpenAI API response:', JSON.stringify(response.data, null, 2));

        // Log just the content we're extracting
        const openaiContent = response.data.choices[0].message.content;
        console.log('OpenAI content:', openaiContent);
        console.log('OpenAI content type:', typeof openaiContent);
        console.log('OpenAI content length:', openaiContent.length);

        fs.unlinkSync(req.file.path);

        const result = {
            result: openaiContent,
        };

        // Log what we're sending back to the client
        console.log('Sending to client:', JSON.stringify(result, null, 2));
        console.log('Result object type:', typeof result);
        console.log('Result.result type:', typeof result.result);

        res.json(result);
    } catch (error) {
        console.error('Error processing PDF and calling OpenAI:', error.response?.data || error.message);

        // Check for specific OpenAI API errors
        if (error.response?.status === 429) {
            const errorType = error.response.data?.error?.type;
            if (errorType === 'insufficient_quota') {
                console.error('QUOTA ERROR: You have exceeded your OpenAI API quota');
                return res.status(429).json({ error: 'API quota exceeded. Please check your OpenAI billing.' });
            } else if (errorType === 'rate_limit_exceeded') {
                console.error('RATE LIMIT ERROR: Too many requests');
                return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
            }
        }

        res.status(500).json({ error: 'Failed to process request' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
