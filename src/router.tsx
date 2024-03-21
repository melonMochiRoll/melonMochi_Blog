import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainPage from '@Pages/MainPage';
import PostPage from '@Pages/PostPage';

const MainRouter = createBrowserRouter([
    {
      path: '/',
      element: <MainPage />,
    },
    {
      path: 'post/:fileName',
      element: <PostPage />,
    },
]);

export default MainRouter;