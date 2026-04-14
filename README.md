# prettier-plugin-sort-class-names

Per default it will sort your class names alphabetically.

Fork of @fuzed/prettier-plugin-sort-class-names

Update for new prettier 

## install

Prettier should already be set up for your project ([check prettier docs](https://prettier.io/docs/en/install.html)). After that it is enough to install `prettier-plugin-sort-class-names` in the same project, it will be applied automatically.

```
npm i prettier-plugin-sort-class-names --save-dev
# or with yarn
yarn add prettier-plugin-sort-class-names --dev
```

> If you are using yarn 2 (aka Plug'n'Play/PnP, aka "berry"), check [the troubleshooting section at the bottom](#plugin-is-not-automatically-detected-with-yarn-2)

## prettier-plugin-sort-class-names-order

You can create a file `prettier-plugin-sort-class-names-order` where every line represents a class name. The higher up a class is in the list, the further forward it is sorted. Example:

```
flex
block
align-items-center
```

With this sorting-file, a node like

```html
<div class="custom-class md:flex align-items-center block"></div>
```

will become

```html
<div class="custom-class / block align-items-center md:flex"></div>
```

### existing order-lists

- [tailwind with default config](https://gist.github.com/PutziSan/e5c1edcdaa540d8104f8e38712eca472#file-prettier-plugin-sort-class-names-order)

## custom prettier options

you can add this options to your [prettier config file](https://prettier.io/docs/en/configuration.html):

| option                                | description                                                                                                                                                                             | default                                    |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| sortClassNamesOrderFile               | Path to your custom `prettier-plugin-sort-class-names-order` file, if you not define anything, it will sort the class names alphabetically.                                             | `"prettier-plugin-sort-class-names-order"` |
| sortClassNamesPrefixes                | comma seperated list of your prefixes. Prefixes will be grouped together wenn sorting.                                                                                                  | `"sm:,md:,lg:,xl:"`                        |
| sortClassNamesUnknownClassesSeparator | When your class list contains known (in your order-file) and unknown class names, it will be separated by this char. You can disable this by providing an empty string as option (`""`) | `"/"`                                      |
| sortClassNamesClassAttributes         | Comma separated list of JSX attributes to sort tailwind classes in.                                                                                                                     | `"class,className,tw"`                     |
| sortClassNamesSortFunctions           | Comma separated list of function names to sort classes in arguments.                                                                                                                    | `"clsx,classNames,cx"`                     |
| sortClassNamesRemoveDuplicates        | Remove duplicate class names while sorting. Only exact duplicate tokens are removed, e.g. `sm:flex` and `md:flex` are treated as different classes.                                   | `false`                                    |

## parser support

Supports

- HTML
- CSS (@apply directive)
- JSX, TSX
- [twin.marco](https://github.com/ben-rogerson/twin.macro)

## troubleshooting

### plugin is not automatically detected with yarn 2

1. make sure to use `prettier.config.js` (if you are currently using `.prettierrc` et al you have to change to the js-variant)
1. add the `plugins` section:

```javascript
module.exports = {
	plugins: [require('prettier-plugin-sort-class-names')],
	// ... your other config-keys like:
	printWidth: 120,
}
```

> check [prettier issue #7073](https://github.com/prettier/prettier/issues/7073#issuecomment-711954542) for more information

## special thanks

To [Acidic9](https://github.com/Acidic9) and his package [prettier-plugin-tailwind](https://github.com/Acidic9/prettier-plugin-tailwind).

If you want to sort your tailwind class names, you should give this package a shot and come back if you want to extend it with custom class names.
