import React, { FC, useRef, useEffect, useState, useCallback, useImperativeHandle } from 'react';
import style from './index.less';
import { ActionType } from '@ant-design/pro-table/lib/typing';

/**
 * @param autoHigh 自适应高,开启后卡片高度自适应屏幕.
 * @param cut 自定义折算 div - cut 的高度; 默认全高度.
 */
type childrenProps = {
  components?: React.ReactNode;
  title?: string;
  cut?: number;
  actionRef?: React.Ref<ActionType | undefined>;
  autoHigh?: boolean;
};
type stateType = {
  width: string | number;
  height: string | number;
};
const BorderBox: FC<childrenProps> = (props) => {
  const { title, children, autoHigh, cut = 0, actionRef: propsActionRef } = props;
  /** 通用的来操作子节点的工具类 */
  const actionRef = useRef<ActionType>();
  useImperativeHandle(propsActionRef, () => actionRef.current);
  const [size, setSize] = useState<stateType>({
    width: '',
    height: '',
  });

  const onResize = useCallback(() => {
    const dom = document.getElementsByClassName('ant-layout-content');
    if (dom) {
      setSize({
        width: dom[0].clientWidth || 'auto',
        height: dom[0].clientHeight - cut || 'auto',
      });
    }
  }, []);

  const createResize = () => {
    if (!autoHigh) return;
    window.addEventListener('resize', onResize);
    onResize();
  };

  useEffect(() => {
    createResize();
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className={style.cardBox} data-with={size.height} style={{ height: `${size.height}px` }}>
      {title && (
        <div className={style.title}>
          <div className={style.leftText}>
            <span className={style.icon} />
            <span className={style.name}>{title}</span>
          </div>
        </div>
      )}
      {/* 插槽内容 */}
      {children}
    </div>
  );
};

export default BorderBox;
