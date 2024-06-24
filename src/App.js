import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import Services from "./components/services/Services";
import About from "./components/about/About";
import EmployeeMap from "./components/employee/EmployeeMap";
import UniversitiesMap from "./components/universities/UniversitiesMap";
import StudentsMap from "./components/students/StudentsMap";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/employee",
    element: <EmployeeMap />,
  },
  {
    path: "/universities",
    element: <UniversitiesMap />,
  },
  {
    path: "/students",
    element: <StudentsMap />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
