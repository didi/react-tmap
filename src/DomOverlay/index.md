---
nav:
  title: DOM覆盖物
  path: /components
---

# DOM 覆盖物

## 基础示例

```tsx
/**
 * compact: true
 */
import React, { useState, useRef } from 'react';
import { TMap, DomOverLay, DomData } from '@didi/react-tmap';

const paths = [
  { lat: 40.041054, lng: 116.272305 },
  { lat: 40.039419, lng: 116.272721 },
  { lat: 40.039764, lng: 116.274824 },
  { lat: 40.041374, lng: 116.274491 },
];

const getOverlays = () =>
  paths.map((item, i) => ({
    position: item,
    id: i,
    data: i,
  }));

export default () => {
  const onClick = e => {
    console.log(e);
  };

  const data = getOverlays();

  return (
    <TMap mapKey="TOZBZ-OU2CX-JJP4Z-7FCBV-CDDJ2-AHFQZ">
      <DomOverLay
        data={data}
        onClick={onClick}
        createDom={(dataItem: DomData) => {
          // 必须使用原生 js 创建 dom
          const div = document.createElement('div');
          div.style.cssText = `
                width: 60px;
                height: 23px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #ffffff;
                box-shadow: 0px 2px 4px 0px rgba(0, 21, 41, 0.2);
                border-radius: 24px;
                font-size: 16px;
                color: #0da398;
                font-weight: 500;
              `;
          div.innerHTML = dataItem.data;
          return div;
        }}
      />
    </TMap>
  );
};
```

## Props

| 名称      | 类型                             | 说明          |
| --------- | -------------------------------- | ------------- |
| data      | DomData[]                        | DOM 数据      |
| createDom | (data: DomData)=> HTMLElement    | 创建 DOM 元素 |
| onClick   | （data: DomData, e: any) => void | 点击事件      |

详细文档见官网 https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocDomOverlay
