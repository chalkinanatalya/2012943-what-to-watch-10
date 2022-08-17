import Logo from '../../components/logo/logo';
import LogSignBar from '../log-sign-bar/log-sign-bar';

function Header(): JSX.Element {
  return (
    <header className="page-header film-card__head">
      <div className="logo">
        <Logo />
      </div>
      <ul className="user-block">
        <LogSignBar />
      </ul>
    </header>
  );
}

export default Header;
