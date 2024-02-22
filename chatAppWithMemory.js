import { ConversationChain } from "langchain/chains";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { BufferMemory } from "langchain/memory";
import { ChatOpenAI } from "@langchain/openai";

// Store the last 5 chat messages as arrays
let chatHistory = [];

export const chatAPI = async (req, res) => {
  try {
    const { ques } = req.body;

    const chatModel = new ChatOpenAI({
      model: "gpt-3.5-turbo",
      openAIApiKey: "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",
      temperature: 0.5,
    });

    // Ensure chatHistory elements are arrays
    chatHistory = chatHistory.map((message) => ["human", message]);

    // Limit chatHistory to 5 messages
    chatHistory = chatHistory.slice(-5); // Keep only the last 5 elements

    // Construct chat prompt with proper history formatting
    const chatPrompt = ChatPromptTemplate.fromMessages([
      ["system", "You are a nice chatbot having a conversation with a human."],
      ...chatHistory, // Add history messages directly
      ["human", "{input}"],
    ]);

    // Create Conversation Chain
    const chain = new ConversationChain({
      memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
      prompt: chatPrompt,
      llm: chatModel,
    });

    const response = await chain.call({ input: ques });

    // Update chat history (ensuring it's an array of arrays)
    chatHistory.push(["human", response]);
    chatHistory = chatHistory.slice(-5); // Keep only the last 5 elements

    res.status(200).json({ output: response });
  } catch (error) {
    res.status(200).json({ errors: [{ msg: error.message }] });
  }
};
