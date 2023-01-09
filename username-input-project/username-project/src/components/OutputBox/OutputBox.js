import OutputItem from './OutputItem';

import styles from './OutputBox.module.css'

const OutputBox = props => {
    return(
        <div className={`${styles.outputBox}`}>
            {props.items.map((item) => {
                return <OutputItem key={item.id} content={item.content} />
            })}
        </div>
    );
};

export default OutputBox;