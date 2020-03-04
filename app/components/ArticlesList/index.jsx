import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { removeArticle, editArticle, undoDelete } from '../../actions';
import { DeleteIcon, EditIcon } from '../Icons';
import Article from '../Article';
import GridItem from '../ui/GridItem';
import GridContainer from '../ui/GridContainer';
import Spinner from '../ui/Spinner';
import Toast from '../ui/Toast';
import Button from '../ui/Button';

export class ArticlesList extends React.Component {
    constructor() {
        super();
        this.state = {
            deleteMode: false,
            editMode: false,
            deletedData: {},
        };
        this.timer = null;
    }

    restoreArticle = () => {
        const { deleteMode } = this.state;
        if (deleteMode) {
            this.timer = setTimeout(() => {
                this.setState({
                    deleteMode: false,
                });
            }, 3000);
        }
        return () => this.timer && clearTimeout(this.timer);
    };

    handleCancelCall = e => {
        const { undoDelete } = this.props;
        const { deletedData } = this.state;
        e.preventDefault();
        undoDelete(deletedData.rowId, deletedData.article, deletedData.index);
        this.setState(
            {
                deleteMode: false,
            },
            () => {
                return () => this.timer && clearTimeout(this.timer);
            },
        );
    };

    showModal = (e, rowId, article, index) => {
        e.preventDefault();
        clearTimeout(this.timer);
        const { removeArticle } = this.props;
        this.setState(
            {
                deleteMode: true,
                deletedData: {
                    rowId,
                    article,
                    index,
                },
            },
            () => {
                removeArticle(rowId, article.id, index);
                this.restoreArticle();
            },
        );
    };

    editTitle = (e, editId) => {
        e.preventDefault();
        this.setState({
            editMode: editId,
        });
    };

    handleSubmit = (e, title, id) => {
        e.preventDefault();
        const { editArticle } = this.props;

        this.setState(
            {
                editMode: null,
            },
            () => {
                editArticle(title, id);
            },
        );
    };

    render() {
        const { rows, view } = this.props;
        const { editMode, deleteMode, deletedData } = this.state;
        return rows ? (
            <div>
                {rows.map((row, i) => (
                    <Fragment key={row.id}>
                        <GridContainer view={view}>
                            {row.columns &&
                                row.columns.map((column, index) => (
                                    <GridItem
                                        view={view}
                                        key={column.id}
                                        width={column.width}>
                                        <Article
                                            view={view}
                                            handleSubmit={this.handleSubmit}
                                            editMode={editMode}
                                            column={column}
                                        />
                                        <ButtonGroup view={view}>
                                            <Button
                                                view="iconBtn"
                                                disabled={deleteMode}
                                                type="button"
                                                onClick={e => {
                                                    this.showModal(
                                                        e,
                                                        row.id,
                                                        column,
                                                        index,
                                                    );
                                                }}>
                                                <DeleteIcon />
                                            </Button>
                                            <Button
                                                view="iconBtn"
                                                onClick={e => {
                                                    this.editTitle(
                                                        e,
                                                        column.id,
                                                    );
                                                }}>
                                                <EditIcon />
                                            </Button>
                                        </ButtonGroup>
                                    </GridItem>
                                ))}
                        </GridContainer>

                        {deleteMode && deletedData.rowId === row.id ? (
                            <Toast undoChanges={this.handleCancelCall} />
                        ) : null}
                    </Fragment>
                ))}
            </div>
        ) : (
            <div>
                <Spinner />
            </div>
        );
    }
}

const ButtonGroup = styled.section`
    position: ${props => (props.view === 'full' ? 'absolute' : 'static')};
    top: 20px;
    left: 20px;
    z-index: 100;
`;

const mapStateToProps = state => ({
    rows: state.rows,
});

const mapDispatchToProps = dispatch => ({
    removeArticle: (rowId, articleId, index) =>
        dispatch(removeArticle(rowId, articleId, index)),
    editArticle: (title, id) => dispatch(editArticle(title, id)),
    undoDelete: (rowId, articleId, index) =>
        dispatch(undoDelete(rowId, articleId, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);
