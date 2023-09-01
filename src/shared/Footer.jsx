const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer bg-base-100 footer-center py-5">
      <div>
        <p>Copyright © {year} - All right reserved by Chat Ripple</p>
      </div>
    </footer>
  );
};

export default Footer;
