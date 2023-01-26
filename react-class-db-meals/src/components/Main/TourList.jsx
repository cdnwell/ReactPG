import { Component } from 'react';
import TourContext from '../store/tour-context';

import classes from './TourList.module.css';

class TourList extends Component {
    constructor(){
        super();
        this.state = {
            tour_list : [],
        }
    }
    
    static contextType = TourContext;

    componentDidMount() {
        fetch("https://react-http-73797-default-rtdb.firebaseio.com/tour-list.json")
        .then(response => {
            return response.json();
        }).then(response => {
            const data = response;
            const store = [];
            for(const key in data) {
                store.push({ name : data[key].name, number : data[key].number, text : data[key].text , id : data[key].id});
            }

            this.setState({
                tour_list : [...store],
            });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.length !== this.state.tour_list.length){
            fetch("https://react-http-73797-default-rtdb.firebaseio.com/tour-list.json")
            .then(response => {
                return response.json();
            }).then(response => {
                const data = response;
                const store = [];
                for(const key in data) {
                    store.push({ name : data[key].name, number : data[key].number, text : data[key].text , id : data[key].id})
                }
    
                this.setState({
                    tour_list : [...store],
                });
            }); 
        }
    }

    addCartHandler (item) {
        const addItem = {...item, amount : 1};
        this.context.addItem(addItem);
    }

    render() {
        const tourTray = this.state.tour_list.map((item, idx) => {
            return <div key={idx} className={classes.list_box}>
                <div className={classes.list_name_box}>
                    <div className={classes.list_name}>{item.name}</div>
                    <span className={classes.list_text}>{item.text}</span>
                </div>
                <div className={classes.number_box}>
                    <p>$ {item.number}</p>
                    <button className={classes.number_button} onClick={this.addCartHandler.bind(this,item)}>+ Add Cart</button>
                </div>
            </div>
        });

        return <div className={classes.tour_list}>
            {tourTray.length === 0 && <p>There is no data</p>}
            {tourTray.length > 0 && tourTray}
        </div>
    }
}

export default TourList;