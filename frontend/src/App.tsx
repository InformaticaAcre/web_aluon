import { Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import PortfolioPage from "./pages/PortfolioPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import ShopPage from "./pages/ShopPage";
import NotFoundPage from "./pages/NotFoundPage";
import CookiesPolicyPage from "./pages/CookiesPolicyPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import LegalNoticePage from "./pages/LegalNoticePage";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="servicios" element={<ProductsPage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="modelos" element={<Navigate to="/portfolio" replace />} />
        <Route path="venta-online" element={<ShopPage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="cookies" element={<CookiesPolicyPage />} />
        <Route path="privacidad" element={<PrivacyPolicyPage />} />
        <Route path="aviso-legal" element={<LegalNoticePage />} />
        <Route path="inicio" element={<Navigate to="/" replace />} />
        {/* Backward-compatible routes (mockup URLs) */}
        <Route path="home.html" element={<Navigate to="/" replace />} />
        <Route path="productos.html" element={<Navigate to="/servicios" replace />} />
        <Route path="portfolio.html" element={<Navigate to="/portfolio" replace />} />
        <Route path="contacto.html" element={<Navigate to="/contacto" replace />} />
        <Route path="venta-online.html" element={<Navigate to="/venta-online" replace />} />
        <Route path="login-registro.html" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
