# Introduction to JSDoc

## Installation
### Project local (advantage less conflicts with other versions)
  - `Requires a local node project: '<path>/<to>/<js files> $ node init'`
  - Creates 'node_modules' directory
  - `<path>/<to>/<js_files> $ npm install [--save-dev] jsdoc`
  - Add annotations to JS files
  - `<path>/<to>/<js_files> $ ./node_modules/.bin/jsdoc filename.js || dir`
  - Creates './out' directory with JSDoc HTML files


### Global (no node project needed and executable from everywhere)
  - `<HOME> $ npm install -g jsdoc`
  - Add annotations to JS files
  - `<path>/<to>/<js_files> $ jsdoc filename.js || dir`
  - Creates './out' directory with JSDoc HTML files


## Usage
Use with @-annotations
[see https://devhints.io/jsdoc] for a quick cheat sheet or [see https://jsdoc.app/index.html] for the official documentation.

```
/** This is a function description */
let functionWithOneArgument = function(a) {
    console.log(a+a);
}

/**
 * This is a function.
 *
 * @param {string} n - A string param
 * @return {string} A good string
 *
 * @example
 *
 *     foo('hello')
 */

function foo(n) {
  return n
}

/**
 * @type {number}
 */
var FOO = 1


/**
 * @throws {FooException}
 * @private
 * @deprecated
 * @see
 *
 * @function
 * @class
 */
```
## Integration to IDE

### IntelliJ IDE
Support may be enable by default.<br>
Type `'/**' + <ENTER>` this should complete the JSDoc stub for a given scope.<br>
[see https://www.jetbrains.com/help/idea/creating-jsdoc-comments.html]

### Visual Studio Code
A multitude of plugins are available. Choose one you see fit.<br>
E.g. [see https://marketplace.visualstudio.com/items?itemName=stevencl.addDocComments]  <br>
Use the Command Palette to utilize this plugin.

### Eclipse
The store does provide some plugins. <br>
[see https://marketplace.eclipse.org/search/site/jsdoc] to fit your needs.

### Other IDEs
If all else fails this mighty tool of migthyness is at your disposal:<br>
[see http://letmegooglethat.com/?q=jsdoc+my-cool-ide]

## Integration to GitHub
JSDoc pages can be generated manually by typing `$ jsdoc filename.js || dir` or can be generated upon commiting your changes to GitHub.<br>
To use this follow these steps:<br>
- Find the 'Actions' tab on your GitHub project
- Click 'New Workflow'
- Paste the following content into the file [see https://github.com/andstor/jsdoc-action] and [see https://github.com/peaceiris/actions-gh-pages]
```
# This is a basic workflow to help you get started with Actions

name: CI

# Controls when the action will run. Triggers the workflow on push or pull request
# events but only for the master branch
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2

      # Runs a single command using the runners shell
      - name: Run a one-line script
        run: echo Hello, world!

      # Runs a set of commands using the runners shell
      - name: Run a multi-line script
        run: |
          echo Add other actions to build,
          echo test, and deploy your project.
        
      - name: JSDoc Action
        # You may pin to the exact commit or the version.
        # uses: andstor/jsdoc-action@2fb2b536605bdebace2b92abb0601155d5ddc688
        uses: andstor/jsdoc-action@v1.2.0
        with:
          # Source directory to build documentation from
          source_dir: ./week3
          recurse: true
          # Output folder for the generated documentation
          output_dir: ./out

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```
- Find the 'Settings' tab on your repository
- Find the 'Options' menu (default)
- Find the Section 'GitHub Pages'
- Enable GitHub Pages
- Select Source Branch 'gh-pages' '/ (root)' and save
- Follow the link (e.g. https://pebesch.github.io/webcl-hs20-2/)
- Enjoy your documentation