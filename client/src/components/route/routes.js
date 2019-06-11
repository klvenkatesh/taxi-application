import { HashRouter, Route, Switch } from "react-router-dom";
import React from "react";

import SingleArticle from '../article/single-article';
import Home from '../home/home';
export default class Routes extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" component={Home} />
                    <Route path="article/:type/:year/:month/:day/:name" component={SingleArticle} />
                </Switch>
            </HashRouter>
        );
    }
}
