import Navbar from "./Navbar";
import SeccionHero from "./SeccionHero";
import SeccionAprendizaje from "./SeccionAprendizaje";
import Footer from "../componentes/Footer";

function Inicio() {
  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      <Navbar />
      <SeccionHero />
      <SeccionAprendizaje />
      <Footer />
    </div>
  );
}

export default Inicio;