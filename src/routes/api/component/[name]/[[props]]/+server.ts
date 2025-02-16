import fs from "node:fs"
import { json, error } from "@sveltejs/kit"
import type { ComponentResponseData } from "$lib/constants"
import { generateComponent } from "$lib/server/generateSvelteComponent"
import type { RequestHandler } from "./$types"
import { fileURLToPath } from "node:url"
import { getStringHash } from "$lib/utility"
import path from "node:path"

function findPackageRoot(dir: string) {
	if (fs.existsSync(path.join(dir, "package.json"))) return dir

	const parentDir = path.resolve(dir, "..")
	if (dir === parentDir) return

	return findPackageRoot(parentDir)
}

export const GET: RequestHandler = async ({ params: { name, props } }) => {
	const packageRoot = findPackageRoot(fileURLToPath(import.meta.url))
	if (!packageRoot) error(500)

	const hash = getStringHash(name + props)
	const filename = path.resolve(packageRoot, "src/lib/generated", `${hash}.svelte`)

	const data: ComponentResponseData = { component: { filename } }

	if (!fs.existsSync(filename)) {
		const source = await generateComponent(name, props && decodeURIComponent(props))
		if (source) fs.writeFileSync(filename, source)
	}

	return json(data)
}
