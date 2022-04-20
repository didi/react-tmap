import React, { useEffect, FC, useContext, useState, useRef } from 'react';
import { MapContext } from '../context';
import useEvent from '../useEvent';

function builtGeometry(geo: TMap.LabelGeometry[]) {
  return geo.map((item: TMap.LabelGeometry) => ({
    ...item,
    position: new TMap.LatLng(item.position.lat, item.position.lng),
  }));
}

function builtStyle(opt: { [key: string]: TMap.LabelStyle }) {
  const styled: TMap.MultiLabelStyleHash = {};

  Object.keys(opt).forEach(k => {
    styled[k] = new TMap.LabelStyle(opt[k]);
  });
  return styled;
}

type MultiLabelOptions = {
  id: string;
  styles?: TMap.MultiLabelStyleHash; // 文本标注的相关样式
  geometries?: TMap.LabelGeometry[]; // 文本标注数据数组
  enableCollision?: boolean; // 是否开启图层内部的文本标注碰撞
  [key: string]: any;
};

const MultiLabelComponent: FC<MultiLabelOptions> = props => {
  const labelRef = useRef<any>(null);
  const [overlayIns, setOverlayIns] = useState<any>(null);
  const map = useContext(MapContext);

  useEffect(() => {
    if (map) {
      labelRef.current = new TMap.MultiLabel({
        id: props.id,
        map: map,
        styles: builtStyle(props.styles || {}),
        geometries: builtGeometry(props.geometries || []),
        enableCollision: props.enableCollision,
      });
      setOverlayIns(labelRef.current);
    }
    return function cleanUp() {
      if (labelRef.current) {
        labelRef.current.setMap(null);
      }
    };
  }, [map]);

  useEvent(overlayIns, props);

  useEffect(() => {
    labelRef?.current?.setGeometries(builtGeometry(props.geometries || []));
  }, [props.geometries]);

  useEffect(() => {
    labelRef?.current?.setStyles(builtStyle(props.styles || {}));
  }, [props.styles]);

  return null;
};

MultiLabelComponent.defaultProps = {
  id: 'default',
  styles: {},
  enableCollision: false,
};

export default MultiLabelComponent;
