import useEvent from '@/useEvent';
import React, { useEffect, FC, useContext, useRef } from 'react';
import { MapContext } from '../context';

const getLatLng = (latlngData: TMap.LatLngData) => {
  return new TMap.LatLng(latlngData.lat, latlngData.lng);
};

type InfoWindowOptions = {
  id: string;
  content: string;
  position: TMap.LatLngData;
  visible?: boolean;
  offset?: object;
  zIndex?: number;
  enableCustom?: boolean;
  [key: string]: any;
};

const InfoWindowComponent: FC<InfoWindowOptions> = props => {
  const map = useContext(MapContext);
  const infoWindowRef = useRef<any>(null);
  useEvent(infoWindowRef.current, props);

  useEffect(() => {
    if (map) {
      const center = getLatLng(props.position);

      infoWindowRef.current = new TMap.InfoWindow({
        map: map,
        position: center, // 设置信息框位置
        content: props.content, // 设置信息框内容
        zIndex: props.zIndex!,
        offset: props.offset!,
        enableCustom: props.enableCustom!,
      });

      infoWindowRef.current.on('closeclick', () => {
        if (props.onClose) {
          props.onClose();
        }
        if (props.onCloseClick) {
          props.onCloseClick();
        }
        window.dispatchEvent(new CustomEvent('close-click'));
      });
    }
    return function cleanUp() {
      if (infoWindowRef.current) {
        infoWindowRef.current.destroy();
        infoWindowRef.current.setMap(null);
      }
    };
  }, [map]);

  useEffect(() => {
    if (props.visible) {
      infoWindowRef?.current?.open();
    } else {
      infoWindowRef?.current?.close();
    }
  }, [props.visible]);

  useEffect(() => {
    infoWindowRef?.current?.setPosition(getLatLng(props.position));
  }, [props.position]);

  useEffect(() => {
    infoWindowRef?.current?.setContent(props.content);
  }, [props.content]);

  return null;
};

InfoWindowComponent.defaultProps = {
  id: 'default',
  content: '',
  zIndex: 0,
  offset: { x: 0, y: 0 },
  enableCustom: false,
};

export default InfoWindowComponent;
