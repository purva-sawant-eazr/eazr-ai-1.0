// import HomePage from "@/templates/HomePage";
import Navbar from "@/components/Navbar";
import SearchBox from "@/components/Searchbox";
import Footer from "@/components/Footer";

export default function Page() {

    
    return (
        <>
            <Navbar />
            <SearchBox />
            <div className="max-sm:hidden">
                <Footer/>
            </div>
        {/* <HomePage /> */}
      </>
    );
    
}
