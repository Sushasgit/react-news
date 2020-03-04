import uid from 'uid';
import {
    REMOVE_ARTICLE,
    FETCH_DATA,
    RESTORE_ARTICLE,
    EDIT_ARTICLE,
} from '../utils/constants';
import { insertByIndex } from '../utils/helpers';

function reducer(state = {}, action) {
    switch (action.type) {
        case FETCH_DATA:
            return {
                ...state,
                rows: action.payload.data.map(row => {
                    return {
                        ...row,
                        id: uid(10),
                        columns: row.columns.map(column => {
                            return {
                                ...column,
                                id: uid(10),
                            };
                        }),
                    };
                }),
            };

        case REMOVE_ARTICLE:
            return {
                ...state,
                rows: state.rows.map(row => ({
                    ...row,
                    columns: row.columns.filter(
                        item => item.id !== action.payload.articleId,
                    ),
                })),
            };

        case RESTORE_ARTICLE:
            return {
                ...state,
                rows: state.rows.map(row => {
                    if (row.id === action.payload.rowId) {
                        return {
                            ...row,
                            columns: insertByIndex(
                                row.columns,
                                action.payload.article,
                                action.payload.index,
                            ),
                        };
                    }
                    return row;
                }),
            };

        case EDIT_ARTICLE:
            return {
                ...state,
                rows: state.rows.map(row => ({
                    ...row,
                    columns: row.columns.map(column => {
                        if (column.id === action.payload.id) {
                            return {
                                ...column,
                                title: action.payload.title,
                            };
                        }
                        return column;
                    }),
                })),
            };

        default:
            return state;
    }
}

export default reducer;
