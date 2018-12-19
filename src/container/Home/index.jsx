import React, { Component } from 'react';

const ajax = (url, type, param = {}, cb) => {
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
  fetch(url, postBody).then(r => r.json()).then(res => {
    cb(res)
  })
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

  getCourse() {
    const _this = this;
    ajax('fetchCourse', res => _this.setState({ courseList: res.data }));
  }

  getStudents() {
    const _this = this;
    ajax('student', res => _this.setState({ students: res.data }));
  }

  getAllData() {
    const _this = this;
    const params = {
      query: `query{
        student(age: ${_this.state.age}){
          name
          sex
          age
        }
        course{
          title
          desc
        }
      }`
    }
    ajax('graphql', 'post', params, res => {
      _this.setState({
        students: res.data.student,
        courseList: res.data.course
      });
    })
  }

  render() {
    const { courseList,students } = this.state;
    return (
      <div>
        <h1 className="title">GraphQL-前端demo</h1>
        <div className="main">
          <div className="course list">
            <h3>课程列表</h3>
            <ul>
              {
                courseList.length < 1 ? <li>暂无数据。。。</li> :
                  courseList.map((c,index) => <li key={`course->${index}`}>课程：{c.title}，简介：{c.desc}</li>)
              }
            </ul>
          </div>
          <div className="student list">
            <h3>班级学生列表</h3>
            <ul>
              {
                students.length < 1 ? <li>暂无数据。。。</li> :
                  students.map((s,index) => <li key={`student->${index}`}>姓名：{s.name}，性别：{s.sex}，年龄：{s.age}</li>)
              }
            </ul>
          </div>
        </div>
        <div className="btnbox">
          <div className="btn" onClick={this.getCourse.bind(this)}>课程列表</div>
          <div className="btn" onClick={this.getStudents.bind(this)}>班级学生列表</div>
          <div className="btn" onClick={this.getAllData.bind(this)}>graphQL查询</div>
        </div>
        <div className="toast"></div>
      </div>
    );
  }
}

export default App;
