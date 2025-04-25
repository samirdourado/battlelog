export interface LeaderboardInterface {    
    _etag: string,
    _items: Array<LeaderboarItemsInterface[]>,
    _metadata: Array<LeaderBoardMetaDataInterface[]>
}

export interface LeaderboarItemsInterface {
    userID: string,
    name: string,
    rank: string,
    tier: number,
    topRank: number,
    vstar: number,
    avatar: string,
    _etag: string
}

export interface LeaderBoardMetaDataInterface {
    limit: number,
    offset: number,
    total: number,
    hasNext: boolean
  }