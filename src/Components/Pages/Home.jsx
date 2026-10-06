import Contact from "../Contact/Contact";
import Projects from "../Projects/Projects";
import Services from "../Services/Services";
import Skills from "../Skills/Skills";
import About from "./About";
import HeroSection from "./HeroSection";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <About></About>
      <Skills></Skills>
      <Projects></Projects>
      <Services></Services>
      <Contact></Contact>
    </div>
  );
};

export default Home;
