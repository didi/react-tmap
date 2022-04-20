---
nav:
  title: 点标记
  path: /components
---

# 点标记

## 基础示例

```tsx
/**
 * compact: true
 */

import React, { useState } from 'react';
import { TMap, MultiMarker } from '@didi/react-tmap';

const styles = {
  myStyle: {
    width: 20, // 点标记样式宽度（像素）
    height: 30, // 点标记样式高度（像素）
    src:
      'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png', //图片路径
    //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
    anchor: { x: 10, y: 30 },
  },
};

const randomPosition = () => ({
  lat: 30 + Math.random() * 10,
  lng: 110 + Math.random() * 10,
});

const randomMarker = len =>
  Array(len)
    .fill(true)
    .map((e, idx) => ({
      position: randomPosition(),
      id: idx,
      styleId: 'myStyle',
      properties: {
        //自定义属性
        title: 'marker1',
      },
    }));

const geometries = randomMarker(100);

export default () => {
  return (
    <TMap
      mapKey="TOZBZ-OU2CX-JJP4Z-7FCBV-CDDJ2-AHFQZ"
      zoom={6}
      control={{
        rotate: {
          position: 'TOP_RIGHT',
        },
      }}
    >
      <MultiMarker geometries={geometries} styles={styles} />
    </TMap>
  );
};
```

## Props

| 名称       | 类型                                       | 说明             |
| ---------- | ------------------------------------------ | ---------------- |
| id         | String                                     | 图层 id          |
| styles     | { [key: string]: TMap.MarkerStyleOptions } | 标注点的相关样式 |
| geometries | TMap.PointGeometry[]                       | 标注点数据数组   |

## ref 可用方法

- moveAlong: 指定 id 的标注点，沿着指定路径移动;
- stopMove: 停止移动，尚未完成的动画会被取消
- pauseMove: 暂停点标记的动画效果，
- resumeMove: 重新开始

详细文档见官网 https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocMarker
