---
nav:
  title: 矢量图形
  path: /components
---

# 矢量图形

## 基础示例

```tsx
/**
 * compact: true
 */

import React, { useState } from 'react';
import { TMap, MultiPolyline } from '@didi/react-tmap';

const styles = {
  styleBlue: {
    color: '#3777FF', // 线填充色
    width: 6, // 折线宽度
    lineCap: 'butt', // 线端头方式
    dashArray: [0, 0], // 虚线展示方式
    showArrow: true,
  },
  styleRed: {
    color: '#CC0000', // 线填充色
    width: 6, // 折线宽度
    borderWidth: 5, // 边线宽度
    borderColor: '#CCC', // 边线颜色
    lineCap: 'round', // 线端头方式
    showArrow: true,
  },
};

const geometries = [
  {
    id: 'pl_1', // 折线唯一标识，删除时使用
    styleId: 'styleBlue', // 绑定样式名
    paths: [
      { lat: 40.03854, lng: 116.272389 },
      { lat: 40.038844, lng: 116.27521 },
      { lat: 40.041407, lng: 116.274738 },
    ],
  },
  {
    id: 'pl_2',
    styleId: 'styleRed',
    paths: [
      { lat: 40.039492, lng: 116.271893 },
      { lat: 40.041562, lng: 116.271421 },
      { lat: 40.041957, lng: 116.274211 },
    ],
  },
];

export default () => {
  return (
    <TMap
      mapKey="TOZBZ-OU2CX-JJP4Z-7FCBV-CDDJ2-AHFQZ"
      zoom={16}
      center={{ lat: 40.038515, lng: 116.272185 }}
    >
      <MultiPolyline
        id="polyline-layer"
        styles={styles}
        geometries={geometries}
        onClick={e => console.log('e', e)}
        onDoubleClick={e => console.log('doubleClick')}
      />
    </TMap>
  );
};
```

## Props

官网 https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocVector

## props

| 名称       | 类型                                         | 说明              |
| ---------- | -------------------------------------------- | ----------------- |
| id         | String                                       | 图层 id           |
| zIndex     | Number                                       | 图层绘制顺序      |
| styles     | { [key: string]: TMap.PolylineStyleOptions } | 折线 v 的相关样式 |
| geometries | TMap.PolylineGeometry[]                      | 折线数据数组      |

详细文档见官网 https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocVector
