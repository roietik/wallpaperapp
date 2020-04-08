export const removeItem = (id) => {
  return {
    type: 'REMOVE_ITEM',
    payload: id,
  };
};

export const addItem = (item) => {
  return {
    type: 'ADD_ITEM',
    payload: item,
  };
};

export const editItem = (item) => {
  return {
    type: 'EDIT_ITEM',
    payload: item,
  };
};

export const changeNotification = (notification) => {
  return {
    type: 'NOTIFICATION',
    payload: notification,
  };
};

export const getUnsplash = (unsplash) => {
  return {
    type: 'UNSPLASH',
    payload: unsplash,
  };
};

export const getSearch = (search) => {
  return {
    type: 'SEARCH',
    payload: search,
  };
};

export const getFavourite = (favourite) => {
  return {
    type: 'FAVOURITE',
    payload: favourite,
  };
};

export const delFavourite = (id) => {
  return {
    type: 'DEL_FAVOURITE',
    payload: id,
  };
};
