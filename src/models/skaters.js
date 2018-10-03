import _ from 'lodash';
import format from 'date-fns/format';

import { getSkaters } from '../services/skaters';

function getTeams(skaters) {
  return _.reduce(skaters, (acc, player) => {
    if (_.includes(acc, player.Team)) {
      return acc;
    }
    acc.push(player.Team);
    return acc;
  }, []);
}

export default {
  namespace: 'skaters',
  state: {
    pageSize: 50,
    updatedAt: format(new Date()),
    list: [],
    teams: [],
    positions: ['C', 'W', 'D']
  },
  reducers: {
    save(state, { payload: { data: list, updatedAt } }) {
      return { ...state, list, updatedAt, teams: getTeams(list) };
    },
    saveSize(state, { payload: { pageSize } }) {
      return { ...state, pageSize };
    },
  },
  effects: {
    *fetch({}, { call, put }) {
      const { data: { data, updatedAt } } = yield call(getSkaters);
      console.log(data);
      yield put({
        type: 'save',
        payload: {
          data,
          updatedAt,
        },
      });
    },
    *resize({ payload: pageSize }, { call, put }) {
      yield put({
        type: 'saveSize',
        payload: {
          pageSize
        }
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/') {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },
};
