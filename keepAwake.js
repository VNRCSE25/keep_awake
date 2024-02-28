// Dynamically import node-fetch
import('node-fetch').then(async (fetch) => {
  // Function to make HTTP request to keep the server awake
  const keepAwake = async () => {
    try {
      const response = await fetch.default('https://vnr-fmp.onrender.com');
      if (response.ok) {
        console.log('Successfully kept server awake');
      } else {
        console.error('Failed to keep server awake');
      }
    } catch (error) {
      console.error('Error keeping server awake:', error.message);
    }
  };

  // Call keepAwake function initially
  keepAwake();

  // Schedule keepAwake function to run every 10 minutes
  setInterval(keepAwake, 10 * 60 * 1000); // 10 minutes * 60 seconds * 1000 milliseconds
}).catch(error => {
  console.error('Error importing node-fetch:', error.message);
});
