import Footer from "./pages/Footer";
import Header from "./pages/Header";
import Body from "./pages/Body";

function App() {
  return (
    <div className="min-h-screen  bg-cover bg-[#EAEFEF] flex flex-col px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
      <div>
        <Header className="h-[10vh]" />
      </div>
      <div className="h-[77vh] overflow-auto border-l border-r border-[#B8CFCE]">
        <Body />
      </div>
      <div className="h-[10vh] overflow-auto">
        <Footer />
      </div>
    </div>
  );
}

export default App;
