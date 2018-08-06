import {createActions} from "redux-actions";

const Actions = createActions(
    `DEBUG`,
    `ERROR`,
    `LOAD_QUESTIONS`,
    `QUESTIONS_LOADED`,
    `PLAY`,
    `TICK`,
    `GAME_END`,
    `ANSWER`,
    `LOAD_PLAYER_SCORES`,
    `RESULTS_LOADED`,
    `SHOW_MODAL`
);

export default Actions;
