import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Nav from "./components/Nav/Nav";
import Work from "./components/Work/Work";
import About from "./components/About/About";
import Cv from "./components/Cv/Cv";
import Notes from "./components/Notes/Notes";
import Contact from "./components/Contact/Contact";
import Available from "./components/Available/Available";
import NotFound from "./components/NotFound/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Nav />

      <main id="main" className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Work />
                <About />
                <Cv />
                <Notes />
                <Contact />
                <Available />
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* ✅ Vercel Analytics – mount once */}
      <Analytics />
    </BrowserRouter>
  );
}
