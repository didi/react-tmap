import React, { useEffect, FC, useRef, useContext, useState } from 'react';
import { MapContext } from '../context';
import useEvent from '../useEvent';

function builtStyle(opt: { [key: string]: TMap.PolylineStyleOptions }) {
  const styled: TMap.MultiPolylineStyleHash = {};
  Object.keys(opt).forEach(k => {
    styled[k] = new TMap.PolylineStyle(opt[k]);
  });
  return styled;
}

function buildGeometries<T>(
  geometries: TMap.PolylineGeometry<T>[],
): TMap.PolylineGeometry<T>[] {
  return geometries.map(v => {
    return {
      ...v,
      paths: (v.paths as Array<{
        lat: number;
        lng: number;
      }>).map(p => new TMap.LatLng(p.lat, p.lng)),
    };
  });
}

interface MultiPolylineOptions {
  id: string; // 图层绘制顺序
  zIndex?: number; // 图层绘制顺序
  styles?: TMap.MultiPolylineStyleHash; //	多边形的相关样式。
  geometries?: TMap.PolylineGeometry[]; //	多边形数据数组。
  [key: string]: any;
}

const MultiPolylineComponent: FC<MultiPolylineOptions> = ({
  id,
  zIndex,
  styles,
  geometries,
  ...reset
}) => {
  const polylineRef = useRef<any>(null);
  const [overlayIns, setOverlayIns] = useState<any>(null);

  const map = useContext(MapContext);

  const init = () => {
    if (map) {
      polylineRef.current = new TMap.MultiPolyline({
        id: id,
        map: map,
        zIndex: zIndex,
        styles: builtStyle(styles || {}),
        geometries: buildGeometries(geometries || []),
      });
      setOverlayIns(polylineRef.current);
    }
  };

  useEvent(overlayIns, reset);

  useEffect(() => {
    init();
    return function cleanUp() {
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }
    };
  }, [map]);

  useEffect(() => {
    polylineRef?.current?.setGeometries(buildGeometries(geometries || []));
  }, [geometries]);

  useEffect(() => {
    polylineRef?.current?.setStyles(builtStyle(styles || {}));
  }, [styles]);

  useEffect(() => {
    polylineRef?.current?.setZIndex(zIndex);
  }, [zIndex]);

  return null;
};

MultiPolylineComponent.defaultProps = {
  id: 'default',
  styles: {},
  zIndex: 1,
};

export default MultiPolylineComponent;
