import React, {
  useEffect,
  FC,
  useRef,
  useContext,
  useState,
  useImperativeHandle,
} from 'react';
import { MapContext } from '../context';
import useEvent from '../useEvent';

function builtStyle(opt: { [key: string]: TMap.MarkerStyle }) {
  const styled: TMap.MultiMarkerStyleHash = {};
  Object.keys(opt).forEach(k => {
    styled[k] = new TMap.MarkerStyle(opt[k]);
  });
  return styled;
}

function builtGeometry(geo: TMap.PointGeometry[]) {
  return geo.map((item: TMap.PointGeometry) => ({
    ...item,
    position: new TMap.LatLng(item.position.lat, item.position.lng),
  }));
}

type MultiMarkerOptions = {
  id: string;
  styles?: TMap.MultiMarkerStyleHash;
  geometries?: TMap.PointGeometry[];
  [key: string]: any;
};

const MultiMarkerComponent: FC<MultiMarkerOptions> = React.forwardRef(
  ({ id, styles, geometries, ...reset }, ref) => {
    const markerRef = useRef<any>(null);
    const [overlayIns, setOverlayIns] = useState<any>(null);
    const map = useContext(MapContext);

    const init = () => {
      if (map) {
        markerRef.current = new TMap.MultiMarker({
          id: id,
          map: map,
          styles: builtStyle(styles || {}),
          geometries: builtGeometry(geometries || []),
        });

        setOverlayIns(markerRef.current);
      }
    };

    useEvent(overlayIns, reset);

    useEffect(() => {
      init();
      return function cleanUp() {
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }
      };
    }, [map]);

    // 提供给ref实例使用
    useImperativeHandle(ref, () => ({
      getStyles: markerRef?.current?.getStyles,
      moveAlong: markerRef?.current?.moveAlong.bind(markerRef.current),
      stopMove: markerRef?.current?.stopMove.bind(markerRef.current),
      pauseMove: markerRef?.current?.pauseMove.bind(markerRef.current),
      resumeMove: markerRef?.current?.resumeMove.bind(markerRef.current),
      on: markerRef?.current?.on.bind(markerRef.current),
    }));

    useEffect(() => {
      markerRef?.current?.setGeometries(builtGeometry(geometries || []));
    }, [geometries]);

    useEffect(() => {
      markerRef?.current?.setStyles(builtStyle(styles || {}));
    }, [styles]);

    return null;
  },
);

MultiMarkerComponent.defaultProps = {
  id: 'default',
  styles: {},
};

export default MultiMarkerComponent;
