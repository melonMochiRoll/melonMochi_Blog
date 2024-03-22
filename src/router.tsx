import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainPage from '@Pages/MainPage';
import PostPage from '@Pages/PostPage';
import NotFoundPage from '@Pages/NotFoundPage';

const MainRouter = createBrowserRouter([
    {
      path: '/',
      element: <MainPage />,
    },
    {
      path: 'post/:fileName',
      element: <PostPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
]);

export default MainRouter;