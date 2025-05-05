import { lazy } from "react";

// Librarian Pages
const Books = lazy(() => import("../components/pages/librarianPages/BooksMgt"));
const LibrarianProfile = lazy(() =>
  import("../components/pages/librarianPages/ProfileMgt")
);
const Circulation = lazy(() =>
  import("../components/pages/librarianPages/Circulation")
);
const CheckPatronsForLibrarian = lazy(() =>
  import("../components/pages/librarianPages/PatronsMgt")
);
const Reports = lazy(() =>
  import("../components/pages/librarianPages/ReportsMgt")
);
const BookDetailForLibrarian = lazy(() =>
  import("../components/pages/librarianPages/BookDetail")
);

// Manager Pages
const Librarians = lazy(() =>
  import("../components/pages/managerPages/LibrariansMgt")
);
const CheckPatronsForManager = lazy(() =>
  import("../components/pages/managerPages/PatronsMgt")
);
const ReportsForManager = lazy(() =>
  import("../components/pages/managerPages/ReportsMgt")
);
const InLibraryBooks = lazy(() =>
  import("../components/pages/managerPages/InLibraryBooks")
);
const ManagerProfile = lazy(() =>
  import("../components/pages/managerPages/ProfileMgt")
);
const BookDetailForManager = lazy(() =>
  import("../components/pages/managerPages/BookDetail")
);
const RequestsMgt = lazy(() =>
  import("../components/pages/managerPages/RequestsMgt")
);
const SettingsMgt = lazy(() =>
  import("../components/pages/managerPages/SettingsMgt")
);

// Patron Pages
const PatronHomePage = lazy(() =>
  import("../components/pages/patronPages/PatronHomePage")
);
const BookDetailForPatron = lazy(() =>
  import("../components/pages/patronPages/BookDetail")
);
const CheckedoutBooks = lazy(() =>
  import("../components/pages/patronPages/CheckedoutBooks")
);
const Reservations = lazy(() =>
  import("../components/pages/patronPages/Reservations")
);
const PatronProfile = lazy(() =>
  import("../components/pages/patronPages/ManageProfile")
);
const Activities = lazy(() =>
  import("../components/pages/patronPages/Activities")
);
const BooksMgt = lazy(() => import("../components/pages/patronPages/BooksMgt"));
const DigitalBookDetail = lazy(() =>
  import("../components/pages/patronPages/DigitalBookDetail")
);
const BookViewer = lazy(() => import("../components/GeneralLayout/BookViewer"));
const Request = lazy(() => import("../components/pages/patronPages/Request"));

export const patronRouteChildren = [
  {
    index: true,
    element: <BooksMgt />,
  },
  {
    path: "home",
    element: <PatronHomePage />,
  },
  {
    path: "book-detail/:id",
    element: <DigitalBookDetail />,
  },
  {
    path: "read-book/:bookId",
    element: <BookViewer />,
  },
  {
    path: "book/:bookId",
    element: <BookDetailForPatron />,
  },
  {
    path: "profile",
    element: <PatronProfile />,
  },
  {
    path: "request",
    element: <Request />,
  },
  {
    path: "activities/",
    element: <Activities />,
    children: [
      { index: true, element: <CheckedoutBooks /> },
      { path: "reservations", element: <Reservations /> },
    ],
  },
];
export const librarianRouteChildren = [
  {
    index: true,
    element: <Circulation />,
  },
  {
    path: "patrons",
    element: <CheckPatronsForLibrarian />,
  },
  {
    path: "books",
    element: <Books />,
  },
  {
    path: "book/:bookId",
    element: <BookDetailForLibrarian />,
  },
  {
    path: "reports",
    element: <Reports />,
  },
  {
    path: "profile",
    element: <LibrarianProfile />,
  },
];
export const managerRouteChildren = [
  {
    index: true,
    element: <Librarians />,
  },
  {
    path: "patrons",
    element: <CheckPatronsForManager />,
  },
  {
    path: "book/:bookId",
    element: <BookDetailForManager />,
  },
  {
    path: "reports",
    element: <ReportsForManager />,
  },
  {
    path: "books",
    element: <InLibraryBooks />,
  },
  {
    path: "profile",
    element: <ManagerProfile />,
  },
  {
    path: "requests",
    element: <RequestsMgt />,
  },
  {
    path: "settings",
    element: <SettingsMgt />,
  },
];
