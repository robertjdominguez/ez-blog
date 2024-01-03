"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateString = void 0;
// helper function to create a simple string date like "2020-01-01"
function getDateString(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
exports.getDateString = getDateString;
