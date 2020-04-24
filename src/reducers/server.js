const initialState = {
  inGame: false,
  currentServer: '',
  loading: true,
};

export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
    default:
      return state;
  }
}
