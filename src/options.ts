export default {
	sortClassNamesOrderFile: {
		type: 'string',
		category: 'Global',
		default: 'prettier-plugin-sort-class-names-order',
		description:
			'Path to your custom prettier-plugin-sort-class-names-order, if you not define anything, it will sort the class names alphabetically.',
	},
	sortClassNamesPrefixes: {
		type: 'string',
		category: 'Global',
		default: 'sm:,md:,lg:,xl:',
		description:
			'Comma separated list of your prefixes. Prefixes will be grouped together wenn sorting.',
	},
	sortClassNamesUnknownClassesSeparator: {
		type: 'string',
		category: 'Global',
		default: '/',
		description:
			'When your class list contains known (in your order-file) and unknown class names, it will be separated by this char. You can disable this by providing an empty string as option (`""`)',
	},
	sortClassNamesClassAttributes: {
		type: 'string',
		category: 'Global',
		default: 'class,className,tw',
		description:
			'Comma separated list of JSX attributes to sort tailwind classes in.',
	},
	sortClassNamesSortFunctions: {
		type: 'string',
		category: 'Global',
		default: 'clsx,classNames,cx',
		description:
			'Comma separated list of function names to sort classes in arguments.',
	},
	sortClassNamesRemoveDuplicates: {
		type: 'boolean',
		category: 'Global',
		default: false,
		description:
			'Remove duplicate class names while sorting. This only removes exact duplicate tokens.',
	},
}
