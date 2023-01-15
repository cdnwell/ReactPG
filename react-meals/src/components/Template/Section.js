import MainText from '../Content/MainText';
import MenuBox from './MenuBox';

import classes from './Section.module.css';

const Section = () => {
    return (
        <div>
            <MainText className={`${classes.section_root}`} />
            <MenuBox className={`${classes.section__menu_box}`} />
        </div>
    );
};

export default Section;