export interface NewTValueSchema {
  value: number,
  board: string
}

export interface UpdateTValueSchema {
  id: string,
  value: number,
  board: string
}

export interface NewBoardSchema {
  board: string
}

export interface UpdateBoardSchema {
  id: string,
  board: string,
}
