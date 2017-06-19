import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Home from './components/Home';

const MainRouter = () => {
    return (
        <Router>
            <Scene
            title="SwipeDeck"
            key="Home"
            component={Home}
            >
            </Scene>
        </Router>
    )
}

export default MainRouter;