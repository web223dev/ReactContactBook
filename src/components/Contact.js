import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import update from 'react-addons-update';
import ContactCreate from './ContactCreate';

export default class Contact extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      keyword: '',
      selectedKey: -1,
      ContactData: [
        { name: 'Abet', phone:'010-0020-2929-2212' },
        { name: 'sofy', phone:'010-0020-2929-2213' },
        { name: 'David', phone:'010-0020-2929-2214' },
        { name: 'Anthon', phone:'010-0020-2929-2215' },
        { name: 'Kobe', phone:'010-0020-2929-2216' }
      ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleChange(e){
    this.setState({
      keyword: e.target.value
    });
  }
  handleClick(key){
    this.setState({
      selectedKey: key
    });
    // console.log(key + 'is selected');
  }
  handleCreate(contact){
    this.setState({
      ContactData: update(this.state.ContactData, { $push: [contact]})
    });
  }
  handleRemove(){
    if(this.state.selectedKey < 0){
      return;
    }
    this.setState({
      ContactData: update(this.state.ContactData, { $splice: [[this.state.selectedKey,1]]}),
      selectedKey : -1
    });
  }
  handleEdit(name, phone){
    this.setState({
      ContactData: update(this.state.ContactData,
        {
          [this.state.selectedKey]:
            {
              name: {$set: name},
              phone: {$set: phone}
            }
        })
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
          <ContactInfo
            contact={contact}
            key={i}
            onClick={() => this.handleClick(i)}
          />
        );
      }
      );
    }
    // console.log(this.state.keyword);
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
        <ContactDetails
          isSelected={this.state.selectedKey != -1}
          contact={this.state.ContactData[this.state.selectedKey]}
          onRemove={this.handleRemove}
        />
        <ContactCreate
          onCreate = {this.handleCreate}
        />
      </div>
    );
  }
}
