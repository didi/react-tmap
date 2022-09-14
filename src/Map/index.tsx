import loadSDK from '../loadSDK';
import React, {
  useEffect,
  FC,
  useRef,
  useState,
  useImperativeHandle,
} from 'react';
import { MapContext } from '../context';
import useEvent from '../useEvent';

const defaultCenter = {
  lat: 39.98412,
  lng: 116.307484,
};

type BoundsType = {
  sw: { lat: number; lng: number };
  ne: { lat: number; lng: number };
};

type ControlConfig = { position?: ControlPos; className?: string };

type ControlPos =
  | 'TOP_LEFT'
  | 'TOP_CENTER'
  | 'TOP_RIGHT'
  | 'CENTER_LEFT'
  | 'CENTER'
  | 'CENTER_RIGHT'
  | 'BOTTOM_LEFT'
  | 'BOTTOM_CENTER'
  | 'BOTTOM_RIGHT';

type TMapProps = {
  version: string;
  mapKey: string;
  class?: string;
  style?: Record<string, string>;
  center?: { lat: number; lng: number };
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  rotation?: number;
  pitch?: number;
  scale?: number;
  offset?: { x: number; y: number };
  draggable?: boolean;
  scrollable?: boolean;
  doubleClickZoom?: boolean;
  boundary?: TMap.LatLngBounds;
  mapStyleId?: string;
  baseMap?: TMap.BaseMap;
  viewMode?: '2D' | '3D';
  showControl?: boolean;
  control?: {
    scale?: ControlConfig;
    zoom?: ControlConfig;
    rotate?: ControlConfig;
  };
  duration?: number;
  libraries?: string[];
  onLoad?: (map: TMap.Map) => void;
  [key: string]: any;
};

const defaultProps = {
  version: '1.exp',
  mapKey: '',
  class: '',
  style: undefined,
  center: { lat: 40.040452, lng: 116.273486 },
  zoom: 17,
  minZoom: 3,
  maxZoom: 20,
  rotation: 0,
  pitch: 0,
  scale: 1,
  offset: { x: 0, y: 0 },
  draggable: true,
  scrollable: true,
  doubleClickZoom: true,
  baseMap: undefined,
  boundary: undefined,
  viewMode: undefined,
  showControl: true,
  duration: 500,
  libraries: [],
  onLoad: () => {},
};

const TMapComponent: FC<TMapProps> = React.forwardRef((props, ref) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<TMap.Map | undefined>();
  const mapRef = useRef(map);
  mapRef.current = map;

  const setMapCtrl = (
    mapIns: TMap.Map,
    ctrlId: TMap.constants.DEFAULT_CONTROL_ID,
    config: ControlConfig,
  ) => {
    if (!config) {
      mapIns.removeControl(ctrlId);
      return;
    }
    const ctrl = mapIns.getControl(ctrlId);
    const { position, className } = config;
    if (position) {
      ctrl.setPosition((TMap.constants.CONTROL_POSITION as any)[position]);
    }
    if (className) {
      ctrl.setClassName(className);
    }
  };

  const initMap = () => {
    loadSDK(props.version || '1.exp', props.mapKey, props.libraries).then(v => {
      if (domRef.current) {
        const centerGeo = props.center || defaultCenter;
        const center = new TMap.LatLng(centerGeo.lat, centerGeo.lng);

        const mapIns = new TMap.Map(domRef.current, {
          center,
          zoom: props.zoom,
          minZoom: props.minZoom,
          maxZoom: props.maxZoom,
          rotation: props.rotation,
          pitch: props.pitch,
          scale: props.scale,
          offset: props.offset,
          draggable: props.draggable,
          scrollable: props.scrollable,
          doubleClickZoom: props.doubleClickZoom,
          boundary: props.boundary,
          mapStyleId: props.mapStyleId,
          baseMap: props.baseMap,
          viewMode: props.viewMode!,
          showControl: props.showControl,
        });

        // 控件的显示隐藏要前置，不然控件会先出现再隐藏
        if (props.control) {
          setMapCtrl(
            mapIns,
            TMap.constants.DEFAULT_CONTROL_ID.SCALE,
            props.control.scale!,
          );
          setMapCtrl(
            mapIns,
            TMap.constants.DEFAULT_CONTROL_ID.ZOOM,
            props.control.zoom!,
          );
          setMapCtrl(
            mapIns,
            TMap.constants.DEFAULT_CONTROL_ID.ROTATION,
            props.control.rotate!,
          );
        }
        setMap(mapIns);
      }
    });
  };

  useEffect(() => {
    initMap();

    return () => {
      mapRef.current?.destroy();
    };
  }, []);

  useEvent(map, props);

  useEffect(() => {
    const centerGeo = props.center || defaultCenter;
    map?.panTo(new TMap.LatLng(centerGeo.lat, centerGeo.lng), {
      duration: props.duration || 500,
    });
  }, [props.center]);

  useEffect(() => {
    map?.zoomTo(props.zoom || 17, {
      duration: props.duration || 500,
    });
  }, [props.zoom]);

  useEffect(() => {
    map?.rotateTo(props.rotation || defaultProps.rotation, {
      duration: props.duration || 500,
    });
  }, [props.rotation]);

  useEffect(() => {
    map?.pitchTo(props.pitch || defaultProps.pitch, {
      duration: props.duration || 500,
    });
  }, [props.pitch]);

  useEffect(() => {
    map?.setScale(props.scale || defaultProps.scale);
  }, [props.scale]);

  useEffect(() => {
    map?.setOffset(props.offset || defaultProps.offset);
  }, [props.offset]);

  useEffect(() => {
    map?.setDraggable(props.draggable || defaultProps.draggable);
  }, [props.draggable]);

  useEffect(() => {
    map?.setScrollable(props.scrollable || defaultProps.scrollable);
  }, [props.scrollable]);

  useEffect(() => {
    map?.setDoubleClickZoom(
      props.doubleClickZoom || defaultProps.doubleClickZoom,
    );
  }, [props.doubleClickZoom]);

  useEffect(() => {
    if (props.boundary && map) {
      map.setBoundary(props.boundary);
    }
  }, [props.boundary]);

  useEffect(() => {
    if (map && props.control) {
      setMapCtrl(
        map,
        TMap.constants.DEFAULT_CONTROL_ID.SCALE,
        props.control.scale!,
      );
      setMapCtrl(
        map,
        TMap.constants.DEFAULT_CONTROL_ID.ZOOM,
        props.control.zoom!,
      );
      setMapCtrl(
        map,
        TMap.constants.DEFAULT_CONTROL_ID.ROTATION,
        props.control.rotate!,
      );
    } else {
      map?.removeControl(TMap.constants.DEFAULT_CONTROL_ID.SCALE);
      map?.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ROTATION);
      map?.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ZOOM);
    }
  }, [props.control, map]);

  // TODO: 提供给ref实例使用
  useImperativeHandle(
    ref,
    () => ({
      map,
    }),
    [map],
  );

  useEffect(() => {
    if (map && props.onLoad) {
      props.onLoad(map);
    }
  }, [map]);

  const renderChildren = () => {
    return React.Children.map(props.children, (child: any) => {
      if (child) {
        const cType = child.type;
        /* 针对下面两种组件不注入地图相关属性
         * 1. 明确声明不需要注入的
         * 2. DOM 元素
         */
        if (typeof cType === 'string') {
          return child;
        }
        // map 实例没有初始化时不渲染组件
        if (!map) {
          return null;
        }

        return React.cloneElement(child);
      }
      return child;
    });
  };

  return (
    <MapContext.Provider value={map}>
      <div
        ref={domRef}
        style={props.style ? props.style : { height: '100%', width: '100%' }}
      >
        {renderChildren()}
      </div>
    </MapContext.Provider>
  );
});

TMapComponent.defaultProps = defaultProps;

export default TMapComponent;
