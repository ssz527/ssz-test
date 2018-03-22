import utils from '../../src/hdmap/utils.js';

describe('获取规则多边形的中心', () => {
  it('测试点与多边形中心坐标不同', () => {
    expect([0, 5]).to.not.equal(
      utils.getGeometryCenter(
        [
          [0, 10],
          [10, 10],
          [10, 0],
          [0, 0]
        ]
      )
    )
  })
  it('测试点与多边形中心坐标相同', () => {
    expect([0, 0]).to.deep.equal(
      utils.getGeometryCenter(
        [
          [0, 10],
          [10, 0],
          [0, -10],
          [-10, 0]
        ]
      )
    )
  })
})
