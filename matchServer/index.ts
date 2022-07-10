import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000"
  }
});

io.on("connection", (socket) => {
  console.log('a new connection has been establiedh!');
});

const add = function (num: number, num2: number):number {
  return num + num2
}


console.log('now listening!', add(1, 2))
io.listen(5000);