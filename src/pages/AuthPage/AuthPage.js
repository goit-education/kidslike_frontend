import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import * as authActions from '../../redux/auth/authActions';
import { refresh } from '../../redux/auth/authOperation';
import styles from './AuthPage.module.css';
import AuthForm from '../../components/AuthForm/AuthForm';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { getIsShowLengRu } from '../../redux/global/globalSelectors';

const AuthPage = props => {
  const isShowLangRu = useSelector(getIsShowLengRu);

  const { location, setToken } = props;

  if (location.search) {
    const token = new URLSearchParams(location.search).get('token');
    console.log(token);

    if (token) {
      setToken(token);
    }
  }

  return (
    <>
      <div className={styles.bck__color}>
        <div className={styles.auth__bck}>
          <div className={styles.container}>
            <h2 className={styles.auth__title}>
              {!isShowLangRu
                ? 'Виконуй завдання, отримай класні призи!'
                : 'Выполняй задания, получи классные призы!'}
            </h2>
            <AuthForm />
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProp = dispatch => ({
  setToken: token => dispatch(authActions.googleToken(token)),
  setRefresh: token => dispatch(refresh(token)),
});

AuthPage.propTypes = {
  location: PropTypes.shape({}),
  search: PropTypes.string,
}.isRequired;

export default withAuthRedirect(connect(null, mapDispatchToProp)(AuthPage));
