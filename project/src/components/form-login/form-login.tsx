import { FormEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { getLoginError } from '../../store/user-store/selector';
import { setLoginError } from '../../store/user-store/user-store';
import { AuthData } from '../../types/auth-data';

const setErrorMarkup = (loginError: string): JSX.Element | null => {
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
  const loginError = useAppSelector(getLoginError);

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (authData: AuthData): void => {
    dispatch(loginAction(authData));
  };

  const signInValidator = (email: string, password: string): string | null => {
    const isEmailValid = /^\S+@\S+\.\S+$/.test(email);
    const isPasswordValid = /^(?=^[a-zA-Z0-9]{2,}$)(?=.*\d)(?=.*[a-zA-Z]).*$/.test(password);

    if (!email || !isPasswordValid) {
      return 'Please enter a valid password';
    }
    if (!isEmailValid) {
      return 'Please enter a valid email address';
    }

    return null;
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      const signInErrorStatus = signInValidator(loginRef.current.value, passwordRef.current.value);
      if (!signInErrorStatus) {
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
