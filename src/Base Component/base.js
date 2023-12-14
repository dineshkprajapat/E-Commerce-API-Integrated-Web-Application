import CustomNavbar from "./Customnavbar";
import Footer from "./Footer";
const Base = ({ Title = "this is my title", children })=>{
    return(
        <div>
           <CustomNavbar/>

            {children}

            <Footer/>
        </div>
    )
}
export default Base;