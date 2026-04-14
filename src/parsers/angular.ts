import { CreateSortClassList, SortClassList } from '../sort-class-list'
import loadPrettierParser from '../utils/load-prettier-parser'

const prettierParserHTML = loadPrettierParser(
	'prettier/plugins/html',
	'prettier/parser-html'
)

export default (cscl: CreateSortClassList) => ({
	...prettierParserHTML.parsers.angular,
	parse(text, parsers, options) {
		const ast = prettierParserHTML.parsers.angular.parse(text, parsers, options)

		const cleanElementClasses = el => {
			if (el.attrs) {
				const classAttr = el.attrs.find(attr => attr.name === 'class')
				if (classAttr) {
					const classList = classAttr.value
						.split(' ')
						.map(classItem => classItem.trim())
						.filter(classItem => classItem.length > 0)
					classAttr.value = cscl(options)(classList).join(' ')
				}
			}

			if (el.children && el.children.length > 0) {
				el.children.forEach(childEl => cleanElementClasses(childEl))
			}
		}
		cleanElementClasses(ast)

		return ast
	},
})
