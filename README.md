# react-tmap

- en [English](README.md)
- zh_CN [简体中文](README.zh_CN.md)

### Introduction

react-tmap, a high-performance map component library for react based on Tencent Maps and TypeScript encapsulation, has the following features:

- Complete documentation: documentation based on official documentation and framework usage is highly readable, and component examples are complete
- Componentization: Encapsulate the Tencent Maps imperative api as a responsive component, no need to care about the complex map api, only need to operate the data
- Multi-framework: contains [react-tmap](https://github.com/didi/react-tmap) and [vue-tmap](https://github.com/didi/vue-tmap), and share the same set of type definitions
- Type-safe: supplemented the type declaration of Tencent Maps sdk, components are also developed using TypeScript, a better development experience
- Custom components: provide an open map instance, you can write custom components or directly call the map's native api
- Performance optimization: unify the map api calling method and data monitoring to prevent performance problems caused by misuse of the map api

### Documentation and Examples

Visit [Official document address](https://didi.github.io/react-tmap/) to see more map components

> [Tencent Maps Official Documentation](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocIndex)

### Main Components

| react component | description                |
| --------------- | -------------------------- |
| Map             | Map Basic Components       |
| MultiMarker     | Multiple Marker Points     |
| MultiPolyline   | Polyline                   |
| MultiPolygon    | Polygon                    |
| MultiLabel      | Text Labeling              |
| MultiCircle     | Circle                     |
| DOMOverlay      | DOM overlay abstract class |
| InfoWindow      | Information prompt window  |
| MarkerCluster   | Point Aggregation          |

### Component library warehouse architecture diagram

![Warehouse Architecture Diagram](https://pt-starimg.didistatic.com/static/starimg/img/hoIR5zeNlu1650526012816.png)

### Quick start

#### Install

```shell
npm install @map-component/react-tmap
```

#### Apply for Tencent map key

https://lbs.qq.com/dev/console/key/manage

#### Simple example

```javascript
import React, { useState } from 'react';
import { TMap, MultiPolygon } from '@map-component/react-tmap';

const styles = {
  polygon: {
    color: '#3777FF', //surface fill color
    showBorder: false, //whether to show the edge of the pulled face
    borderColor: '#00FFFF', //border color
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
    id: 'p1', //The unique identifier of the polygon in the layer (required when deleting and updating data)
    styleId: 'polygon', //binding style name
    paths: paths, //polygon outline
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
        <button onClick={() => setColor('#00FFFF')}>
          Modify polygon color
        </button>
        <button onClick={() => setZoom(zoom + 1)}>Modify map zoom level</button>
      </div>

      <TMap
        mapKey="TOZBZ-OU2CX-JJP4Z-7FCBV-CDDJ2-AHFQZ" // The applied key
        zoom={zoom}
        center={center} // set the center point coordinates
        control={{
          zoom: { position: 'BOTTOM_RIGHT' },
          scale: false,
          rotate: false,
        }}
      >
        <MultiPolygon
          styles={polygonStyles}
          geometries={geometries}
          onClick={() => console.log('Polygon clicked')} // Click on the polygon
        />
      </TMap>
    </div>
  );
};
```

> mapKey is the newly applied key

### Contribution Guidelines

> Thanks to all the technical enthusiasts who participated in the contribution, let's build an easy-to-use map component library together

#### Commit bug

Please submit a bug through issue, and describe in detail how to reproduce the error and the version of dependencies. It is best to display the reproduced code through an online code editor.

#### Submit code

Please submit your code via pull request and we'll take a look soon

#### Start development

```
git clone xxx

cd react-tmap // cd vue-tmap

npm install

npm run dev
```
