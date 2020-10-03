// stand-in for an asynchronous service

export { fortuneService }

/**
 * Array of strings that represent possible To-Do's
 * @type {string[]} possible To-Do items
 * @see {@link https://github.com/getify/You-Dont-Know-JS} for the free version of You-dont-know-JS
 */
const fortunes = [
    "Do the WebPr Homework",
    "Care for the JavaScript Toolbox",
    "Watch the recommended videos",
    "Read the recommended chapters in You-dont-know-JS",
    "Do the dataflow excel challenge!"
];

/**
 * Method simulates asynchronous behaviour to deliver a random fortune
 * @param whenDone callback function that executes when timeout completed 
 */
function fortuneService(whenDone) {
    setTimeout(
        () => whenDone(fortunes[Math.floor((Math.random() * fortunes.length))]),
        Math.floor((Math.random() * 3000))
    );
}