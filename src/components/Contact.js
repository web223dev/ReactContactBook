import React from 'react';
import ContactInfo from './ContactInfo';

export default class Contact extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      keyword: '',
      ContactData: [
        { name: 'Abet', phone:'010-0020-2929-2212' },
        { name: 'sofy', phone:'010-0020-2929-2213' },
        { name: 'David', phone:'010-0020-2929-2214' },
        { name: 'Anthon', phone:'010-0020-2929-2215' },
        { name: 'Kobe', phone:'010-0020-2929-2216' }
      ]
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({
      keyword: e.target.value
    });
  }

  render(){
    const mapToComponent = (data) => {
      data.sort();
      data = data.filter(
        (contact) => {
          return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
        }
      );
      return data.map((contact, i) => {
        return (
          <ContactInfo contact={contact} key={i}/>
        );
      }
      );
    }
    console.log(this.state.keyword);
    return (
      <div>
        <h1>Contact</h1>
        <input
          name="keyword"
          placeholder="Search"
          value={this.state.keyword}
          onChange={this.handleChange}
        />
        {mapToComponent(this.state.ContactData)}
      </div>
    );
  }
}
