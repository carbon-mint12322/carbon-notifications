"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getISOTimestamp = void 0;
/** */
function getISOTimestamp(unix) {
    return unix ? (new Date(unix)).toISOString() : (new Date()).toISOString();
}
exports.getISOTimestamp = getISOTimestamp;
