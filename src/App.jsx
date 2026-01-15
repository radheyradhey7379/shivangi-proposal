import React, { useState } from 'react';
import PasscodePage from './components/PasscodePage';
import SceneController from './components/SceneController';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleUnlock = () => {
        setIsAuthenticated(true);
    };

    return (
        <>
            {!isAuthenticated ? (
                <PasscodePage onUnlock={handleUnlock} />
            ) : (
                <SceneController />
            )}
        </>
    );
}

export default App;

