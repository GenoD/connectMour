interface playerInfo {
  playerId: string,
  socketId: string,
}

class MatchQueue {
  players: playerInfo[] = []
  queuedPlayers: Record<string, string> = {}

  get queue() {
    return this.players
  }

  playerAlreadyInQueue(playerInfo: playerInfo) {
    return this.queuedPlayers[playerInfo.playerId] !== undefined;
  }

  addPlayerToQueue(playerInfo: playerInfo) {
    console.log('attempting to add player', playerInfo)
    if (this.playerAlreadyInQueue(playerInfo)) {
      console.log('player already in queue', this.queuedPlayers);
      return;
    }
    this.players.push(playerInfo);
    this.queuedPlayers[playerInfo.playerId] = playerInfo.socketId;
    console.log('Successfully added player to the queue!!!', this.players)
  }
}

export default MatchQueue