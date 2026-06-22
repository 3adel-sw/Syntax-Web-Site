import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { LuLoaderCircle } from "react-icons/lu";
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

const PageLoader = () => (
  <div className="flex justify-center items-center min-h-screen">
    <LuLoaderCircle size={50} className="animate-spin text-primary" />
  </div>
);

const wrap = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    element: <LayoutSyntax />,
    children: [
      { path: "/", element: wrap(Home) },
      { path: "/blogs", element: wrap(Blogs) },
      { path: "/blogs-detail/:id", element: wrap(BlogsDetails) },
      { path: "/contact", element: wrap(Contact) },
      { path: "/courses", element: wrap(Courses) },
      { path: "/courses-detail/:id", element: wrap(DetailCourses) },
      { path: "/events", element: wrap(Events) },
      { path: "/events-detail/:id", element: wrap(EventsDetails) },
      { path: "/feedbacks", element: wrap(FeedBacks) },
      { path: "/b2b", element: wrap(B2BCollaboration) },
      { path: "/about", element: wrap(AboutUs) },
    ],
  },
  { path: "*", element: wrap(NotFound) },
]);