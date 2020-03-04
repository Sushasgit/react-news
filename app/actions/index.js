import {
    EDIT_ARTICLE,
    REMOVE_ARTICLE,
    FETCH_DATA,
    RESTORE_ARTICLE,
} from '../utils/constants';

export const fetchData = data => ({
    type: FETCH_DATA,
    payload: {
        data,
    },
});

export const editArticle = (title, id) => ({
    type: EDIT_ARTICLE,
    payload: {
        title,
        id,
    },
});

export const removeArticle = (rowId, articleId) => ({
    type: REMOVE_ARTICLE,
    payload: {
        rowId,
        articleId,
    },
});

export const undoDelete = (rowId, article, index) => ({
    type: RESTORE_ARTICLE,
    payload: {
        rowId,
        article,
        index,
    },
});
