import styles from './OutputItem.module.css';

const OutputItem = props => {
    return (
        <div className={`${styles.items}`}>
            {props.content}
        </div>
    );
};

export default OutputItem;