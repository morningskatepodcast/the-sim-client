import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Row, Col, Button } from 'antd';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

import getColumns from './columns';
import Layout from '../components/Layout';

const ButtonGroup = Button.Group;

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skaters: [],
      salaryFilter: {
        isVisible: false,
        isFiltered: false,
        onVisibleChange: this.onVisibleChangeHandler
      }
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ skaters: props.skaters ? props.skaters.list : [] });
  }

  onVisibleChangeHandler = (visible) => {
    this.setState({ salaryFilter: { isVisible: visible }});
  }

  pageSizeChangeHandler = (size) => {
    const { dispatch } = this.props;
    return () => {
      dispatch({
        type: 'skaters/resize',
        payload: size
      });
    }
  }



  render = () => {
    const { loading, skaters: { updatedAt, list, pageSize, teams } } = this.props;

    return (
      <Layout>
        <Row gutter={16} style={{ paddingBottom: 4 }}>
          <Col span={8} style={{ paddingRight: 8, textAlign: 'left' }}>
            <p style={{ marginTop: 8, verticalAlign: 'bottom' }}><span>Last Updated: </span>{`${distanceInWordsToNow(updatedAt)}`}</p>
          </Col>
          <Col span={8} offset={8} style={{ paddingBottom: 4, paddingRight: 8, textAlign: 'right' }}>
            {"Results: "}
            <ButtonGroup>
              <Button type={`${pageSize === 25 ? "primary" : "default" }`} onClick={this.pageSizeChangeHandler(25)}>25</Button>
              <Button type={`${pageSize === 50 ? "primary" : "default" }`} onClick={this.pageSizeChangeHandler(50)}>50</Button>
              <Button type={`${pageSize === 100 ? "primary" : "default" }`} onClick={this.pageSizeChangeHandler(100)}>100</Button>
              <Button type={`${pageSize === list.length ? "primary" : "default" }`} onClick={this.pageSizeChangeHandler(list.length)}>ALL</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Table dataSource={this.state.skaters} rowKey={"Name"} columns={getColumns({ teams, salaryFilter: this.state.salaryFilter })} pagination={{ pageSize }} loading={loading} scroll={{ x: 1280 }}/>
          </Col>
        </Row>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.skaters,
    skaters: state.skaters
  };
}

export default connect(mapStateToProps)(IndexPage);
