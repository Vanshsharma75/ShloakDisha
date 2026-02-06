// utils/mistral.js
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const HF_API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1';

export const explainShloka = async (shlokaText) => {
  try {
    const prompt = `<s>[INST] Explain this Bhagavad Gita shloka in simple terms:\n${shlokaText} [/INST]`;

    const response = await axios.post(
      HF_API_URL,
      {
        inputs: prompt,
        parameters: {
          max_new_tokens: 300,
          temperature: 0.7,
          do_sample: true,
          top_k: 40,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        },
      }
    );

    const output = response.data?.[0]?.generated_text;
    if (!output) throw new Error("❌ No output returned");

    return output.replace(prompt, "").trim();
  } catch (error) {
    console.error('🟥 Hugging Face API error:', error?.response?.data || error.message);
    throw new Error("AI explanation failed.");
  }
};
