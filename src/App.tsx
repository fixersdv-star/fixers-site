import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import WorkPage from './pages/WorkPage';
import ProcessPage from './pages/ProcessPage';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/work" element={<WorkPage />} />
      <Route path="/process" element={<ProcessPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}
