import type { Component } from "svelte"
import AComp from "./A.svelte"
import { setComponentName } from "./setComponentName.js"

export const A = new Proxy(function () {}, {
	apply(_target, _thisArg, argArray: [internal: unknown, props: { is: unknown }]) {
		// @ts-expect-error
		return AComp(...argArray)
	},
	get(_target, componentName) {
		if (typeof componentName === "string") {
			setComponentName(componentName)
		}
		return AComp
	}
}) as unknown as typeof AComp & Record<string, Component>
