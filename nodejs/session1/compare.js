// These properties are available only in the Node.js environment.
console.log("Node version:", process.version);
console.log("Platform:", process.platform);

// Uncomment the line below to see what happens.
// It will throw an error because 'document' is only available in a browser.

// console.log(document.querySelector("h1"));

/*
Things Node.js can do:
1. Read and write files on the computer.
2. Access system information like the operating system and Node version.
3. Build backend applications and web servers.

One thing browser JavaScript can do that Node.js cannot:
- It can access and change HTML elements using the DOM (document object).
*/


//Task 1.2
/*
PS C:\Users\M. Mohamed Al Favaj\OneDrive\Desktop\Java-Script-Training\nodejs\session1> node
Welcome to Node.js v24.12.0.
Type ".help" for more information.
>  10 * 5
50
> "hello".toUpperCase()
'HELLO'
> [1, 2, 3].filter(n => n > 1)
[ 2, 3 ]
> typeof "hello"
'string'
> typeof 42
'number'
> .exit
*/

// REPL stands for Read-Eval-Print Loop.
// I use it to test small pieces of JavaScript code instantly
// before writing them in my actual program.