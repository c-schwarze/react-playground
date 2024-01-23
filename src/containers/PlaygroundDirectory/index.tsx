import React, { lazy, Suspense } from 'react';

// TODO - play around with MUI
const PlaygroundDirectory = () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const componentToRender = queryParameters.get("component");
    // TODO - pull this out to a method
    const LoadedComponent = componentToRender && componentToRender?.length > 1 && lazy(() => import(`../${componentToRender.charAt(0).toUpperCase() + componentToRender.slice(1).toLowerCase()}`));

    return (
        <>
            <ul>
                <li><a href='.?component=carousel'>Carousel</a></li>
            </ul>

            <Suspense fallback="LOADING!"> 
                <h2>Preview</h2>
                { 
                    LoadedComponent && <LoadedComponent />
                }
            </Suspense>
        </>
    )
}

export default PlaygroundDirectory;