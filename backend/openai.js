import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: 'sk-IKL7w5G_oLlg5JvEH4pFUFhlj4UDsBEWDR98FpPi9IT3BlbkFJxA_t0wfcMqqoDj6UJtLTDYBTeFelpjhS1ofUxpjO8A'
});

async function getResponse() {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: "Hello How Are You" }
    ]
  });

  console.log(response.choices[0].message.content);
}

getResponse();
