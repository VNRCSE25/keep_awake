const exp = require("express");

const app = exp();

app.use(exp.json());

require('dotenv').config();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}...`));

// Define a function to keep the server awake
const keepAwake = async () => {
    try {
        const fetch = await import('node-fetch');
        const response = await fetch.default('https://vnr-fmp.onrender.com');
        if (response.ok) {
            console.log('Server is awake');
        } else {
            console.error('Failed to keep server awake');
        }
    } catch (error) {
        console.error(`Error keeping server awake: ${error.message}`);
    }
};

// Define a route to keep the server awake
app.get('/keep-awake', async (req, res) => {
    keepAwake();
    res.send('Keeping server awake...');
});

// Schedule keepAwake function to run every 10 minutes
setInterval(keepAwake, 10 * 60 * 1000); // 10 minutes * 60 seconds * 1000 milliseconds
