import React from 'react'
import  {configure,shallow}from 'enzyme';
import  Adapter from 'enzyme-adapter-react-16';
import Navigationitems from './NavigationItems';
import Navigationitem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<Navigationitems />', ()=>{
    let wrapper;
    beforeEach(() => {
        wrapper= shallow(<Navigationitems />);
    })

    it('should render 2 <Navigationitems /> element if not authenticated ', ()=> {
        expect(wrapper.find(Navigationitem)).toHaveLength(2);
    }); 

    it('should render 3 <Navigationitems /> element if not authenticated ', ()=> {
//        wrapper= shallow(<Navigationitems isAuthenticated/>);
        wrapper.setProps({isAuthenticated:true})
        expect(wrapper.find(Navigationitem)).toHaveLength(3);
    }); 
    
});



// describe('<Navigationitems />', ()=>{
//     it('should render 2 <Navigationitems /> element if not authenticated ', ()=> {
//         const wrapper= shallow(<Navigationitems /> );
//         expect(wrapper.find(Navigationitem)).toHaveLength(2);
//     }); 

//     it('should render 3 <Navigationitems /> element if authenticated ', ()=> {
//         const isAuthenticated=true;
//         const wrapper= shallow(<Navigationitems isAuthenticated/> );
//         expect(wrapper.find(Navigationitem)).toHaveLength(3);
//     }); 
    
// });
