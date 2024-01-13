const axios = require("axios");
const API_KEY = "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";

const generateImages = async () => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt: "My new friend came to my house last night after college so we could play video games. I was like, Mate, take off your shoes 'fore you come in 'cuz it's not good to walk around like that in here. ",
        n: 1, //define the number of images
        size: "1024x1024", //define the resolution of image
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    console.log(response.data);
    // Handle the response here, e.g., extract image data and display or save it.
  } catch (error) {
    console.error("Error:", error.response.data);
  }
};

generateImages();
