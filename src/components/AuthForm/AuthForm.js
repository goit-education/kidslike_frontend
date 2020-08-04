import React, { Component } from 'react';
import { validateAll } from 'indicative/validator';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import * as authOperation from '../../redux/auth/authOperation';
import s from './AuthForm.module.css';
import { ReactComponent as IconGoogle } from '../../assets/icons/icon google/icon-google.svg';
import 'react-toastify/dist/ReactToastify.css';
import * as authSelectors from '../../redux/auth/authSelectors';
import * as authActions from '../../redux/auth/authActions';
import Loader from '../Loader/Loader';
import { getIsShowLengRu } from '../../redux/global/globalSelectors';

const validationRules = {
  email: 'required|email',
  password: 'required|min:6|max:12',
};

const validationMessagesUa = {
  'email.required': "Це обов'язкове поле!",
  'password.required': "Це обов'язкове поле!",
  'email.email': 'Введіть валідну електронну пошту!',
  'password.min': 'Пароль має бути не менше 6 символів!',
  'password.max': 'Пароль має бути не більше 12 символів!',
};

const validationMessages = {
  'email.required': 'Это обязательное поле!',
  'password.required': 'Это обязательное поле!',
  'email.email': 'Введите валидную электронную почту!',
  'password.min': 'Пароль должен быть не менее 6 символов!',
  'password.max': 'Пароль должен быть не более 12 символов!',
};

class AuthForm extends Component {
  static defaultProps = {
    serverError: null,
  };

  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
    cleanError: PropTypes.func.isRequired,
    serverError: PropTypes.string,
    serverIsLoading: PropTypes.bool.isRequired,

    isShowLangRu: PropTypes.bool.isRequired,
  };

  state = { email: '', password: '', error: null, typeSubmit: '' };

  ids = {
    emailId: shortid.generate(),
    passwordId: shortid.generate(),
  };

  // componentDidMount() {
  //   window.gapi.load('auth2', function() {
  //     console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);

  //     window.gapi.auth2
  //       .init({
  //         client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  //       })
  //       .then(() => {
  //         // console.log('OK');
  //       })
  //       .catch(() => {});
  //   });
  // }

  componentDidUpdate(prevProps) {
    const { serverError, serverIsLoading, isShowLangRu } = this.props;

    if (
      prevProps.serverError !== serverError &&
      !serverIsLoading &&
      serverError
    ) {
      switch (serverError) {
        case 'users was not saved':
          toast.error(
            !isShowLangRu
              ? 'Користувач з такою электронную поштою не зареєстрований!!'
              : 'Пользователь с такой электронной почтой не зарегистрирован!!',
            { position: toast.POSITION.TOP_CENTER },
          );
          break;

        case 'User in not defined':
          toast.error(
            !isShowLangRu
              ? 'Користувач з такою электронную поштою не зареєстрований!!'
              : 'Пользователь с такой электронной почтой не зарегистрирован!!',

            {
              position: toast.POSITION.TOP_CENTER,
            },
          );
          break;

        case 'Password is invalid':
          toast.error(
            !isShowLangRu
              ? 'Введений пароль невірний!'
              : 'Введенный пароль неверный!',
            {
              position: toast.POSITION.TOP_CENTER,
            },
          );
          break;

        default:
          break;
      }
    }
  }

  setTypeSubmit = type => this.setState({ typeSubmit: type });

  handleChange = e => {
    this.cleanErr();
    this.setState({ [e.target.name]: e.target.value });
  };

  cleanErr = () => {
    const { cleanError, serverError } = this.props;
    if (serverError) cleanError('');
  };

  handleSubmit = e => {
    e.preventDefault();
    const { typeSubmit, email, password } = this.state;
    const { onLogin, onRegister, isShowLangRu } = this.props;

    this.cleanErr();

    validateAll(
      { email, password },
      validationRules,
      isShowLangRu ? validationMessages : validationMessagesUa,
    )
      .then(() => {
        if (typeSubmit === 'register') {
          onRegister({ email, password });
          return;
        }
        if (typeSubmit === 'login') {
          onLogin({ email, password });
          return;
        }
        this.setState({ email: '', password: '', error: null });
      })
      .catch(errors => {
        const formatedErrors = {};
        errors.forEach(error => {
          formatedErrors[error.field] = error.message;
        });
        this.setState({
          error: formatedErrors,
        });
      });
  };

  // googleSingIn = () => {
  //   const { startLoginGoogle, setToken, setRefresh } = this.props;
  //   // startLoginGoogle();

  //   const GoogleAuth = window.gapi.auth2.getAuthInstance();
  //   GoogleAuth.signIn({ scope: 'profile email' })
  //     .then(googleUser => {
  //       console.log(googleUser);

  //       const token = googleUser.wc.access_token;
  //       // const token = googleUser.wc.id_token;
  //       // const token = googleUser.wc.login_hint;
  //       console.log(token);

  //       setToken(token);
  //       setRefresh();
  //     })
  //     .catch(() => {});
  // };

  render() {
    const { email, password, error } = this.state;
    const { serverIsLoading, isShowLangRu } = this.props;

    return (
      <>
        <div className={s.auth}>
          <div className={s.auth__wrapper}>
            <p className={`${s.auth__description} ${s.description__first}`}>
              {!isShowLangRu
                ? 'Ви можете авторизуватися за допомогою Google Account:'
                : 'Вы можете авторизоваться с помощью Google Account:'}
            </p>
            <a
              className={s.auth__link__google}
              href="https://kidslike.goit.co.ua/api/auth/google"
            >
              <div className={s.auth__link__wrapper}>
                <IconGoogle width="28" height="28" />
                <span className={s.auth__link__span}>Google</span>
              </div>
            </a>

            {/* <button
              className={s.auth__button__google}
              type="button"
              onClick={this.googleSingIn}
            >
              <IconGoogle width="28" height="28" />
              <span className={s.auth__link__span}>Google</span>
            </button> */}

            <p className={`${s.auth__description} ${s.description__second}`}>
              {!isShowLangRu
                ? 'Або зайти за допомогою e-mail та паролю, попередньо зареєструвавшись:'
                : 'Или зайти с помощью e-mail и пароля, предварительно зарегистрировавшись:'}
            </p>

            <form autoComplete="off" onSubmit={this.handleSubmit}>
              <div className={s.auth__form}>
                <label className={s.auth__label} htmlFor={this.ids.emailId}>
                  E-mail&#58;
                  <input
                    className={`${s.auth__input} ${s.auth__input__first}`}
                    id={this.ids.emailId}
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={this.handleChange}
                  />
                  {error && <span className={s.error}>{error.email}</span>}
                </label>

                <label className={s.auth__label} htmlFor={this.ids.passwordId}>
                  Пароль&#58;
                  <input
                    className={s.auth__input}
                    id={this.ids.passwordId}
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={this.handleChange}
                  />
                  {error && <span className={s.error}>{error.password}</span>}
                </label>
              </div>

              <div className={s.auth__buttons}>
                <button
                  onClick={() => this.setTypeSubmit('login')}
                  className={s.auth__button}
                  type="submit"
                >
                  {!isShowLangRu ? 'Увійти' : 'Войти'}
                </button>
                <button
                  onClick={() => this.setTypeSubmit('register')}
                  className={s.auth__button}
                  type="submit"
                >
                  {!isShowLangRu ? 'Зареєструватися' : 'Зарегистрироваться'}
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
        {serverIsLoading && <Loader />}
      </>
    );
  }
}

const mapStateToProps = store => ({
  serverError: authSelectors.getServerError(store),
  serverIsLoading: authSelectors.getServerIsLoading(store),

  isShowLangRu: getIsShowLengRu(store),
});

const mapDispatchToProps = dispatch => ({
  onRegister: data => dispatch(authOperation.register(data)),
  onLogin: data => dispatch(authOperation.login(data)),
  cleanError: data => dispatch(authActions.errorRegister(data)),

  startLoginGoogle: () => dispatch(authActions.startLogin()),
  setToken: token => dispatch(authActions.googleToken(token)),
  // setRefresh: token => dispatch(refresh(token)),
  setRefresh: () => dispatch(authOperation.refresh()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
