---
nav:
  title: 文本标记
  path: /components
---

# 文本标记

## 基础示例

```tsx
/**
 * compact: true
 */

import React, { useState } from 'react';
import { TMap, MultiLabel } from '@map-component/react-tmap';

const geometries = [
  {
    id: 'label_1',
    styleId: 'label',
    position: { lat: 40.040074, lng: 116.273519 },
    content: '腾讯北京总部',
  },
];

const styles = {
  label: {
    color: '#3777FF', //颜色属性
    size: 20, //文字大小属性
    offset: { x: 0, y: 0 }, //文字偏移属性单位为像素
    angle: 0, //文字旋转属性
    alignment: 'center', //文字水平对齐属性
    verticalAlignment: 'middle', //文字垂直对齐属性
  },
};

const colors = ['#fad', '#3777FF'];

export default () => {
  const [color, setColor] = useState(colors[0]);

  const changeColor = () => {
    let theme = color === colors[0] ? colors[1] : colors[0];
    setColor(theme);
  };

  const getStyles = () => {
    return {
      ...styles,
      label: {
        ...styles.label,
        color,
      },
    };
  };

  return (
    <div>
      <button onClick={changeColor}>改变颜色</button>
      <TMap mapKey="TOZBZ-OU2CX-JJP4Z-7FCBV-CDDJ2-AHFQZ">
        <MultiLabel geometries={geometries} styles={getStyles()} />
      </TMap>
    </div>
  );
};
```

## Props

| 名称            | 类型                                        | 说明                             |
| --------------- | ------------------------------------------- | -------------------------------- |
| id              | String                                      | 图层 id                          |
| styles          | { [key: string]: TMap.MultiLabelStyleHash } | 文本标注的相关样式               |
| geometries      | TMap.LabelGeometry[]                        | 文本标注数据数组。               |
|                 |
| enableCollision | Boolean                                     | 是否开启图层内部的文本标注碰撞。 |
|                 |

详细文档见官网 https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocLabel
