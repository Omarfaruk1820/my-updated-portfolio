import Projects from "../Projects/Projects";
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
    </div>
  );
};

export default Home;
