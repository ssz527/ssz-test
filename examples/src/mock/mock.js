import config from '../config/config'
import Mock from 'mockjs'
console.log(config.url('getConfig'))
Mock.mock(config.url('getTree'), function () {
  console.log('mock getTree')
  return {
    id: 1,
    parentId: '0',
    name: 'root',
    children: [
      {
        id: '11',
        parentId: '1',
        name: 'node1'
      },
      {
        id: '12',
        parentId: '2',
        name: 'node2'
      }
    ]
  }
})
Mock.mock(config.url('getConfig'), function () {
  console.log('mock getConfig')
  return {
    config: 'baidu'
  }
})
