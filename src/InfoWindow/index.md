---
nav:
  title: 信息提示窗
  path: /components
---

# 信息提示窗

## 基础示例

```tsx
/**
 * compact: true
 */

import React, { useState } from 'react';
import { TMap, InfoWindow } from '@didi/react-tmap';

export default () => {
  const [visible, setVisible] = useState(true);

  const onClose = () => {
    setVisible(false);
  };

  return (
    <TMap
      center={{ lat: '39.984104', lng: '116.307503' }}
      mapKey="TOZBZ-OU2CX-JJP4Z-7FCBV-CDDJ2-AHFQZ"
    >
      <InfoWindow
        visible={visible}
        position={{ lat: '39.984104', lng: '116.307503' }}
        content="Hello World!"
        onClose={onClose}
      />
    </TMap>
  );
};
```

## Props

| 名称     | 类型                               | 说明                           |
| -------- | ---------------------------------- | ------------------------------ |
| id       | String                             | 图层 id                        |
| visible  | Boolean                            | 是否显示                       |
| position | { [key: string]: TMap.LatLngData } | 地理位置                       |
| content  | String                             | 提示文本                       |
| zIndex   | Number                             | 显示层级                       |
| offset   | Object                             | 偏移量（默认：{ x: 0, y: 0 }） |

详细文档见官网 https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocInfo
