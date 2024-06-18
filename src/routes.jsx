import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import AllPosts from './AllPosts';
import Post from './Post';
// import Error from './Error';
const routes = [
    {
        element: <App />,
        children: [
            {
                path: "/posts",
                element: <AllPosts />,
            },
            {
                path: "/posts/:postId",
                element: <Post />
            }
        ]
    },

];

export default routes;
