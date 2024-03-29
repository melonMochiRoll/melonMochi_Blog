import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainPage from '@Pages/MainPage';
import PostsPage from '@Pages/PostsPage';
import PostPage from '@Pages/PostPage';
import NotFoundPage from '@Pages/NotFoundPage';

const MainRouter = createBrowserRouter([
    {
      path: '/',
      element: <MainPage />,
    },
    {
      path: '/posts',
      element: <PostsPage />
    },
    {
      path: '/:fileName',
      element: <PostPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
]);

export default MainRouter;