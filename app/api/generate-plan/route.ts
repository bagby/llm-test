import { log } from 'console';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Set your OpenAI API key in an environment variable
});

export async function POST(request: Request) {
  const { tasks } = await request.json();
  if (!tasks || typeof tasks !== 'string') {
    return new Response(JSON.stringify({ error: 'Invalid input' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  } 

  try {
    const response = await openai.responses.create({
      model: 'gpt-4o', // Use the appropriate model
      input: `Create a detailed day plan based on the following tasks: ${tasks}`,
    });
    const plan = response.output_text;

    return new Response(JSON.stringify({ plan }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}