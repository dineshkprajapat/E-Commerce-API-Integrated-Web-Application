import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Addorder from "./AddOrder";
import Addtocart from "./AddToCart";
import CancelOrder from "./CancelOrder";
import Category from "./CategoryView";
import Changepassword from "./Changepassword";
import Details from "./Details";
import Editprofile from "./Editprofile";
import Feedback from "./FeedbackAdd";
import Forgot from "./Forgot";
import Home from "./Home";
import Login from "./Login";
import Loginotp from "./LoginOtp";
import OrderList from "./OrderList";


import Product1 from "./Product";
import Signup from "./Signup";
import SingleIdProduct from "./SingleidProduct";
import Subcategory from "./Subcategory";
import AddtoWishlist from "./WishlistGet";

function App(){
  return(
    <div>
     <Router>
     
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/CategoryView" element={<Category/>}/>
      <Route path="/Subcategory/:id" element={<Subcategory/>} />
      <Route path="/Product" element={<Product1/>} />
      <Route path="/SingleidProduct/:id" element={<SingleIdProduct/>} />
      <Route path="/Details/:id" element={<Details/>} />
      <Route path="/Signup" element={<Signup/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/AddToCart" element={<Addtocart/>} />
      <Route path="/WishlistGet" element={<AddtoWishlist/>}/>
      <Route path="/Editprofile" element={<Editprofile/>} />
      <Route path="/Changepassword" element={<Changepassword/>}  />
      <Route path="/Forgot" element={<Forgot/>} />
      <Route path="/LoginOtp" element={<Loginotp/>}/>
      <Route path="/AddOrder" element={<Addorder/>}/>
      <Route path="/OrderList" element={<OrderList/>}/>
      <Route path="/CancelOrder/:id" element={<CancelOrder/>} />
      <Route path="/FeedbackAdd" element={<Feedback/>}/>
      </Routes>
     </Router>
    </div>
  )
}
export default App;