---
nav:
  title: 圆形标记
  path: /components
---

# 圆形标记

## 基础示例

```tsx
/**
 * compact: true
 */
import React, { useState } from 'react';
import { TMap, MultiCircle } from '@didi/react-tmap';

const styles = {
  circle: {
    color: 'rgba(41,91,255,0.16)',
    showBorder: true,
    borderColor: 'rgba(41,91,255,1)',
    borderWidth: 2,
  },
  circle2: {
    color: 'rgba(41,91,255, 0.5)',
    showBorder: true,
    borderColor: 'rgba(41,91,255,1)',
    borderWidth: 4,
  },
};

const geometries = [
  {
    id: '222',
    styleId: 'circle',
    center: { lat: 40.041054, lng: 116.272303 },
    radius: 50,
  },
  {
    id: '223',
    styleId: 'circle2',
    center: { lat: 40.042854, lng: 116.272303 },
    radius: 100,
  },
];

export default () => {
  return (
    <TMap mapKey="TOZBZ-OU2CX-JJP4Z-7FCBV-CDDJ2-AHFQZ">
      <MultiCircle geometries={geometries} styles={styles} />
    </TMap>
  );
};
```

## Props

| 名称       | 类型                                         | 说明               |
| ---------- | -------------------------------------------- | ------------------ |
| id         | String                                       | 图层 id            |
| zIndex     | Number                                       | 图层绘制顺序       |
| styles     | { [key: string]: TMap.MultiCircleStyleHash } | 圆形标记的相关样式 |
| geometries | TMap.CircleGeometry[]                        | 圆形标记数据数组。 |

详细文档见官网 https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocVector#13
