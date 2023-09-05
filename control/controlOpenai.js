// Import required libraries
const { Configuration, OpenAIApi } = require("openai");

// Set up API configuration
const configuration = new Configuration({
    apiKey: process.env.API_KEY // Replace with your actual API key
});

// Initialize OpenAI API instance
const openai = new OpenAIApi(configuration);

// Function to generate an image based on the prompt and size provided
const generateImage = async (req, res) => {
    const { prompt, size } = req.body; // Extract prompt and size from the request body

    // Determine the image size based on the provided size parameter
    const imageSize =
        size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

    try {
        // Create an image using the OpenAI API
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: imageSize
        });

        // Extract the image URL from the response
        const imageUrl = response.data.data[0].url;

        // Send a success response with the generated image URL
        res.status(200).json({
            success: true,
            data: imageUrl,
        });

    } catch (error) {
        // Handle errors and send an error response
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        res.status(400).json({
            success: false,
            error: "Image could not be generated"
        });
    }
};

// Export the generateImage function to make it accessible from other files
module.exports = { generateImage };
