import * as fs from 'fs'
import options from './options'

type Options = Record<keyof typeof options, any>

const prefixCache: Record<string, string[]> = {}

// lazily init twClasses, so if on some point we want to use a custom sort-function we do not need to load this file
let twClasses: Record<string, number>
function getTwClasses(opts: Options) {
	if (!twClasses) {
		twClasses = fs.existsSync(opts.sortClassNamesOrderFile)
			? Object.fromEntries(
					fs
						.readFileSync(opts.sortClassNamesOrderFile, 'utf8')
						.split('\n')
						.map((c, i) => [c.replace('\r', ''), i])
			  )
			: {}
	}
	return twClasses
}

function classNameToIndex(opts: Options, className: string) {
	return getTwClasses(opts)[className] || -1
}

function shouldRemoveDuplicates(opts: Options) {
	return (
		opts.sortClassNamesRemoveDuplicates === true ||
		opts.sortClassNamesRemoveDuplicates === 'true'
	)
}

export type CreateSortClassList = (
	opts: Options
) => SortClassList
export type SortClassList = (classes: string | string[]) => string[]

export function defaultSortClassList(opts: Options): SortClassList {
	let prefixes = prefixCache[opts.sortClassNamesPrefixes]
	if (!prefixes) {
		prefixes = opts.sortClassNamesPrefixes.split(',')
		prefixCache[opts.sortClassNamesPrefixes] = prefixes
	}
	return (classes: string | string[]) => {
		if (!Array.isArray(classes)) {
			classes = classes
				.split(' ')
				.map(c => c.trim())
				.filter(Boolean)
				// ignore slash classes (which are inserted by default by this plugin)
				.filter(cn => cn !== opts.sortClassNamesUnknownClassesSeparator)
		}

		if (shouldRemoveDuplicates(opts)) {
			const seen = new Set<string>()
			classes = classes.filter(className => {
				if (seen.has(className)) {
					return false
				}

				seen.add(className)
				return true
			})
		}

		const orderedClassNameParts: string[] = []

		const noPrefixClassNames: string[] = []
		const prefixesHelper = prefixes.map(p => {
			return { prefix: p, classNames: [] as string[] }
		})

		classes.forEach(cn => {
			for (const { prefix, classNames } of prefixesHelper) {
				if (cn.startsWith(prefix)) {
					classNames.push(cn)
					return
				}
			}
			// wenn kein prefix passt, füge es den allgemeinen Klassen hinzu:
			noPrefixClassNames.push(cn)
		})

		// als erstes Klassen ohne Prefix
		;[
			{ prefix: '', classNames: noPrefixClassNames },
			...prefixesHelper,
		].forEach(({ classNames, prefix }) => {
			const res: { [key: string]: string[] } = {}
			classNames.forEach(cn => {
				// nutze den bereinigten Klassen-Namen um den sortierungsindex herauszubekommen:
				const classNameWithoutPrefix = cn.substr(prefix.length)
				const sortIndex = classNameToIndex(opts, classNameWithoutPrefix)

				let arr = res[sortIndex.toString()]
				if (!arr) {
					arr = []
					res[sortIndex.toString()] = arr
				}

				arr.push(cn)
			})
			const numberKeys = Object.keys(res).map(k => Number(k))
			numberKeys
				.sort((a, b) => a - b)
				.forEach(key => {
					orderedClassNameParts.push(res[key.toString()].sort().join(' '))
					if (
						opts.sortClassNamesUnknownClassesSeparator &&
						key < 0 &&
						numberKeys.some(k => k >= 0)
					) {
						orderedClassNameParts.push(
							opts.sortClassNamesUnknownClassesSeparator
						)
					}
				})
		})

		return orderedClassNameParts
	}
}
