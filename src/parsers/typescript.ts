import functionCalls from '../node-formatters/function-calls'
import functionTemplates from '../node-formatters/function-templates'
import jsxAttributes from '../node-formatters/jsx-attributes'
import twin from '../node-formatters/twin'
import { CreateSortClassList, SortClassList } from '../sort-class-list'
import loopNodes from '../utils/loop-nodes'
import loadPrettierParser from '../utils/load-prettier-parser'

const prettierParserTypescript = loadPrettierParser(
	'prettier/plugins/typescript',
	'prettier/parser-typescript'
)

export default (cscl: CreateSortClassList) => ({
	...prettierParserTypescript.parsers.typescript,
	parse(text, parsers, options) {
		const ast = prettierParserTypescript.parsers.typescript.parse(
			text,
			parsers,
			options
		)

		const attributeNames: string[] = options.sortClassNamesClassAttributes.split(
			','
		)
		const functionNames: string[] = options.sortClassNamesSortFunctions.split(
			','
		)

		const result = loopNodes(ast, node => {
			jsxAttributes(cscl(options), node, attributeNames)
			twin(cscl(options), node)
			functionCalls(cscl(options), node, functionNames)
			functionTemplates(cscl(options), node, functionNames)

			return node
		})

		return result
	},
})
