import React from 'react';
import RulePage from './RulePage/rulePage';
import GamePage from './GamePage/gamePage';
import ResponsePage from './ResponsePage/responsePage';
import PageNotFound from './NotFound/PageNotFound';

const HomeView = () => {
    return <RulePage />
}

const GameView = () => {
    return <GamePage />
}

const ResponseView = (props) => {
    return <ResponsePage {...props} />
}

const NotFound = () => {
    return <PageNotFound />
}

export { HomeView, GameView, ResponseView, NotFound }