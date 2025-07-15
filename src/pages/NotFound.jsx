import RecycleMateFooter from "../components/Footer";
import RecycleMateNavbar from "../components/Navbar";
import notFoundImage from "../assets/notfound.png"
import { Link } from "react-router";

export default function NotFound(){
 
    return(
<>
<RecycleMateNavbar/>
<section className="min-h-screen flex flex-col justify-center items-center space-y-6 px-4">
    <div>
        <img src={notFoundImage} alt="Notfound" className="mx-auto" />
    </div>
    <h1 className="text-black font-bold text-3xl text-center p-2">Oops! Page Not Found</h1>
    <h2 className="text-center p-2 text-gray-500">Looks like you're trying to clean up something that <br/> doesn't exist. Don't worry, we'll help you find your <br/> way back!</h2>

<div className="flex justify-center">
    <Link to={'/'} className="bg-teal-500 text-white px-6 py-2 rounded-xl hover:bg-amber-600">
        Back to homepage
    </Link>
</div>

</section>
<RecycleMateFooter/>
</>

    );
}
