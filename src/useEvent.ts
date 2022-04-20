/*
 * @Author: baoluoqiang
 * @LastEditors: baoluoqiang
 * @Description:
 */
import { useEffect } from 'react';

const useEvent = (
  overlay: TMap.GeometryOverlay | TMap.Map | undefined,
  props: any,
) => {
  useEffect(() => {
    if (!overlay) {
      return;
    }
    const events: string[] = [];
    const listeners: Function[] = [];

    Object.keys(props).forEach(attr => {
      if (attr.indexOf('on') === 0) {
        const eventName = attr[2].toLowerCase() + attr.slice(3);
        events.push(eventName);
        if (typeof props[attr] === 'function') {
          listeners.push(props[attr]);
        }
      }
    });

    events.forEach((eventName, i) => {
      if (eventName === 'getinstance') {
        return;
      }
      overlay.on(eventName, listeners[i]);
    });

    return () => {
      events.forEach((eventName, i) => {
        if (eventName === 'getinstance') {
          return;
        }
        overlay.off(eventName, listeners[i]);
      });
    };
  }, [overlay, props]);

  useEffect(() => {
    if (!overlay) {
      return;
    }

    if (props.onGetInstance && typeof props.onGetInstance === 'function') {
      props.onGetInstance(overlay);
    }
  }, [overlay]);
};

export default useEvent;
