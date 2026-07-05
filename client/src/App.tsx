import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useEffect } from "react";
import { useLocation } from "wouter";

// Pages
import Home from "./pages/Home";
import Cards from "./pages/Cards";
import CardDetail from "./pages/CardDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Events from "./pages/Events";
import SacredSpaces from "./pages/SacredSpaces";
import Directory from "./pages/Directory";
import MoonCalendar from "./pages/MoonCalendar";
import CrystalGuide from "./pages/CrystalGuide";
import Spreads from "./pages/Spreads";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

// Layout
import Layout from "./components/Layout";
import CanonicalTag from "./components/CanonicalTag";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <CanonicalTag />
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/cards" component={Cards} />
          <Route path="/cards/:slug" component={CardDetail} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/events" component={Events} />
          <Route path="/sacred-spaces" component={SacredSpaces} />
          <Route path="/directory" component={Directory} />
          <Route path="/moon-calendar" component={MoonCalendar} />
          <Route path="/crystal-guide" component={CrystalGuide} />
          <Route path="/crystals">{() => <Redirect to="/crystal-guide" />}</Route>
          <Route path="/spreads" component={Spreads} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
