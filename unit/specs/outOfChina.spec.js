import utils from '../../src/hdmap/utils.js';

describe('判断GPS坐标是否不在国内', () => {
  it('测试点不在国内', () => {
    expect(false).to.equal(
      utils.outOfChina([140, 60])
    );
  });
  it('测试点在国内', () => {
    expect('true').to.not.equal(
      utils.outOfChina([120, 40])
    );
  });
});
