import { FormEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setLoginError } from '../../store/action';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';

const setErrorMarkup = (loginError: string) => {
  if (loginError !== '') {
    return (
      <div className="sign-in__message">
        <p>{loginError}</p>
      </div>
    );
  } else {
    return null;
  }
};

function FormLogin(): JSX.Element {
  const dispatch = useAppDispatch();
  const { loginError } = useAppSelector((state) => state);

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      if (passwordRef.current.value !== '' && passwordRef.current.value.indexOf(' ') === -1) {
        onSubmit({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        });
      } else {
        dispatch(setLoginError('Please enter a valid password'));
      }
    }
  };

  return (
    <form action="" className="sign-in__form" onSubmit={handleSubmit}>
      {setErrorMarkup(loginError)}
      <div className="sign-in__fields">
        <div className="sign-in__field">
          <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" ref={loginRef} />
          <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
        </div>
        <div className="sign-in__field">
          <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" ref={passwordRef} />
          <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
        </div>
      </div>
      <div className="sign-in__submit">
        <button className="sign-in__btn" type="submit">Sign in</button>
      </div>
    </form>
  );
}

export default FormLogin;
