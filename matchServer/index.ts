import { Server, Socket } from "socket.io"
import MatchCache from "./utils/matchCache"
import MatchQueue from "./utils/matchQueue"

interface ServerToClientEvents {
  FromAPI: () => void
}

interface ClientToServer {
  playerMove: (moveInfo: {
    test: string
  }) => void
}

interface SocketData {
  userId: number
}

const io = new Server<ClientToServer, ServerToClientEvents, SocketData>({
  cors: {
    origin: "http://localhost:3000"
  }
})

let interval:ReturnType<typeof setTimeout>

const Queue = new MatchQueue();
const Matches = new MatchCache();

io.on("connection", (socket) => {1
  Queue.addPlayerToQueue({
    playerId: socket.handshake.query.userId as string,
    socketId: socket.id,
  })

  if (interval) {
    clearInterval(interval)
  }
  socket.on('playerMove', (moveInfo) => {
    console.log('player move sent', moveInfo.test)
  })
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

io.listen(5000)