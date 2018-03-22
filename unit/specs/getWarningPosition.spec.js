import utils from '../../src/hdmap/utils.js';

describe('获取巡更路线报警动画样式的报警点位置', () => {
  it('测试点与报警点位置相同', () => {
    expect([-67.807885391838, 263.296067390244]).to.deep.equal(
      utils.getWarningPosition({
        borderPoints: [
          [150.192114608162, 256.796067390244],
          [-285.807885391838, 269.796067390244]
        ]
      }
      )
    );
  });
  it('测试点与报警点位置不同', () => {
    expect([-49, 137]).to.not.equal(
      utils.getWarningPosition({
        borderPoints: [
          [150.192114608162, 256.796067390244],
          [-285.807885391838, 269.796067390244]
        ]
      }
      )
    );
  })
});
