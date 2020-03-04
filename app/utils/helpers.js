export const insertByIndex = (state, newItem, insertAt) => [
    ...state.slice(0, insertAt),
    newItem,
    ...state.slice(insertAt),
];
