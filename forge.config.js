module.exports = {
	packagerConfig: {
		icon: "./images/icons/jspaint",
		name: "JS Paint",
		executableName: "jspaint",
		appBundleId: "io.isaiahodhner.jspaint",
		appCategoryType: "public.app-category.graphics-design",
		appCopyright: "© 2024 Isaiah Odhner",
		junk: true,
		// TODO: assess filtering of files; I see eslint in node_modules, why? prune is true by default
		ignore: [
			".history", // VS Code "Local History" extension
			"cypress", // Cypress tests
			"cypress.json", // Cypress config
			"browserconfig.xml", // Windows 8/10 start menu tile
			"about.html", // homepage
			"parse-rc-file.js", // localization
			"preprocess.js", // localization
			/\.rc$/, // localization
			/\.sh$/, // localization
			/\.psd$/, // theming source files
			"images/meta", // images used on README, OpenGraph, etc. (arguably README images could be included)
			// TODO: "lib/pdf.js/web", // PDF.js UI? (PDF.js is only used as a library, but does it use data from this folder?)
			// TODO: Bubblegum theme has some files that are embedded in an SVG, so they're not used directly
			// I'd want to move them to a folder or give them a suffix or something, rather than just ignoring them as they are,
			// since I may want to use them in the future.
		],
		// TODO: maybe
		// https://electron.github.io/packager/main/interfaces/Options.html#darwinDarkModeSupport
	},
	makers: [
		{
			name: "@electron-forge/maker-squirrel",
			config: {
				name: "jspaint",
				exe: "jspaint.exe",
				title: "JS Paint",
				description: "MS Paint clone with extra features",
				iconUrl: "https://raw.githubusercontent.com/1j01/jspaint/5af996478e28a32627794526ec9d25a799187119/images/icons/192x192.png",
				setupIcon: "./images/icons/jspaint.ico",
				loadingGif: "images/about/flagani.gif",
			},
		},
		{
			name: "@electron-forge/maker-zip",
			platforms: [
				"darwin",  // macOS uses a .zip, which may be automatically extracted when opened
			],
		},
		{
			name: "@electron-forge/maker-deb",
			config: {
				options: {
					name: "jspaint",
					productName: "JS Paint",
					productDescription: "MS Paint clone with extra features",
					genericName: "Image Editor",
					homepage: "https://jspaint.app/about",
					icon: "images/icons/512x512.png",
					categories: [
						"Graphics",
					],
					section: "graphics",
					maintainer: "Isaiah Odhner <isaiahodhner@gmail.com>",
				},
			},
		},
		{
			name: "@electron-forge/maker-rpm",
			config: {
				options: {
					name: "jspaint",
					productName: "JS Paint",
					productDescription: "MS Paint clone with extra features",
					genericName: "Image Editor",
					homepage: "https://jspaint.app/about",
					icon: "images/icons/512x512.png",
					categories: [
						"Graphics",
					],
					license: "MIT",
					mimeType: [
						"image/bmp",
						"image/gif",
						"image/jpeg",
						"image/png",
						"image/tiff",
						"image/webp",
						"image/x-icon",
					],
				},
			},
		}
	],
	publishers: [
		{
			name: '@electron-forge/publisher-github',
			config: {
				repository: {
					owner: '1j01',
					name: 'jspaint'
				},
				prerelease: true,
				draft: true,
			}
		}
	],
};