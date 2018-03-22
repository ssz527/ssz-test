import utils from '../../src/hdmap/utils.js';

describe('获取广播坐标', () => {
  it('测试点与广播坐标不同', () => {
    expect([195, 175]).to.not.deep.equal(
      utils.getAreaCenter([
        [-45.5, 94.9375],
        [-41.5, 33.9375],
        [-151, 39.4375],
        [-151.5, 99.4375],
        [-68.5, 112.9375],
        [-42.5, 93.9375]
      ])
    );
  });
  it('测试点与广播坐标相同', () => {
    expect([-96.08781262450269, 71.174036875242]).to.deep.equal(
      utils.getAreaCenter([
        [-45.5, 94.9375],
        [-41.5, 33.9375],
        [-151, 39.4375],
        [-151.5, 99.4375],
        [-68.5, 112.9375],
        [-42.5, 93.9375]
      ])
    );
  });
});
