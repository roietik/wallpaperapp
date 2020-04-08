import GetDate from 'components/helpers/GetDate';

const rootReducer = (state = { weather: GetDate() }, { type, payload }) => {
  switch (type) {
    case 'REMOVE_ITEM':
      return {
        ...state,
        data: [
          ...state.data.filter((item) => {
            return item.id !== payload;
          }),
        ],
      };
    case 'ADD_ITEM':
      return {
        ...state,
        data: [...state.data, { id: state.data.length, ...payload }],
      };
    case 'EDIT_ITEM':
      return {
        ...state,
        data: [...state.data.map((item, idx) => (idx === payload.id ? payload : item))],
      };
    case 'NOTIFICATION':
      return {
        ...state,
        notification: payload,
      };
    case 'UNSPLASH':
      return {
        ...state,
        unsplash: payload.results,
      };

    case 'SEARCH':
      return {
        ...state,
        search: payload,
      };

    case 'FAVOURITE':
      return {
        ...state,
        favourite: state.favourite
          ? [...state.favourite.filter((ev) => ev !== payload), payload]
          : [payload],
      };

    case 'DEL_FAVOURITE':
      return {
        ...state,
        favourite: state.favourite.filter((_, idx) => idx !== payload),
      };

    default:
      return state;
  }
};

export default rootReducer;
