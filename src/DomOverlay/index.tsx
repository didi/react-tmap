/* eslint-disable func-names */
/* eslint-disable max-classes-per-file */
import React from 'react';
import { MapContext } from '../context';

type DomData = {
  position: { lat: number; lng: number };
  data: any;
};

interface Props {
  data: DomData[];
  createDom: (props: { data: DomData }) => HTMLElement;
  onClick: (props: DomData, e: any) => void;
}

class DomOverlayComponent extends React.Component<Props> {
  DomClass: any;
  map?: TMap.Map;
  DomClassList?: any[];

  componentDidMount() {
    const { onClick, createDom } = this.props;

    function DomClass(
      this: any,
      options: {
        data: DomData;
        map: TMap.Map;
        this: any;
        position: TMap.LatLngData;
      },
    ) {
      TMap.DOMOverlay.call(this, options);
    }
    DomClass.prototype = new TMap.DOMOverlay();
    // 初始化
    DomClass.prototype.onInit = function(this: any, options: any) {
      this.position = options.position;
      this.data = options.data;
    };

    // 销毁时需解绑事件监听
    DomClass.prototype.onDestroy = function(this: any) {
      if (this.onClick) {
        this.ele.removeEventListener('click', this.onClick);
      }
    };

    // 创建DOM元素，返回一个DOMElement，使用this.dom可以获取到这个元素
    DomClass.prototype.createDOM = function(this: any) {
      this.ele = document.createElement('div');
      this.ele.style.cssText = 'position:absolute;top:0px;left:0px;';

      const dom = createDom({ ...this.data });
      this.ele.append(dom);

      if (onClick) {
        this.onClick = (e: any) => {
          onClick(this.data, e);
        };
        this.ele.addEventListener('click', this.onClick);
      }
      return this.ele;
    };

    // 更新DOM元素，在地图移动/缩放后执行
    DomClass.prototype.updateDOM = function(this: any) {
      if (!this.map) {
        return;
      }
      // 经纬度坐标转容器像素坐标
      const pixel = this.map.projectToContainer(this.position);
      // 使饼图中心点对齐经纬度坐标点
      const left = `${pixel.getX() - this.dom.clientWidth / 2}px`;
      const top = `${pixel.getY() - this.dom.clientHeight / 2}px`;
      this.dom.style.transform = `translate(${left}, ${top})`;
    };

    this.map = this.context as any;
    this.DomClass = DomClass;
    this.initMapEle();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.data !== prevProps.data) {
      this.destroyMapEle();
      this.initMapEle();
    }
  }

  componentWillUnmount() {
    this.destroyMapEle();
  }

  initMapEle() {
    this.DomClassList = this.props.data.map(item => {
      return new this.DomClass({
        map: this.map,
        position: new TMap.LatLng(item.position.lat, item.position.lng),
        data: item,
      });
    });
  }

  destroyMapEle() {
    this.DomClassList?.forEach(item => {
      item?.destroy();
    });
  }

  render() {
    return null;
  }
}

DomOverlayComponent.contextType = MapContext;

export default DomOverlayComponent;
