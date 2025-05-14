import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import NotesList from '../components/ShowNotesList/NotesList';
import NoteDetail from '../components/ShowNoteDetail/NoteDetail';
import CreateNote from '../components/CreateNote/CreateNote';
import SearchResult from '../components/ShowNotesList/SearchResult';
import CategoryNotes from '../components/ShowNotesList/CategoryResult'
import NoteStats from '../components/ShowNoteStates/ShowNoteStates';
import UserSocketList from '../components/userList/userList';
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
        path: "/testwebsocket",
        element: <UserSocketList />,
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

      {
        path: "/notes/search/results", 
        element: <SearchResult />, 
      },
      {
        path: "/category/:category",
        element: <CategoryNotes />, 
      },
      {
        path: "/states",
        element: <NoteStats />, 
      },
    ],
  },
]);