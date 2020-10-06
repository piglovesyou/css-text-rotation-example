import { useEffect, useMemo, useRef, useState } from "react";
import {
  CSSTransition,
} from 'react-transition-group';

const interval = 2200;

function ForkMe({ href }: { href: string }) {
  return <a className="github-fork-ribbon"
            href={ href }
            data-ribbon="Fork me on GitHub"
            title="Fork me on GitHub"
  >
    Fork me on GitHub
  </a>;
}

export default function Page() {
  const [ isInitial, setInitial ] = useState(true);
  const [ index, setIndex ] = useState(0);
  const [ bordered, setBordered ] = useState(false);
  const ref = useRef<HTMLDivElement>();
  const items = useMemo(() => [ 'friend', 'enemy', 'no one' ], []);
  useEffect(() => {
    setTimeout(() => {
      setIndex(items[index + 1] ? index + 1 : 0);
      isInitial && setInitial(false);
    }, interval);
  }, [ index ]);

  return (
      <>
        <ForkMe
            href='https://github.com/piglovesyou/css-text-rotation-example'/>
        <div className="box">
          <div className="box__box">
            <label><input type="checkbox"
                          checked={ bordered }
                          onChange={ e => {
                            setBordered(e.target.checked);
                          } }
            /> Bordered</label>
          </div>
        </div>
        <div className={ `content ${isInitial ? 'initial' : ''} ${ bordered ? 'bordered' : 'not-bordered' }` } ref={ref}>
          <div className="statement">
            <span>Hi. I'm your</span>
            <span className="placeholder">
            { items.map((text, i) => (
                <CSSTransition in={ index === i }
                               timeout={ interval }
                               classNames="item"
                               key={ i }
                >
                  <span className="item" key={ i }>{ text }</span>
                </CSSTransition>
            )) }
          </span>
            .
          </div>
        </div>
      </>
  );
}
