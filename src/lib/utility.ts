export function getStringHash(string: string) {
	let hash = 0x811c9dc5 // FNV offset basis
	for (let i = 0; i < string.length; i++) {
		hash ^= string.charCodeAt(i)
		hash *= 0x01000193 // FNV prime
	}
	return (hash >>> 0).toString(16).slice(0, 7) // Convert to unsigned hex
}

export function describeValueType(value: any): string {
	const type = typeof value

	switch (type) {
		case "function":
			return "Function"
		case "object":
			if (Array.isArray(value)) {
				const [firstItem] = value
				return `Array<${describeValueType(firstItem)}>`
			} else {
				const [firstItem] = Object.values(value)
				return `Record<string, ${describeValueType(firstItem)}>`
			}
		default:
			return type
	}
}

export function describeProps(props: Record<string, any>): string {
	let propsDescription = `{ 
		${Object.entries(props)
			.filter(([prop]) => prop !== "$")
			.map(([prop, value]) => `${prop}: ${describeValueType(value)}`)
			.join("\n")} 
	}`

	if (typeof props.$ === "string" && props.$) propsDescription + `\n Instruction: ${props.$}`

	return propsDescription
}

export function getComponentFileName(componentName: string, componentProps: Record<string, any>) {
	const propsDescription = describeValueType(componentProps)
	const filename = componentName + "-" + getStringHash(propsDescription)
	return filename
}
