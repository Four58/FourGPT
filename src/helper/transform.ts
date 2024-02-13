import { ContentType } from "@/model/Content";

export const createBodyWithLastThreeContent = (
  content: ContentType[],
  userInput: string
) => {
  let result = [];
  let i = 2;
  while (i >= 0) {
    if (content[content.length - i - 1]) {
      result.push({
        role: "user",
        content: content[content.length - i - 1].question,
      });
      result.push({
        role: "assistant",
        content: content[content.length - i - 1].answer,
      });
    }
    i--;
  }
  result.push({
    role: "user",
    content: userInput,
  });
  return result;
};
