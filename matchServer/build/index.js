"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server({ /* options */});
io.on("connection", (socket) => {
    // ....
});
io.listen(3000);
