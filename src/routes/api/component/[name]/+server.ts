import type { RequestHandler } from "./$types"
import { json } from "@sveltejs/kit"
import type { ComponentResponseData } from "$lib/constants"
import { generateComponentTagName } from "$lib/server/openai"

export const GET: RequestHandler = async ({ params: { name } }) => {
	const data: ComponentResponseData = {}

	const tag = await generateComponentTagName(name)

	if (tag) data.component = { tag }

	return json(data)
}
