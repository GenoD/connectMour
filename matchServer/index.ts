import { Server, Socket } from "socket.io"

const io = new Server({
  cors: {
    origin: "http://localhost:3000"
  }
})

let interval:ReturnType<typeof setTimeout>

io.on("connection", (socket) => {
  console.log("New client connected")
  if (interval) {
    clearInterval(interval)
  }
  // interval = setInterval(() => getApiAndEmit(socket), 1000)
  getApiAndEmit(socket)
  socket.on("disconnect", () => {
    console.log("Client disconnected")
    clearInterval(interval)
  })
})

const getApiAndEmit = (socket:Socket) => {
  const response = new Date()
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response)
}

const add = function (num: number, num2: number):number {
  return num + num2
}


console.log('now listening!', add(1, 2))
io.listen(5000)