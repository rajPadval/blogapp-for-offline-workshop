import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="py-3 flex justify-center items-center font-bold text-lg gap-10  shadow-md">
      <Link to="/" className="hover:text-gray-500">
        Home
      </Link>
      <Link to="/create" className="hover:text-gray-500 ">
        Create
      </Link>
    </nav>
  );
};

export default Navbar;
