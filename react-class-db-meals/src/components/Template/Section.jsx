import { Component } from "react";
import Introduce from "../Main/Introduce";
import SendForm from "../Main/SendForm";

import classes from "./Section.module.css";

const INTRODUCE_ITEM = [
  "A tour guide is a professional who leads groups of individuals on tours, excursions, and sightseeing trips.",
  "They are responsible for providing information about the places visited, as well as ensuring the safety and enjoyment of all members of the group. ",
  "Tour guides typically have extensive knowledge of the areas they are leading tours in, and are able to provide historical, cultural, and other interesting information about the sights and landmarks visited. ",
];

const TOUR_LIST = [
  { city : 'Namnan', explain : 'City tour where is by the river. you can walk the street along the river.' },
  { city : 'Puyang', explain : 'You can climb the hill and see the ocean under the cliff.' },
  { city : 'Liverty', explain : 'There is a jeep driving through the desolate land.' },
  { city : 'Manus', explain : 'Antique buildings are along the street. You can walk there and buy things from stores.' },
]

class Section extends Component {
  constructor() {
    super();
    this.state = {
      isIntroduceClicked: false,
      isPostClicked: false,
      turningStateA: { },
      turningStateB: { },
    };
  }

  onIntroduceClicked = (data) => {
    this.setState({
      isIntroduceClicked: data,
    });
  };

  onSendFormClicked = () => {
    this.setState({
      isPostClicked: true,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isIntroduceClicked !== this.state.isIntroduceClicked) {
      this.setState({
        turningStateA: {
          transform: `rotateY(-180deg)`,
        },
        turningStateB: {
          transform: `rotateY(0deg)`,
        },
      });

      setTimeout(() => {
        this.setState({
          isIntroduceClicked: false,
        });
      }, 1000);
    }

    if (prevState.isPostClicked !== this.state.isPostClicked) {
      this.setState({
        turningStateA: {
          transform: `rotateY(0deg)`,
        },
        turningStateB: {
          transform: `rotateY(-180deg)`,
        },
      });

      setTimeout(() => {
        this.setState({
          isPostClicked: false,
        });
      }, 1000);
    }
  }
  
  render() {
    return (
      <div className={classes.introduce_card}>
        <Introduce
          items={INTRODUCE_ITEM}
          list={TOUR_LIST}
          onClick={this.onIntroduceClicked}
          className={`${classes.introduce + " " + classes.front}`}
          style={this.state.turningStateA}
        />
        <SendForm
          className={classes.back}
          onClick={this.onSendFormClicked}
          style={this.state.turningStateB}
        />
      </div>
    );
  }
}

export default Section;
