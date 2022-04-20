import React, { useEffect, FC, useRef, useContext, useState } from 'react';
import { MapContext } from '../context';
import useEvent from '../useEvent';

function builtStyle(opt: { [key: string]: TMap.CircleStyle }) {
  const styled: TMap.MultiPolygonStyleHash = {};
  Object.keys(opt).forEach(k => {
    styled[k] = new TMap.CircleStyle(opt[k]);
  });
  return styled;
}

function builtGeometry(geo: TMap.CircleGeometry[]) {
  return geo.map((item: TMap.CircleGeometry) => ({
    ...item,
    center: new TMap.LatLng(item.center.lat, item.center.lng),
  }));
}

type MultiCircleOptions = {
  id: string;
  zIndex?: number;
  styles?: TMap.MultiCircleStyleHash;
  geometries?: TMap.CircleGeometry[];
  [key: string]: any;
};

const MultiCircleComponent: FC<MultiCircleOptions> = ({
  id,
  zIndex = 1,
  styles = {},
  geometries = [],
  ...reset
}) => {
  const circleRef = useRef<any>(null);
  const [overlayIns, setOverlayIns] = useState<any>(null);
  const map = useContext(MapContext);

  useEffect(() => {
    if (map) {
      circleRef.current = new TMap.MultiCircle({
        id: id,
        map: map,
        styles: builtStyle(styles),
        geometries: builtGeometry(geometries),
        zIndex: zIndex,
      });
      setOverlayIns(circleRef.current);
    }
    return function cleanUp() {
      if (circleRef.current) {
        circleRef.current.setMap(null);
      }
    };
  }, [map]);

  useEvent(overlayIns, reset);

  useEffect(() => {
    circleRef?.current?.setGeometries(builtGeometry(geometries));
  }, [geometries]);

  useEffect(() => {
    circleRef?.current?.setStyles(builtStyle(styles));
  }, [styles]);

  return null;
};
MultiCircleComponent.defaultProps = {
  id: 'default',
  styles: {},
};
export default MultiCircleComponent;
