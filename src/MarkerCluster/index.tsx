import React, { useEffect, FC, useContext, useRef, useState } from 'react';
import { MapContext } from '../context';
import useEvent from '../useEvent';

function builtGeometry(geo: TMap.PointGeometry[]) {
  return geo.map((item: TMap.PointGeometry) => ({
    ...item,
    position: new TMap.LatLng(item.position.lat, item.position.lng),
  }));
}

type MarkerClusterOptions = {
  id: string;
  enableDefaultStyle?: boolean;
  minimumClusterSize?: number;
  geometries?: TMap.PointGeometry[];
  zoomOnClick?: boolean;
  gridSize?: number;
  averageCenter?: boolean;
  maxZoom?: number;
  [key: string]: any;
};

const MarkerClusterComponent: FC<MarkerClusterOptions> = props => {
  const map = useContext(MapContext);
  const [overlayIns, setOverlayIns] = useState<any>(null);
  const markerClusterRef = useRef<any>(null);

  useEffect(() => {
    if (map) {
      markerClusterRef.current = new TMap.MarkerCluster({
        id: props.id,
        map: map,
        geometries: builtGeometry(props.geometries || []),
        enableDefaultStyle: props.enableDefaultStyle,
        minimumClusterSize: props.minimumClusterSize,
        zoomOnClick: props.zoomOnClick,
        gridSize: props.gridSize,
        averageCenter: props.averageCenter,
        maxZoom: props.maxZoom,
      });

      setOverlayIns(markerClusterRef.current);
    }
    return function cleanUp() {
      if (markerClusterRef.current) {
        markerClusterRef.current.setMap(null);
      }
    };
  }, [map]);

  useEvent(overlayIns, props);

  useEffect(() => {
    markerClusterRef?.current?.setGeometries(
      builtGeometry(props.geometries || []),
    );
  }, [props.geometries]);

  return null;
};

MarkerClusterComponent.defaultProps = {
  id: 'default',
  enableDefaultStyle: true,
  minimumClusterSize: 2,
  zoomOnClick: true,
  gridSize: 60,
  averageCenter: false,
  maxZoom: 16,
};

export default MarkerClusterComponent;
