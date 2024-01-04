"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFileNameFromDate = void 0;
function createFileNameFromDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
}
exports.createFileNameFromDate = createFileNameFromDate;
