import prompt from "./prompt.txt?raw"
import llmsSmall from "../svelte/llms-small.txt?raw"
import { openai } from "../openai"

export async function generateComponent(name: string, props?: string) {
	const text = `
		Name: ${name} 
		Props: ${props}
	`

	const response = await openai.chat.completions.create({
		model: "o1-mini",
		messages: [
			{
				role: "user",
				content: [
					{
						type: "text",
						text: llmsSmall
					},
					{
						type: "text",
						text: prompt
					},
					{
						type: "text",
						text
					}
				]
			}
		],
		response_format: {
			type: "text"
		},
		max_completion_tokens: 2000,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0
	})

	const code = response.choices[0]?.message.content ?? undefined

	return code
}
