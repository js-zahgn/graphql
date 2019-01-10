import React, { Component,Fragment } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';

const client = new ApolloClient({uri: 'http://localhost:4008/graphql'});

const GG_INFOS = gql`
  query{
    infos{
      hobby
      height
    }
  }
`

class GG extends Component{
  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={GG_INFOS}>
          {({ loading, error, data }) => {
            if (loading) return <h4>loading...</h4>
            if (error) console.error(error);
            console.log(data.infos)
            return (
              <Fragment>
                {
                  data.infos.map(info => {
                    return (
                      <Fragment key={info.height + 'zheshiga'}>
                        <span>{info.hobby.join(',')}</span>
                        <p>{info.height}</p>
                      </Fragment>
                    )
                  })
                }
              </Fragment>
            )
          }}
        </Query>
      </ApolloProvider>
    )
  }
}

const _ajax = (url, type, param = {}, cb) => {
  url = 'http://localhost:4008/' + url;
  let postBody = {};
  if (type !== 'post') {
    if (typeof type != 'function') {
      throw new Error('the second argument must be a function in get request');
    }
    cb = type;
  } else {
    postBody = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(param)
    }
  }
  fetch(url, postBody).then(r => r.json()).then(res => cb(res));
}

class RandomPoint extends Component {
  constructor() {
    super();
    this.state = {
      pointList: [],
      pointListLen: 50,
      timer: null
    }
  }

  componentWillMount() {
    this.genPoints();
  }

  genPoints() {
    let points = [], item;
    if (this.state.timer != null) {
      clearInterval(this.state.timer);
    }
    while (points.length < 50) {
      let x = Math.random() * 500, y = Math.random() * 500;
      if (points.length < 1) item = { x, y };
      if (points.every(p => Math.sqrt(Math.pow(Math.abs(x - p.x), 2) + Math.pow(Math.abs(y - p.y), 2)) >= 16))
        item = { x, y };

      points.push(item);
    }
    this.setState({ pointList: points });
  }

  movePoint() {
    const _this = this;
    const dom = this.refs.redPoint;
    let points = JSON.parse(JSON.stringify(_this.state.pointList));
    let _index, current, timer;
    const t = 500;
    if (_this.state.timer != null) {
      clearInterval(_this.state.timer);
    }
    dom.style.transform = `transition all ${t / 1000}s linear`;
    timer = setInterval(() => {
      _index = Math.ceil(points.length * Math.random()) - 1;
      console.log(points.length, _index)
      current = points[_index];
      dom.style.left = current.x + 'px';
      dom.style.top = current.y + 'px';
      points.splice(_index, 1);
      _this.setState({ pointListLen: points.length });
      if (points.length < 1) clearInterval(timer);
    }, t);
    _this.setState({ timer });
  }

  render() {
    return <div>
      <div className="pointBox" ref="pointBox">
        <div className="point-move" ref="redPoint"></div>
        {
          this.state.pointList.map((p, i) => <div key={`point->${i}`} className="point"
            style={{ left: p.x + 'px', top: p.y + 'px' }} ></div>)
        }
        <h1 className="bg">还剩{this.state.pointListLen}个没跑完.</h1>
      </div>
      <div className="btn" onClick={this.genPoints.bind(this)}>random points</div>
      <div className="btn" onClick={this.movePoint.bind(this)}>move</div>
    </div>
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      courseList: [],
      students: [],
      age: 29
    }
  }

  componentWillMount() {
    const params = {
      query: `query{
        student{
          name
          sex
          age
        }
        infos{
          hobby
          weight
          height
        }
      }`
    }
    _ajax('graphql', 'post', params, res => {
      console.log(res)
    })
  }

  getCourse() {
    const _this = this;
    _ajax('fetchCourse', res => _this.setState({ courseList: res.data }));
  }

  getStudents() {
    const _this = this;
    _ajax('student', res => _this.setState({ students: res.data }));
  }

  getAllData() {
    const _this = this;
    const params = {
      query: `query{
        student(age: ${_this.state.age}){
          name
          sex
          age
          idInfo
        }
        course{
          title
          desc
        }
      }`
    }
    _ajax('graphql', 'post', params, res => {
      _this.setState({
        students: res.data.student,
        courseList: res.data.course
      });
    })
  }

  render() {
    const { courseList, students } = this.state;
    return (
      <div>
        <h1 className="title">GraphQL-前端demo</h1>

        <div className="main">
          <div className="course list">
            <h3>课程列表</h3>
            <ul>
              {
                courseList.length < 1 ? <li>暂无数据。。。</li> :
                  courseList.map((c, index) => <li key={`course->${index}`}>课程：{c.title}，简介：{c.desc}</li>)
              }
            </ul>
          </div>
          <div className="student list">
            <h3>班级学生列表</h3>
            <ul>
              {
                students.length < 1 ? <li>暂无数据。。。</li> :
                  students.map(s => <li key={`student->${s._id}`}>姓名：{s.name}，性别：{s.sex}，年龄：{s.age}</li>)
              }
            </ul>
          </div>
        </div>
        <div className="btnbox">
          <div className="btn" onClick={this.getCourse.bind(this)}>课程列表</div>
          <div className="btn" onClick={this.getStudents.bind(this)}>班级学生列表</div>
          <div className="btn" onClick={this.getAllData.bind(this)}>graphQL查询</div>
        </div>
        <RandomPoint />
        <GG></GG>
        <div className="toast"></div>
      </div>
    );
  }
}

export default App;
