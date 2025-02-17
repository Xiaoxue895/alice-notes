import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import NotesList from '../components/ShowNotesList/NotesList';
import NoteDetail from '../components/ShowNoteDetail/NoteDetail';
import CreateNote from '../components/CreateNote/CreateNote';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <NotesList />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/notes/:id",
        element: <NoteDetail />,
      },
      {
        path: "/notes/create",
        element: <CreateNote />,
      },

    ],
  },
]);