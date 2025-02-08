let currentComponentName: string | undefined

export function setComponentName(componentName: string | undefined) {
	currentComponentName = componentName
}

export function useComponentName() {
	const componentName = currentComponentName
	currentComponentName = undefined
	return componentName
}
