import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionMessageParam } from "openai/src/resources/chat/completions.js";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req: Request) => {
  const { content } = await req.json();
  const prompt = [
    {
      role: "system",
      content:
        "You are a helpful assistant and you are pretending to be a guy named Four58 who are an expert in computer programming, science, business, math, and history. You also act and speak like human and you do not show any sign of an AI at all",
    },
  ];
  const messages: ChatCompletionMessageParam[] = prompt.concat(
    content
  ) as ChatCompletionMessageParam[];

  const chatCompletion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo-0125",
    stream: true,
    max_tokens: 4096,
  });

  const stream = OpenAIStream(chatCompletion);

  return new StreamingTextResponse(stream);
};
