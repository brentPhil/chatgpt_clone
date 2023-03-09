// "use client"

import openai from "./chatgpt"

const query = async (prompt: string, chatId: string, model: string) => {
  const res = await openai
    .createCompletion({
      model,
      prompt,
      temperature: 0.7, // lower temperature can result in more "conservative" and coherent responses
      top_p: 0.9, // setting a lower top_p value can result in more diverse and surprising responses
      max_tokens: 2000, // increasing the max_tokens can allow the model to provide more detailed and descriptive responses
      frequency_penalty: 0.5, // setting a non-zero frequency_penalty can prevent the model from repeating the same responses
      presence_penalty: 0.5, // setting a non-zero presence_penalty can encourage the model to provide more diverse responses
    })
    .then((res) => res.data.choices[0].text)
    .catch(
      (err) =>
        `ChatGPT was unable to find an answer for that! (Error: ${err.message}).`
    )
  return res
}

export default query
