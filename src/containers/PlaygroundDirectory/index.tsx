import React, { lazy, Suspense } from 'react';

import './styles.css';

// TODO - play around with MUI
const PlaygroundDirectory = () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const componentToRender = queryParameters.get("component");
    // TODO - pull this out to a method
    const LoadedComponent = componentToRender && componentToRender?.length > 1 && lazy(() => import(`../${componentToRender.charAt(0).toUpperCase() + componentToRender.slice(1).toLowerCase()}`));

    return (
        <>
            <h1>React Playground</h1>
            <ul>
                <li><a href='.?component=carousel'>Carousel</a></li>
                <li><a href='.?component=connect4'>Connect 4</a></li>
                <li><a href='.?component=sudoku'>Sudoku</a></li>
                <li><a href='.?component=weather'>Weather</a></li>
            </ul>

            <Suspense fallback="LOADING!"> 
                { 
                    LoadedComponent && (
                        <div>
                            <h2 className='title'>{componentToRender}</h2>
                            <hr />
                            <LoadedComponent />
                        </div>
                    )
                }
            </Suspense>
        </>
    )
}

export default PlaygroundDirectory;