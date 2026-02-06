// falconClient.js
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const explainShloka = async (shlokaText) => {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct',
      {
        inputs: `Explain this Bhagavad Gita shloka in simple terms:\n${shlokaText}`,
        parameters: {
          max_new_tokens: 300,
          do_sample: true,
          top_k: 10
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        }
      }
    );

    return response.data[0]?.generated_text || "No output.";
  } catch (error) {
    console.error("❌ Falcon API Error:", error.message);
    return "Error generating explanation.";
  }
};
