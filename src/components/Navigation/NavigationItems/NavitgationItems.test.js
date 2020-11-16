/*
@enzyme
    we need to create instance of component as it render to real dom and to have a look
    for is Auth prop is false.
    For this we no need to render entire dom as <nav /> is a tiny peiece
    that is enzyme comes in,  it makes to render standalone only this component
@enzyme to react version
    we need to configure enzyme and connect it to react
    we need adapter from enzyme-adapter-react-16
@helper method 
    we need shallow to render react components
    it renders component but content isnt  deeply rendered
    (i.e) if you have components in your compnents then compnents inisde your compnent will be as placeholders

*/
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

//connecting enzyme to react
configure({ adapter: new Adapter() });

//methods are avaliable...
//@arguments (desc, testing func)
//test Suite
describe("<navigationItems />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  //Tests
  it("should render two <NavigationItems /> elements if not authorized", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render three <NavigationItems /> elements if  authorized", () => {
    // wrapper = shallow(<NavigationItems isAuthenticated/>);
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("should an exact logout button", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});
