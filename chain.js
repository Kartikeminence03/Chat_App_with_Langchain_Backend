import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const prompt = ChatPromptTemplate.fromMessages([
    ["human", "Tell me a short about javaScript language {topic}"],
  ]);
  const model = new ChatOpenAI({
    model:"gpt-3.5-turbo",
    openAIApiKey: "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",
    temperature: 0
  });
  const outputParser = new StringOutputParser();
  
  const chain = prompt.pipe(model).pipe(outputParser);
  
  const response = await chain.invoke({
    topic: "what is javaScript DOM",
  });
  console.log(response);