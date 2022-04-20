---
nav:
  title: 地图
  path: /components
---

# 地图

> 请注意，本文档中所有示例使用的 mapKey 仅作文档测试使用，不定期修改相关配置，请勿使用在任何项目中

## 基础示例

```tsx
/**
 * compact: true
 */
import React, { useRef, useState, useEffect } from 'react';
import { TMap, MultiPolygon } from '@didi/react-tmap';

const path = [
  //多边形轮廓点串（LatLng数组）
  { lat: 40.041054, lng: 116.272303 },
  { lat: 40.039419, lng: 116.272721 },
  { lat: 40.039764, lng: 116.274824 },
  { lat: 40.041374, lng: 116.274491 },
];

export default () => {
  const [s, set] = useState(0);
  const [index, setIndex] = useState(0);
  const map = useRef(null);

  useEffect(() => {
    console.log(map.current?.map?.getZoom());
  });

  return (
    <div>
      <button onClick={() => set(s + 1)}>refresh</button>
      <button onClick={() => setIndex(index > 3 ? 0 : index + 1)}>
        change_center
      </button>
      <TMap
        mapKey="TOZBZ-OU2CX-JJP4Z-7FCBV-CDDJ2-AHFQZ"
        onClick={e => console.log(e)}
        center={path[index]}
        zoom={18}
        control={{
          scale: {
            position: 'BOTTOM_LEFT',
          },
        }}
        ref={map}
        onLoad={m => console.log(m)}
      />
    </div>
  );
};
```

## Props

### 本组件库自定义属性

| 名称      | 类型                            | 说明                                                                                                                               |
| --------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| version   | String                          | sdk 版本                                                                                                                           |
| mapKey    | String                          | 开发者 token                                                                                                                       |
| libraries | String[]                        | 地图扩展库，默认包含 ['visualization', 'tools', 'geometry'], 可增加其他库                                                          |
| class     | String                          | 地图容器 classname                                                                                                                 |
| style     | Object                          | 地图容器 style                                                                                                                     |
| control   | ControlType                     | 地图控件的配置                                                                                                                     |
| duration  | Boolean                         | 地图缩放、修改中心点等动画延迟时长（单位：毫秒）                                                                                   |
| onLoad    | (mapInstance: TMap.Map) => void | 地图实例加载完成事件，地图 sdk 异步加载，需 onLoad 后进行相关操作                                                                  |
| ref       | {map: TMap.Map}                 | 获取地图实例                                                                                                                       |
| onEvent   | 同地图事件类型                  | 地图事件，兼容所有地图原生事件，修改调用方式为 jsx 风格，如 onDragend、onZoom，注意下划线：原 xxx_xx 事件改为 onXxx_xx，保留下划线 |

### 腾讯地图原有属性

| 名称            | 类型                         | 说明                                                 |
| --------------- | ---------------------------- | ---------------------------------------------------- |
| center          | { lat: number; lng: number } | 地图中心点经纬度。                                   |
| zoom            | Number                       | 地图缩放级别，支持 3 ～ 20。                         |
| minZoom         | Number                       | 地图最小缩放级别，默认为 3。                         |
| maxZoom         | Number                       | 地图最大缩放级别，默认为 20。                        |
| rotation        | Number                       | 地图在水平面上的旋转角度，顺时针方向为正，默认为 0。 |
| pitch           | Number                       | 地图俯仰角度，取值范围为 0~80，默认为 0。            |
| scale           | Number                       | 地图显示比例，默认为 1。                             |
| offset          | { x: number; y: number }     | 地图中心与容器的偏移量                               |
| draggable       | Boolean                      | 是否支持拖拽移动地图，默认为 true。                  |
| scrollable      | Boolean                      | 是否支持鼠标滚轮缩放地图，默认为 true。              |
| doubleClickZoom | Boolean                      | 是否支持双击缩放地图，默认为 true。                  |
| boundary        | LatLngBounds                 | 地图边界                                             |
| mapStyleId      | String                       | 地图样式 ID                                          |
| baseMap         | TMap.BaseMap                 | 地图底图                                             |
| viewMode        | String                       | 地图视图模式，支持 2D 和 3D                          |
| showControl     | Boolean                      | 地图的控件显示                                       |
| control         | { zoom, scale, rotate }      | 地图的控件显示                                       |

详细文档见官网 https://lbs.qq.com/webApi/javascriptGL/glDoc/docIndexMap
