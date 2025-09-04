function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-indigo-700 text-white shadow-inner z-50 py-4">
      <div className="w-full px-6 md:px-10">
      
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4">
          
          <p className="text-sm text-indigo-100 text-center md:text-left">
            Your favorite movie collection in one place.
          </p>

        
          <div className="text-xs text-indigo-100 text-center">
            © {new Date().getFullYear()} Movies App. All rights reserved.
          </div>

          <a
            href="https://github.com/lampros99"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-100 hover:text-indigo-100 transition text-center md:text-right"
          >
            github.com/lampros99
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
