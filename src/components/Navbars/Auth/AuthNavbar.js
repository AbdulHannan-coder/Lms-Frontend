
import { Link } from "react-router-dom";
import ArgonWhite from "../../../assets/img/brand/argon-react-white.png";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

const AdminNavbar = () => {
  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img
              alt="..."
              src={ArgonWhite}
            />
          </NavbarBrand>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
