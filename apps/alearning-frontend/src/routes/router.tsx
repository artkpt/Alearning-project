import { createBrowserRouter, redirect } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { NoteListPage } from "./notes/pages/NoteListPage";
import { NoteDetailPage } from "./notes/pages/NoteDetailPage";
import { NoteFormPage } from "./notes/pages/NoteFormPage";
import {
  createNoteAction,
  deleteNoteFetcher,
  getNoteByIdLoader,
  getNotesLoader,
  noteAction,
} from "./notes/loaderAction";
import { LoginPage } from "./login/pages/LoginPage";
import { login } from "./login/loginAction";
import { rootLoader } from "../features/auth/rootLoader";
import { adminLoader } from "../features/auth/adminLoader";
import { AdminPage } from "./admin/AdminPage";
import Page from "./home/page";

export const router =
  createBrowserRouter([
    {
      path: "/",
      Component: MainLayout,
      loader: rootLoader,

      children: [
        {
          index: true,
          Component:
                Page,
        },
        // NOTES
        {
          path: "notes",

          children: [
            {
              index: true,
              loader: getNotesLoader,
              action:
                createNoteAction,
              Component:
                NoteListPage,
            },

            {
              path: ":id",
              loader:
                getNoteByIdLoader,
              action: noteAction,
              Component:
                NoteDetailPage,
            },

            {
              path: "create",
              Component:
                NoteFormPage,
            },

            {
              path: ":id/edit",
              loader:
                getNoteByIdLoader,
              Component:
                NoteFormPage,
            },
          ],
        },

        // ADMIN
        {
          path: "admin",
          loader: adminLoader,

          children: [
            {
              index: true,
              Component:
                AdminPage,
            },

            // {
            //   path: "users",
            //   Component:
            //     AdminUsersPage,
            // },

            // {
            //   path: "settings",
            //   Component:
            //     AdminSettingsPage,
            // },
          ],
        },
      ],
    },

    {
      path: "/login",
      Component: LoginPage,
      // action: login
    },
  ]);
