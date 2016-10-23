import {minify} from "uglify-js";
import uglify from "rollup-plugin-uglify";
import nodeResolve from "rollup-plugin-node-resolve";

const MINIFY = process.env.NODE_ENV === "production";

export default {
	entry: "src/index.js",
	format: "iife",
	moduleName: "es6-string-shims",
	plugins: [
		nodeResolve({
			main: true,
			jsnext: true
		})
	].concat(MINIFY ? [uglify({
		compress: {
			warnings: false,
			dead_code: true,
			unsafe: true,
			drop_console: true,
			unused: true,
			loops: true,
			booleans: true,
			conditionals: true,
			sequences: true,
			properties: true,
			comparisons: true,
			if_return: true,
			join_vars: true,
			cascade: true,
			collapse_vars: true
		},
		screwIE8: true,
		comments: false,
		mangle: true
	}, minify)
	] : [])
}
