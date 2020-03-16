import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

import { IViewer } from '../../lib/types';
import { MenuItems } from './components';

import logo from './assets/tinyhouse-logo.png';

const { Header } = Layout;

interface IProps {
  viewer: IViewer;
  setViewer: (viewer: IViewer) => void;
}

export const AppHeader = ({ viewer, setViewer }: IProps) => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <Link to="/">
            <img src={logo} alt="App logo" />
          </Link>
        </div>
      </div>
      <div className="app-header__menu-section">
        <MenuItems viewer={viewer} setViewer={setViewer} />
      </div>
    </Header>
  );
};
