const Footer = () => {
    return (
      <div className="bg-pink-600 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Us */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">About Us</h3>
              <p className="text-sm">
                MyLifepair is a leading matrimony platform, dedicated to helping individuals find their life partner with ease and trust. Our platform connects people across communities, providing a safe space for their life-changing journey.
              </p>
            </div>
  
            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="text-sm space-y-2">
                <li><a href="/about" className="hover:text-gray-200">About</a></li>
                <li><a href="/contact" className="hover:text-gray-200">Contact</a></li>
                <li><a href="/terms" className="hover:text-gray-200">Terms & Conditions</a></li>
                <li><a href="/privacy" className="hover:text-gray-200">Privacy Policy</a></li>
              </ul>
            </div>
  
            {/* Contact Us */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <ul className="text-sm space-y-2">
                <li>Email: <a href="mailto:support@mylifepair.com" className="hover:text-gray-200">support@mylifepair.com</a></li>
                <li>Phone: +1 (800) 123-4567</li>
                <li>Address: 123 Matrimony Street, City, Country</li>
              </ul>
            </div>
  
            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" className="hover:text-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M22 12l-5.2 4v4H13v-4h-2V8h2V5.3c0-3 1.8-4.8 4.8-4.8 1.4 0 2.7.1 3.2.2V6h-2.3c-1 0-1.3.5-1.3 1.3v2.3h3.6l-.4 3h-3.2v4h5.4l.4-3H22z"/></svg>
                </a>
                <a href="https://twitter.com" className="hover:text-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M22.46 6c-.77.35-1.6.58-2.48.68.89-.53 1.56-1.36 1.88-2.36-.83.49-1.75.85-2.73 1.04-.78-.83-1.88-1.35-3.09-1.35-2.35 0-4.26 1.91-4.26 4.26 0 .33.03.65.09.96C8.79 9.42 6.6 8.02 4.91 6.26c-.33.56-.52 1.21-.52 1.91 0 1.32.67 2.47 1.67 3.15-.61-.02-1.19-.19-1.7-.48v.05c0 1.83 1.31 3.37 3.04 3.72-.32.09-.66.14-1.01.14-.25 0-.49-.02-.73-.07.49 1.53 1.94 2.64 3.64 2.67-1.34 1.05-3.03 1.68-4.86 1.68-.31 0-.62-.02-.93-.06 1.71 1.1 3.74 1.74 5.91 1.74 7.1 0 11.01-5.89 11.01-11 0-.17-.01-.34-.02-.51C21.2 7.46 21.89 6.8 22.46 6z"/></svg>
                </a>
                <a href="https://instagram.com" className="hover:text-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M16 2h-8C7.4 2 6 3.4 6 5v14c0 1.6 1.4 3 3 3h8c1.6 0 3-1.4 3-3V5c0-1.6-1.4-3-3-3zM8 4h8c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H8c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1zm4 3c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm0 4c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
  
        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          <p>&copy; 2025 MyLifepair. All Rights Reserved.</p>
        </div>
      </div>
    );
  };
  
  export default Footer;
  