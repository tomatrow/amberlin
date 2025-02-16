import type { ComponentResponseData } from "$lib/constants"
import { describeProps } from "$lib/utility"

export async function getComponentData(componentName: string): Promise<ComponentResponseData> {
	const response = await fetch(`/api/component/${componentName}`)
	return await response.json()
}

export class AmberlynClient {
	base: string

	constructor({ base = "" }: { base?: string } = {}) {
		this.base = base
	}

	async getComponent(name: string, props?: Record<string, any>): Promise<ComponentResponseData> {
		let path = `/api/component/${name}`

		if (props) path += `/${encodeURIComponent(describeProps(props))}`

		const response = await fetch(path)

		return await response.json()
	}
}
