import type { ComponentResponseData } from "$lib/constants"

export async function getComponentData(componentName: string): Promise<ComponentResponseData> {
	const response = await fetch(`/api/component/${componentName}`)
	return await response.json()
}
