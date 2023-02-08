import { ReactComponent as Logo } from "../assets/img/logo.svg";
import { ReactComponent as Home } from "../assets/img/home.svg";
import { ReactComponent as Messages } from "../assets/img/messaging-round.svg";
import { ReactComponent as Notification } from "../assets/img/notification.svg";

const Header = () => {
  return (
    <div className='header'>
      <div className='left'>
        <Logo />
        <input placeholder='search' />
      </div>
      <div className='right'>
        <p>
          <Home /> Home
        </p>
        <p>
          <Messages />
          Messaging
        </p>
        <p>
          <Notification />
          Notification
        </p>
      </div>
    </div>
  );
};

export default Header;
