import utils from '../../src/hdmap/utils.js';

describe('获取重心点到多边形最近某个点的最短x轴,y轴的距离', () => {
  it('测试值与最短距离值不同', () => {
    expect([1, 2]).to.not.deep.equal(
      utils.getMinDistance([
        [
          [0, 10],
          [10, 10],
          [10, 0],
          [0, 0]
        ]
      ])
    );
  });
  it('测试值与最短距离值相同', () => {
    expect([2.5, 2.5]).to.deep.equal(
      utils.getMinDistance([
        [0, 10],
        [10, 10],
        [10, 0],
        [0, 0]
      ])
    );
  });
});
