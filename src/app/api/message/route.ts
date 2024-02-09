import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req: Request) => {
  const { content } = await req.json();

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content }],
    model: "gpt-3.5-turbo-0125",
    stream: true,
    max_tokens: 4096,
  });

  const stream = OpenAIStream(chatCompletion);

  return new StreamingTextResponse(stream);
};
