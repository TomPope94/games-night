const initialState = {
  loading: false,
  gameStarted: false,
  gameRound: -1,
  roundStarted: false,
  roundComplete: false,
  gameState: 'setup',
  yourTurn: false,
  gameQuestion: '',
  gameOptions: [],
  players: [],
  matchups: [],
  pastMatchups: [],
  gameData: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
}
