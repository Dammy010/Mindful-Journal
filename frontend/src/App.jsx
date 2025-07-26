import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AddEntryPage from './pages/AddEntryPage';
import ViewEntryPage from './pages/ViewEntryPage';
import EditEntryPage from './pages/EditEntryPage';
import { useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';



export default function App() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FaqPage />} />

          <Route path="/dashboard" element={user ? <DashboardPage /> : <LoginPage />} />
          <Route path="/add" element={user ? <AddEntryPage /> : <LoginPage />} />
          <Route path="/entry/:id" element={user ? <ViewEntryPage /> : <LoginPage />} />
          <Route path="/edit/:id" element={user ? <EditEntryPage /> : <LoginPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
