import _ from 'lodash';
import { Icon, Slider } from 'antd';

const marks = {
  0: 2500,
  100: 9000
};

const getColumns = ({teams, salaryFilter: { isVisible, isFiltered, onVisibleChange }}) => ([
  {
    title: 'Name',
    dataIndex: 'Name',
    key: 'Name',
    width: 160,
    fixed: 'left',
    sorter: (a, b) => {
      if (a.Name > b.Name)
        return 1;
      else if (a.Name < b.Name)
        return -1;
      else
        return 0;
    },
  }, {
    title: 'Team',
    dataIndex: 'Team',
    key: 'Team',
    width: 100,
    fixed: 'left',
    filters: _.map(teams, (team) => ({ text: team, value: team })),
    onFilter: (value, record) => record.Team === value,
    sorter: (a, b) => {
      if (a.Team > b.Team)
        return 1;
      else if (a.Team < b.Team)
        return -1;
      else
        return 0;
    }
  }, {
    title: 'Salary',
    dataIndex: 'Salary',
    key: 'Salary',
    width: 100,
    fixed: 'left',
    filterDropdown: (
      <div style={{ padding: '8px', borderRadius: '6px', background: '#fff', boxShadow: '0 1px 6px rgba(0, 0, 0, .2)' }}>
        <div style={{ height: 240 }}>
          <Slider vertical range marks={marks} step={.1} defaultValue={[3000, 7800]} />
        </div>
      </div>
    ),
    filterIcon: <Icon type="filter" style={{ color: isFiltered ? '#108ee9' : '#aaa' }} />,
    filterDropdownVisible: isVisible,
    onFilterDropdownVisibleChange: onVisibleChange,
    sorter: (a, b) => a.Salary - b.Salary
  }, {
    title: 'Pos',
    dataIndex: 'Pos',
    key: 'Pos',
    filters: [{
      text: 'C',
      value: 'C',
    }, {
      text: 'D',
      value: 'D',
    }, {
      text: 'W',
      value: 'W',
    }],
    onFilter: (value, record) => record.Pos === value,
    sorter: (a, b) => {
      if (a.Pos > b.Pos)
        return 1;
      else if (a.Pos < b.Pos)
        return -1;
      else
        return 0;
    }
  }, {
    title: 'Line',
    dataIndex: 'Line',
    key: 'Line',
    filters: [{
      text: '1',
      value: 1,
    }, {
      text: '2',
      value: 2,
    }, {
      text: '3',
      value: 3,
    }, {
      text: '4',
      value: 4,
    }],
    onFilter: (value, record) => record.Line === value,
    sorter: (a, b) => a.Line - b.Line
  }, {
    title: 'PP',
    dataIndex: 'PP',
    key: 'PP',
    render: (text) => {
      if (text === 0) {
        return undefined;
      }
      return text;
    },
    sorter: (a, b) => {
      if (a.PP === 0) return 1;
      if (b.PP === 0) return -1;
      if (a.PP === b.PP) return 0;
      return a.PP < b.PP ? -1 : 1;
    }
  }, {
    title: 'Own%',
    dataIndex: 'Own%',
    key: 'Own%',
    sorter: true, // (a, b) => a['Own%'] - b['Own%'],
    render: (text, record) => (record['Own%'] > 0) ? record['Own%'] : 0
  }, {
    title: 'Mag',
    dataIndex: 'Mag',
    key: 'Mag',
    sorter: (a, b) => a.Mag - b.Mag,
    render: (text, record) => (record.Mag > 0) ? record.Mag : 0
  }, {
    title: 'Freq',
    dataIndex: 'Freq',
    key: 'Freq',
    sorter: (a, b) => a.Freq - b.Freq,
    render: (text, record) => (record.Freq > 0) ? record.Freq : 0
  }, {
    title: 'Payoff',
    dataIndex: 'Payoff',
    key: 'Payoff',
    sorter: (a, b) => a.Payoff - b.Payoff,
    render: (text, record) => (record.Payoff > 0) ? record.Payoff : 0
  }, {
    title: 'PICL',
    dataIndex: 'PICL',
    key: 'PICL',
    sorter: (a, b) => a.PICL - b.PICL,
    render: (text, record) => (record.PICL > 0) ? record.PICL : 0
  }, {
    title: 'Leverage',
    dataIndex: 'Leverage',
    key: 'Leverage',
    sorter: (a, b) => a.Leverage - b.Leverage,
    render: (text, record) => (record.Leverage > 0) ? record.Leverage : 0
  },
]);

export default getColumns;
