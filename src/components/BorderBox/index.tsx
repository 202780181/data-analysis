import React,{FC} from 'react';
import style from './index.less';

type childrenProps = {
  components?: React.ReactNode;
  title?: string
}

const BorderBox:FC<childrenProps> = (props)=> {
  const {title, children} = props;
  return (
    <div className={style.cardBox}>
      {
        title && (
          <div className={style.title}>
            <div className={style.leftText}>
              <span className={style.icon}></span>
              <span className={style.name}>{title}</span>
            </div>
          </div>
        )
      }
      {children}
    </div>
  )
}

export default BorderBox
