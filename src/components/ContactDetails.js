import React from 'react';

class ContactDetails extends React.Component{
  render(){

    const details = (
      <div>
        <p>{this.props.contact.name}</p>
        <p>{this.props.contact.phone}</p>
      </div>
    );
    const blank = (<div>Not Selected</div>);
    return(
      <div>
        <h2>Details</h2>
        <div>{this.props.isSelected ? details : blank}</div>
      </div>
    );
  }
}

ContactDetails.defaultProps = {
  contact: {
    name: '',
    phone: ''
  }
}

export default ContactDetails;
