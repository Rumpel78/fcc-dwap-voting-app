import { Button, ControlLabel, FormGroup, FormControl, Col, HelpBlock } from 'react-bootstrap';
import React from 'react';

class OptionListItem extends React.Component {
  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
    this.change = this.change.bind(this);
  }

  click() {
    this.props.onRemove(this.props.option.Key);
  }

  change(event) {
    this.props.onChange({ Key: this.props.option.Key, Name: event.target.value });
  }

  render() {
    const {
      option, errors,
    } = this.props;

    return (
      <FormGroup controlId='formHorizontalName' validationState={errors.options[option.Key] && 'error'} >
        <Col componentClass={ControlLabel} sm={3}>
          Option {option.Key + 1}
        </Col>
        <Col sm={7}>
          <FormControl name='option' type='text' placeholder='Enter option' onChange={this.change} value={option.Name} />
          <FormControl.Feedback />
          {errors.options[option.Key] && <HelpBlock>{errors.options[option.Key]}</HelpBlock>}
        </Col>
        <Col sm={2}>
          <Button bsSize='xsmall' bsStyle='danger' onClick={this.click}>Remove</Button>
        </Col>
      </FormGroup>
    );
  }
}

export default OptionListItem;
