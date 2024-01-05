"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.args = void 0;
// Default values in case the user doesn't pass in any arguments
const defaultArgs = {
    duration: 120,
    deviceName: 1,
    post: false,
};
// We can now use the args variable in our code to access the arguments passed in from the command line.
// We can also use the defaultArgs variable to set default values for our arguments.
exports.args = process.argv.slice(2).reduce((acc, arg) => {
    const [key, value] = arg.split('=');
    return {
        ...acc,
        [key]: value,
    };
}, defaultArgs);
