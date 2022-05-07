---
nav:
  title: demo
  path: /components
---

# demo

> 请注意，本文档中所有示例使用的 mapKey 仅作文档测试使用，不定期修改相关配置，请勿使用在任何项目中

```tsx
/**
 * compact: true
 */

import React, { useState, useRef } from 'react';
import { TMap, MultiPolyline, MultiMarker } from '@map-component/react-tmap';

const paths = [
  { lat: 39.98481500648338, lng: 116.30571126937866 },
  { lat: 39.982266575222155, lng: 116.30596876144409 },
  { lat: 39.982348784165886, lng: 116.3111400604248 },
  { lat: 39.978813710266024, lng: 116.3111400604248 },
  { lat: 39.978813710266024, lng: 116.31699800491333 },
];

const geometries = [
  {
    id: 'pl_1', // 折线唯一标识，删除时使用
    styleId: 'styleBlue', // 绑定样式名
    paths,
  },
];

const styles = {
  styleBlue: {
    color: '#3777FF', // 线填充色
    width: 4, // 折线宽度
    borderWidth: 2, // 边线宽度
    borderColor: '#FFF', // 边线颜色
    lineCap: 'round', // 线端头方式
  },
};

const markerStyles = {
  'car-down': {
    width: 40,
    height: 40,
    anchor: {
      x: 20,
      y: 20,
    },
    faceTo: 'map',
    rotate: 180,
    src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/car.png',
  },
  start: {
    width: 25,
    height: 35,
    anchor: { x: 16, y: 32 },
    src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/start.png',
  },
  end: {
    width: 25,
    height: 35,
    anchor: { x: 16, y: 32 },
    src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/end.png',
  },
};

const markerGeometries = [
  {
    id: 'car',
    styleId: 'car-down',
    position: { lat: 39.98481500648338, lng: 116.30571126937866 },
  },
  {
    id: 'start',
    styleId: 'start',
    position: { lat: 39.98481500648338, lng: 116.30571126937866 },
  },
  {
    id: 'end',
    styleId: 'end',
    position: { lat: 39.978813710266024, lng: 116.31699800491333 },
  },
];

export default () => {
  const markers = useRef();

  const moveAlong = () => {
    markers.current.moveAlong(
      {
        car: {
          path: paths.map(p => new window.TMap.LatLng(p.lat, p.lng)),
          speed: 250,
        },
      },
      {
        autoRotation: true,
      },
    );
  };

  const stopMove = () => {
    markers.current.stopMove();
  };

  const pauseMove = () => {
    markers.current.pauseMove();
  };

  const resumeMove = () => {
    markers.current.resumeMove();
  };

  return (
    <div>
      <div>
        <button onClick={moveAlong}>出发</button>
        <button onClick={stopMove}>停止移动</button>
        <button onClick={pauseMove}>暂停</button>
        <button onClick={resumeMove}>重新开始</button>
      </div>
      <TMap
        mapKey="TOZBZ-OU2CX-JJP4Z-7FCBV-CDDJ2-AHFQZ"
        center={{ lat: 39.984104, lng: 116.307503 }}
        zoom={15}
      >
        <MultiPolyline
          id="polyline-layer"
          styles={styles}
          geometries={geometries}
        />
        <MultiMarker
          id="marker-layer"
          styles={markerStyles}
          geometries={markerGeometries}
          ref={markers}
        />
      </TMap>
    </div>
  );
};
```
