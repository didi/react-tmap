---
nav:
  title: 点聚合
  path: /components
---

# 基础示例

```tsx
/**
 * compact: true
 */

import React from 'react';
import { TMap, MultiCluster } from '@didi/react-tmap';

const randomPosition = () => ({
  lat: 30 + Math.random() * 10,
  lng: 110 + Math.random() * 10,
});
const randomMarker = len =>
  Array(len)
    .fill(true)
    .map((e, idx) => ({
      position: randomPosition(),
    }));

const geometries = randomMarker(100);

export default () => {
  return (
    <TMap mapKey="TOZBZ-OU2CX-JJP4Z-7FCBV-CDDJ2-AHFQZ" zoom={6}>
      <MultiCluster geometries={geometries} />
    </TMap>
  );
};
```

## Props

| 名称               | 类型                 | 说明                                                          |
| ------------------ | -------------------- | ------------------------------------------------------------- |
| id                 | String               | 图层 id                                                       |
| enableDefaultStyle | Boolean              | 是否启用默认的聚合样式                                        |
| minimumClusterSize | Number               | 形成聚合簇的最小个数                                          |
| zoomOnClick        | Boolean              | 点击已经聚合的标记点时是否实现聚合分离                        |
| gridSize           | Number               | 聚合算法的可聚合距离                                          |
| averageCenter      | Boolean              | 每个聚和簇的中心是否应该是聚类中所有标记的平均值,默认为 false |
| maxZoom            | Number               | 采用聚合策略的最大缩放级别                                    |
| geometries         | TMap.PointGeometry[] | 标注点数据数组                                                |

详细文档见官网 https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocCluster
