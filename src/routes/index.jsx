import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import LayoutSyntax from "@/components/layout/LayoutSyntax";

const Home = lazy(() => import("@/Pages/Home"));
const FeedBacks = lazy(() => import("@/Pages/FeedBacks/FeedBacks"));
const Blogs = lazy(() => import("@/Pages/Blogs/Blogs"));
const B2BCollaboration = lazy(() => import("@/Pages/B2B/B2BCollaboration"));
const BlogsDetails = lazy(() => import("@/Pages/Blogs/BlogsDetails"));
const Contact = lazy(() => import("@/Pages/Contact/Contact"));
const DetailCourses = lazy(() => import("@/Pages/DetailCourses/DetailCourses"));
const Courses = lazy(() => import("@/Pages/Courses/Courses"));
const Events = lazy(() => import("@/Pages/Events/Events"));
const EventsDetails = lazy(() => import("@/Pages/Events/EventsDetails"));
const AboutUs = lazy(() => import("@/Pages/AboutUs/AboutUs"));
const NotFound = lazy(() => import("@/Pages/NotFound"));

const Page = ({ Component }) => (
  <Suspense fallback={<div className="flex justify-center items-center min-h-screen" />}>
    <Component />
  </Suspense>
);



export const router = createBrowserRouter([
  // {
  //   element: <Home />,
  //   children: [
  //     {

  //       path: "/Home",
  //       element: <Home />,
  //     }
  //   ],
  // },
  {
    element: <LayoutSyntax />, // layout component
    children: [
      {
        path: "/",
        element: <Page Component={Home} />,
      },
      {
        path: "/blogs",
        element: <Page Component={Blogs} />,
      },
      {
        path: "/blogs-detail/:id",
        element: <Page Component={BlogsDetails} />,
      },
      {
        path: "/contact",
        element: <Page Component={Contact} />,
      },
      {
        path: "/courses",
        element: <Page Component={Courses} />,
      },
      {
        path: "/courses-detail/:id",
        element: <Page Component={DetailCourses} />,
      },
      {
        path: "/events",
        element: <Page Component={Events} />,
      },
      {
        path: "/events-detail/:id",
        element: <Page Component={EventsDetails} />,
      },
      {
        path: "/feedbacks",
        element: <Page Component={FeedBacks} />,
      },
      {
        path: "/b2b",
        element: <Page Component={B2BCollaboration} />,
      },
      {
        path: "/about",
        element: <Page Component={AboutUs} />,
      },
      
    ],
  },
  { path: "*", element: <Page Component={NotFound} /> },
]);