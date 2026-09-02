import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { BuildBar } from "@/components/layout/BuildBar";
import { Home } from "@/pages/Home";
import { Join } from "@/pages/Join";
import { Run } from "@/pages/Run";
import { Results } from "@/pages/Results";
import { Teacher } from "@/pages/Teacher";
import { NotFound } from "@/pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
        <div className="flex min-h-dvh flex-col">
          <Nav />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/join" element={<Join />} />
              <Route path="/run" element={<Run />} />
              <Route path="/results" element={<Results />} />
              <Route path="/teacher" element={<Teacher />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <BuildBar />
        </div>
    </BrowserRouter>
  );
}
