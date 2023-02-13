# react-tmap

- en [English](README.md)
- zh_CN [简体中文](README.zh_CN.md)

### 简介

react-tmap，一个基于腾讯地图、TypeScript 封装适用于 react 的高性能地图组件库，拥有以下功能特性：

- 文档完善：基于官方文档和框架用法的文档可读性高，组件示例完善
- 组件化：封装腾讯地图命令式的 api 为响应式组件，无需关心复杂的地图 api，只需要操作数据即可
- 多框架：包含 [react-tmap](https://github.com/didi/react-tmap) 和 [vue-tmap](https://github.com/didi/vue-tmap)，且共享同一套类型定义
- Type-safe([@map-component/tmap-types](https://github.com/didi/tmap-types)): 补充了腾讯地图 sdk 的类型声明，组件也使用 TypeScript 开发，更好的开发体验
- 自定义组件：提供开放地图实例，可编写自定义组件或直接调用地图原生 api
- 性能优化：统一地图 api 调用方式和数据监听，防止误用地图 api 引起性能问题

### 文档和示例

访问 [官方文档](https://didi.github.io/react-tmap/)，查看更多地图组件

> [腾讯地图官方文档](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocIndex)

### 主要组件

| react 组件    | 描述             |
| ------------- | ---------------- |
| Map           | 地图基础组件     |
| MultiMarker   | 多个标注点       |
| MultiPolyline | 折线             |
| MultiPolygon  | 多边形           |
| MultiLabel    | 文本标注         |
| MultiCircle   | 圆形             |
| DOMOverlay    | DOM 覆盖物抽象类 |
| InfoWindow    | 信息提示窗       |
| MarkerCluster | 点聚合           |

### 快速开始

#### 安装

```shell
npm install @map-component/react-tmap
```

#### 申请腾讯地图密钥

https://lbs.qq.com/dev/console/key/manage

#### 简单示例

```javascript
import React, { useState } from 'react';
import { TMap, MultiPolygon } from '@map-component/react-tmap';

const styles = {
  polygon: {
    color: '#3777FF', //面填充色
    showBorder: false, //是否显示拔起面的边线
    borderColor: '#00FFFF', //边线颜色
  },
};

const paths = [
  { lat: 40.041054, lng: 116.272303 },
  { lat: 40.039419, lng: 116.272721 },
  { lat: 40.039764, lng: 116.274824 },
  { lat: 40.041374, lng: 116.274491 },
];

const geometries = [
  {
    id: 'p1', //该多边形在图层中的唯一标识（删除、更新数据时需要）
    styleId: 'polygon', //绑定样式名
    paths: paths, //多边形轮廓
  },
];

const center = { lat: 40.041054, lng: 116.272303 };

export default () => {
  const [color, setColor] = useState('#00FF00');
  const [zoom, setZoom] = useState(16);

  const polygonStyles = React.useMemo(
    () => ({
      polygon: {
        ...styles.polygon,
        color,
      },
    }),
    [color],
  );

  return (
    <div>
      <div>
        <button onClick={() => setColor('#00FFFF')}>修改多边形颜色</button>
        <button onClick={() => setZoom(zoom + 1)}>修改地图缩放级别</button>
      </div>

      <TMap
        mapKey="TOZBZ-OU2CX-JJP4Z-7FCBV-CDDJ2-AHFQZ" // 申请的 key
        zoom={zoom}
        center={center} // 设置中心点坐标
        control={{
          zoom: { position: 'BOTTOM_RIGHT' },
          scale: false,
          rotate: false,
        }}
      >
        <MultiPolygon
          styles={polygonStyles}
          geometries={geometries}
          onClick={() => console.log('点击了多边形')} // 点击多边形
        />
      </TMap>
    </div>
  );
};
```

> mapKey 为新申请的密钥

### 贡献指南

> 感谢所有参与贡献的技术爱好者，一起共建好用易用的地图组件库

#### 提交错误

请通过 issue 提交错误，详细描述错误复现方式和依赖版本，最好通过在线代码编辑器展示复现代码

#### 提交代码

请通过 pull request 提交您的代码，我们将尽快查看

#### 开始开发

```
git clone xxx

cd react-tmap   // cd vue-tmap

npm install

npm run dev
```
