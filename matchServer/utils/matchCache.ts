interface MatchOptions {
    matchId: number,
    playerOneId: number,
    playerOneSocketId: string,
    playerTwoId: number,
    playerTwoSocketId: string,
}

interface Matches {
    [key: number]: {
        playerOneId: number,
        playerOneSocketId: string,
        playerTwoId: number,
        playerTwoSocketId: string,
        created_at: Date,
    }
}

class MatchCache {
    cache = {} as Matches;

    get matches() {
        return this.cache;
    }

    addMatch(matchInfo: MatchOptions) {
        const {
            matchId,
            playerOneId,
            playerOneSocketId,
            playerTwoId,
            playerTwoSocketId,
        } = matchInfo;

        this.cache[matchId] = {
            playerOneId,
            playerOneSocketId,
            playerTwoId,
            playerTwoSocketId,
            created_at: new Date()
        }
    }
}

export default MatchCache;