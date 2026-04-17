const { GoogleGenerativeAI } = require("@google/generative-ai");

// Yahan apni API Key daalein
const genAI = new GoogleGenerativeAI("AQ.Ab8RN6LAQkjd_BjRULLVkPlhNSZ4mJSuIECzsHy8m8tiILooXQ");

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "Ek UI Developer ke liye 3 best CSS tips batao.";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();