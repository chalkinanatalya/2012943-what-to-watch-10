import Footer from '../../components/footer/footer';
import FormLogin from '../../components/form-login/form-login';
import Header from '../../components/header/header';

function SignIn(): JSX.Element {

  return (
    <div className="user-page">
      <Header page={'Sign in'} />

      <div className="sign-in user-page__content">
        <FormLogin />
      </div>

      <Footer />
    </div>
  );
}

export default SignIn;
