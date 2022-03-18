/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import Animated from 'animated/lib/targets/react-dom';
import ss from './index.less';
import Bezier from '../bzer';

export default class PhotoPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacityValue: new Animated.Value(1),
      points: [],
    };
  }

  componentDidMount() {
    const p1 = [20, 20];
    const p2 = [20, 200];
    const c1 = [0, 30];
    const c2 = [40, 60];
    const dotNumber = 50;
    const points = new Bezier().getBezierPoints(dotNumber, p1, c1, c2, p2);
    this.setState({ points });
    const { opacityValue } = this.state;
    Animated.spring(opacityValue, {
      toValue: 0,
      duration: 3000,
    }).start();
  }

  render() {
    const { opacityValue, points } = this.state;
    const translateY = opacityValue.interpolate({
      inputRange: [0, 1],
      outputRange: [49, 0],
    });
    translateY.addListener(v => console.log(v));
    const scale = opacityValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.55, 1.2],
    });
    // console.log('translateY:', scale,scale.__getValue(), translateY.__getValue());
    return (
      <div>
        <div className={ss.span}>
          {points.map(([x, y]) => (
            <span style={{ top: y, left: x }} />
          ))}
        </div>
        {/* <Animated.div
          style={{
            bottom: translateY,
            transform: [
              {
                scale,
              },
            ],
            opacity: opacityValue,
          }}
          className={ss.root}
        /> */}
      </div>
    );
  }
}
