// App.js
import '../style/AppBar.css'; // Import your CSS file
import profil from '../assets/profil.png';

const AppBar = () => {
  const buttons = ['Home', 'Upload', 'Download']; // Add your dynamic buttons
  const userPhotoUrl = profil; // Replace with your photo URL

  return (
    <div className="app-bar">
      <div className="button-container">
        {buttons.map((button, index) => (
          <a key={index} href={button}>
            <button className="appbar-button" key={index}>{button}</button>
          </a>

        ))}
      </div>
      <div className="circle-photo">
        <img src={userPhotoUrl} alt="User" />
      </div>
    </div>
  );
};

export default AppBar;
