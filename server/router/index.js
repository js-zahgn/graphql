const { graphqlKoa, graphiqlKoa } = require('graphql-server-koa');
const info = require('../controllers/info');
const student = require('../controllers/student');
const { saveCourse,fetchCourse } = require('../controllers/course');

const schema = require('../graphql/schema');

const router = require('koa-router')()

router.post('/saveInfo', info.saveInfo)
  .get('/info', info.fetchInfo)
  .post('/getStudentInfo', student.getStudentInfo)
  .post('/saveStudent', student.saveStudent)
  .get('/student', student.fetchStudent)
  .get('/studentDetail', student.fetchStudentDetail)
  .post('/saveCourse', saveCourse)
  .get('/fetchCourse', fetchCourse)


router.post('/graphql', async (ctx, next) => {
  await graphqlKoa({ schema: schema })(ctx, next)
}).get('/graphql', async (ctx, next) => {
  await graphqlKoa({ schema: schema })(ctx, next)
}).get('/graphiql', async (ctx, next) => {
  await graphiqlKoa({ endpointURL: '/graphql' })(ctx, next)
})

module.exports = router;
