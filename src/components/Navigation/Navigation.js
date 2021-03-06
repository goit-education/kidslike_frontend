import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import * as moment from 'moment';
import PropTypes from 'prop-types';
import routes from '../../routes/routes';
import styles from './Navigation.module.css';
import { getIsShowLengRu } from '../../redux/global/globalSelectors';

const Navigation = ({ isAuth }) => {
  const currentDay = moment().format('dddd');

  const isShowLangRu = useSelector(getIsShowLengRu);

  const menuItemsArr = [
    {
      path: {
        pathname: '/',
        search: `?day=${currentDay}&unix-date=${Date.now()}`,
      },
      name: !isShowLangRu ? 'Головна' : 'Главная',
      protected: true,
    },
    {
      path: routes.AUTH_PAGE.path,
      name: !isShowLangRu ? 'Авторизація' : 'Авторизация',
      protected: false,
    },
    {
      path: routes.PLANNING_PAGE.path,
      name: !isShowLangRu ? 'Планування' : 'Планирование',
      protected: true,
    },
    {
      path: routes.AWARDS_PAGE.path,
      name: !isShowLangRu ? 'Нагороди' : 'Награды',
      protected: true,
    },
    {
      path: routes.CONTACTS_PAGE.path,
      name: !isShowLangRu ? 'Контакти' : 'Контакты',
      protected: false,
    },
  ];
  // const menuItemsArr = [
  //   {
  //     path: {
  //       pathname: '/',
  //       search: `?day=${currentDay}&unix-date=${Date.now()}`,
  //     },
  //     // name: 'Головна',
  //     name: 'Главная',
  //     protected: true,
  //   },
  //   {
  //     path: routes.AUTH_PAGE.path,
  //     // name: 'Авторизація',
  //     name: 'Авторизация',
  //     protected: false,
  //   },
  //   // { path: routes.PLANNING_PAGE.path, name: 'Планування', protected: true },
  //   // { path: routes.AWARDS_PAGE.path, name: 'Нагороди', protected: true },
  //   // { path: routes.CONTACTS_PAGE.path, name: 'Контакти', protected: false },
  //   { path: routes.PLANNING_PAGE.path, name: 'Планирование', protected: true },
  //   { path: routes.AWARDS_PAGE.path, name: 'Награды', protected: true },
  //   { path: routes.CONTACTS_PAGE.path, name: 'Контакты', protected: false },
  // ];

  const renderLinks = menuItemsArr.filter(el =>
    isAuth ? el.path !== routes.AUTH_PAGE.path && true : !el.protected,
  );
  const menuItemsRender = renderLinks.map(el => (
    <li key={el.path} className={styles.navigationItem}>
      <NavLink
        exact
        className={styles.navigationLink}
        activeStyle={{ color: 'black' }}
        to={el.path}
      >
        {el.name}
      </NavLink>
    </li>
  ));
  return (
    <nav>
      <ul className={styles.navigationList}>{menuItemsRender}</ul>
    </nav>
  );
};
Navigation.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps)(Navigation);
