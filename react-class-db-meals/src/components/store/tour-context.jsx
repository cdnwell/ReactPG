import React from 'react';

const TourContext = React.createContext({
    items : [],
    totalAmount : 0,
    addItem : (item) => {},
    removeItem : (id) => {},
});

export default TourContext;