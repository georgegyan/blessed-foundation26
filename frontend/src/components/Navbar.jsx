import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const linkClasses = (path) => {
    return `px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
      isActive(path) 
        ? 'bg-primary-100 text-primary-700' 
        : 'text-gray-700 hover:bg-gray-100'
    }`;
  };
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary-600">Blessed Foundation</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className={linkClasses('/')}>
              Home
            </Link>
            <Link to="/join-us" className={linkClasses('/join-us')}>
              Join Us
            </Link>
            <Link to="/donate" className={linkClasses('/donate')}>
              Donate
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;