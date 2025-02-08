import { OPENAI_API_KEY } from "$env/static/private"
import OpenAI from "openai"
import { htmlElementTags, type HtmlElementTag } from "$lib/constants"
import prompt from "./prompt.txt?raw"
console.log({ prompt })

export const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

export async function generateComponentTagName(componentName: string) {
	const response = await openai.chat.completions.create({
		model: "gpt-4o-mini",
		messages: [
			{
				role: "system",
				content: [
					{
						type: "text",
						text: prompt
					},
					{
						type: "text",
						text: JSON.stringify(componentName)
					}
				]
			}
		],
		response_format: {
			type: "json_schema",
			json_schema: {
				name: "tag_schema",
				schema: {
					type: "object",
					required: ["tag"],
					properties: {
						tag: {
							type: "string",
							description: "A label or identifier; its presence is optional."
						}
					},
					additionalProperties: false
				},
				strict: true
			}
		},
		temperature: 0,
		max_completion_tokens: 100,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0
	})

	const rawJson = response.choices[0]?.message.content
	if (!rawJson) return
	const json = JSON.parse(rawJson)

	const tag: HtmlElementTag | undefined = htmlElementTags.find((otherTag) => otherTag === json?.tag)

	return tag
}
