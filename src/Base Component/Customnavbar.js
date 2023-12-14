import { NavLink as ReactLink } from "react-router-dom";
import "./demo.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
const CustomNavbar= ()=>{
 
  return(
    <div>
      <Navbar
      className="navbar"
      color='dark'
      expand='md'
      fixed=''
      dark="true"
      >
   
       <Nav navbar style={{marginLeft:"22px",textAlign:"center"}}>
        <NavItem>
        <NavLink className="navbarbrand" tag={ReactLink} to="/"> Home </NavLink>
          </NavItem>
          </Nav>     
        <NavbarToggler />
        <Collapse  navbar>
          <Nav  className="navv" navbar >
            <NavItem className="navitem">
              <NavLink className='link' tag={ReactLink} to="/CategoryView"> Category </NavLink>
            </NavItem>
            <NavItem className="navitem">
              <NavLink className='link' tag={ReactLink} to="/Product"> Product </NavLink>
            </NavItem>
            <NavItem  className="navitem" >
              <NavLink className='link'tag={ReactLink} to="/Signup">
                Sign Up
              </NavLink>
            </NavItem>
            <NavItem  className="navitem">
              <NavLink className='link'tag={ReactLink} to="/Login">
                Login
              </NavLink>
              </NavItem>
              <NavItem className="navitem">
              <NavLink className='link' tag={ReactLink} to="/AddToCart"> Cart </NavLink>
            </NavItem>
            <NavItem className="navitem">
              <NavLink className='link' tag={ReactLink} to="/WishlistGet"> WishList </NavLink>
            </NavItem>
            <UncontrolledDropdown  nav inNavbar>
              <DropdownToggle className='linkk' nav caret>
                More
              </DropdownToggle>
              <DropdownMenu className="dropmenu" right>
                <DropdownItem className="dropitem">Conatct</DropdownItem>
                <DropdownItem className="dropitem">Email</DropdownItem>
                <DropdownItem divider />
                <DropdownItem className="dropitem" tag={ReactLink} to="/Editprofile">Edit Profile </DropdownItem>
                <DropdownItem className="dropitem" tag={ReactLink} to="/Changepassword">Change Password </DropdownItem>
                <DropdownItem className="dropitem" tag={ReactLink} to="/login">Log Out</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem className="navitem">
              <NavLink className='link' tag={ReactLink} to="/FeedbackAdd"> Feedback </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
  
}

export default CustomNavbar;