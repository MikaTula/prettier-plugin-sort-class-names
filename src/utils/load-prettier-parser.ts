type PrettierParserModule = {
	parsers: Record<string, { parse: (...args: any[]) => any }>
}

function normalizeModule(mod: any): PrettierParserModule {
	if (mod?.parsers) {
		return mod
	}

	if (mod?.default?.parsers) {
		return mod.default
	}

	return mod?.default || mod
}

export default function loadPrettierParser(
	modernPath: string,
	legacyPath: string
): PrettierParserModule {
	try {
		// Prettier 3 path
		return normalizeModule(require(modernPath))
	} catch (e) {
		// Prettier 2 path
		return normalizeModule(require(legacyPath))
	}
}
