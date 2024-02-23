// HomePage.js
import Logo from '../assets/tresorologo.svg'; // Replace with your logo file
import '../style/Home.css'; // Import the CSS file for the HomePage

const HomePage = () => {
  return (
    <div className="home-page-content">
      <img className="home-image" src={Logo} alt="Logo" />
      <p>
        📁 Securely store your important documents with a touch of personal flair! 📁
      </p>
      <p>
        Have a laugh while keeping your documents organized and accessible. Because who said document storage can't be fun?
      </p>
      <p>
        Use the buttons in the app bar to manage your personal files and navigate this digital treasure trove.
      </p>
    </div>
  );

};

export default HomePage;
