import functionCalls from '../node-formatters/function-calls'
import functionTemplates from '../node-formatters/function-templates'
import jsxAttributes from '../node-formatters/jsx-attributes'
import { CreateSortClassList, SortClassList } from '../sort-class-list'
import loopNodes from '../utils/loop-nodes'
import loadPrettierParser from '../utils/load-prettier-parser'

const prettierParserBabel = loadPrettierParser(
	'prettier/plugins/babel',
	'prettier/parser-babel'
)

export default (cscl: CreateSortClassList) => ({
	...prettierParserBabel.parsers.babel,
	parse(text, parsers, options) {
		const ast = prettierParserBabel.parsers.babel.parse(text, parsers, options)

		const attributeNames: string[] = options.sortClassNamesClassAttributes.split(
			','
		)
		const functionNames: string[] = options.sortClassNamesSortFunctions.split(
			','
		)

		const result = loopNodes(ast, node => {
			jsxAttributes(cscl(options), node, attributeNames)
			functionCalls(cscl(options), node, functionNames)
			functionTemplates(cscl(options), node, functionNames)

			return node
		})

		return result
	},
})
