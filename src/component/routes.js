import React from "react";
import { Route, Switch } from "react-router-dom";
import { HomeView, GameView, ResponseView, NotFound } from './component';

const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomeView} />
                <Route path="/game-view" component={GameView} />
                <Route path="/response-view" component={ResponseView} />
                <Route component={NotFound} />
            </Switch>
        </div>
    )
}

export default Routes