---
nav:
  title: 多边形
  path: /components
---

# 多边形

## 基础示例

```tsx
/**
 * compact: true
 */

import React, { useState } from 'react';
import { TMap, MultiPolygon } from '@didi/react-tmap';

const styles = {
  polygon: {
    color: '#3777FF', //面填充色
    showBorder: false, //是否显示拔起面的边线
    borderColor: '#00FFFF', //边线颜色
  },
};

const path = [
  //多边形轮廓点串（LatLng数组）
  { lat: 40.041054, lng: 116.272303 },
  { lat: 40.039419, lng: 116.272721 },
  { lat: 40.039764, lng: 116.274824 },
  { lat: 40.041374, lng: 116.274491 },
];

const geometries = [
  {
    id: 'p1', //该多边形在图层中的唯一标识（删除、更新数据时需要）
    styleId: 'polygon', //绑定样式名
    paths: path, //多边形轮廓
  },
];

export default () => {
  const [color, setColor] = useState('#00FF00');

  const getStyles = () => {
    return {
      ...styles,
      polygon: {
        ...styles.polygon,
        color,
      },
    };
  };

  return (
    <div>
      <div>
        <div>改变颜色：</div>
        <button onClick={() => setColor('#00FF00')}>00FF00</button>
        <button onClick={() => setColor('#00FFFF')}>00FFFF</button>
      </div>

      <TMap
        mapKey="TOZBZ-OU2CX-JJP4Z-7FCBV-CDDJ2-AHFQZ"
        zoom={16}
        center={{ lat: 40.038515, lng: 116.272185 }}
      >
        <MultiPolygon
          styles={getStyles()}
          geometries={geometries}
          onClick={e => {
            console.log('click', e);
          }}
          onHover={() => console.log('hover')}
        />
      </TMap>
    </div>
  );
};
```

## Props

| 名称       | 类型                                        | 说明             |
| ---------- | ------------------------------------------- | ---------------- |
| id         | String                                      | 图层 id          |
| zIndex     | Number                                      | 图层绘制顺序     |
| styles     | { [key: string]: TMap.PolygonStyleOptions } | 多边形的相关样式 |
| geometries | TMap.PolygonGeometry[]                      | 多边形数据数组   |

详细文档见官网 https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocVector#7
