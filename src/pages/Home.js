import React from "react";
import { Helmet } from "react-helmet";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Custom Page Title</title>
                <meta
                    name="description"
                    content="This is the custom page description"
                />
                <meta property="og:title" content="Custom Page Title" />
                <meta
                    property="og:description"
                    content="This is the custom page description"
                />
                <meta
                    property="og:image"
                    content="https://placehold.co/600x400"
                />
                <meta
                    property="twitter:title"
                    content="Custom twitter Page Title"
                />
                <meta
                    property="twitter:description"
                    content="Custom twitter Page description"
                />
                <meta
                    property="twitter:image"
                    content="https://placehold.co/600x400"
                />
            </Helmet>
            <div>
                <h1>This is the home page</h1>
            </div>
        </div>
    );
};

export default Home;
