import dva, { connect } from 'dva';
import { Router, browserHistory, Route, Switch } from 'dva/router';
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import fetch from 'dva/fetch';
import React from 'react';
import { LocaleProvider, Layout, Table, Row, Col, Button } from "antd";
import enUS from "antd/lib/locale-provider/en_US";
import { message } from 'antd';

const { Header, Content, Footer } = Layout;
const ButtonGroup = Button.Group;

const ERROR_MSG_DURATION = 3;

// 1. Initialize
const app = dva({
  history: createHistory(),
  onError(e) {
    message.error(e.message, ERROR_MSG_DURATION);
  },
});

app.use(createLoading());

// 2. Model


// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#root');
