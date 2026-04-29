import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { SiteContentProvider } from './context/SiteContentContext';
import { ThemeProvider } from './context/ThemeContext';

// Pages
import Landing from './pages/Landing';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import DemoLab from './pages/DemoLab';
import Team from './pages/Team';
import About from './pages/About';
import Admin from './pages/Admin';

// Layout

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <SiteContentProvider>
        <div className="app">
          <Navbar />
          <main>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
                <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
                <Route path="/projects/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
                <Route path="/demo-lab" element={<PageTransition><DemoLab /></PageTransition>} />
                <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </SiteContentProvider>
    </ThemeProvider>
  );
}

export default App;
