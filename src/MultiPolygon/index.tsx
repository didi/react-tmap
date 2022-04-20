import React, { useEffect, FC, useRef, useContext, useState } from 'react';
import { MapContext } from '../context';
import useEvent from '../useEvent';

export function builtStyle(opt: { [key: string]: TMap.PolygonStyleOptions }) {
  const styled: TMap.MultiPolygonStyleHash = {};
  Object.keys(opt).forEach(k => {
    styled[k] = new TMap.PolygonStyle(opt[k]);
  });
  return styled;
}

export function buildGeometries<T>(
  geometries: TMap.PolygonGeometry<T>[],
): TMap.PolygonGeometry<T>[] {
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

type MultiPolygonOptions = {
  id: string;
  zIndex?: number; // 图层绘制顺序
  styles?: TMap.MultiPolygonStyleHash; //	多边形的相关样式。
  geometries?: TMap.PolygonGeometry[]; //	多边形数据数组。
  [key: string]: any;
};

const MultiPolygonComponent: FC<MultiPolygonOptions> = ({
  id,
  zIndex,
  styles,
  geometries,
  ...reset
}) => {
  const polygonRef = useRef<any>(null);
  const [overlayIns, setOverlayIns] = useState<any>(null);

  const map = useContext(MapContext);

  const init = () => {
    if (map) {
      polygonRef.current = new TMap.MultiPolygon({
        id: id,
        map: map,
        styles: builtStyle(styles || {}),
        geometries: buildGeometries(geometries || []),
      });
      setOverlayIns(polygonRef.current);
    }
  };

  useEvent(overlayIns, reset);

  useEffect(() => {
    init();
    return () => {
      if (polygonRef.current) {
        polygonRef.current.setMap(null);
      }
    };
  }, [map]);

  useEffect(() => {
    polygonRef?.current?.setGeometries(buildGeometries(geometries || []));
  }, [geometries]);

  useEffect(() => {
    polygonRef?.current?.setStyles(builtStyle(styles || {}));
  }, [styles]);

  return null;
};

MultiPolygonComponent.defaultProps = {
  id: 'default',
  styles: {},
  zIndex: 1,
};

export default MultiPolygonComponent;
