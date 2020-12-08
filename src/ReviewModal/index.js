import React, { Component } from 'react'
import { Form, Modal, Button, Label, TextArea, Segment, Checkbox, Header } from 'semantic-ui-react'


// how do i display info from another model (i.e., restaurants)? want to display:
//restaurant Name
//category / title

export default class ReviewModal extends Component {

  constructor(props) {
    super(props)

    this.state = {
      favorite: '',
      rating: '',
      social_distancing_rating: '',
      heat_lamps: false,
      comments: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.createReview(this.state)

    this.setState({
      favorite: '',
      rating: '',
      social_distancing_rating: '',
      heat_lamps: false,
      comments: ''
    })
  }

  createReview = async (reviewToAdd) => {
      try {
        const url = process.env.REACT_APP_API_URL + "/api/v1/reviews/" + this.props.idOfRestaurantToReview
        const createReviewResponse = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(reviewToAdd)
        })
        const createReviewJson = await createReviewResponse.json()

        if(createReviewResponse.status === 201 || createReviewResponse.status === 200){
          this.props.closeModal()
        }

      } catch(err) {
        console.log("Error adding review", err)
      }
    }

  render() {
    return(
      <Modal open={true} closeIcon={true} onClose={this.props.closeModal}>

        <Header>
          <h2>Review Restaurant</h2>
        </Header>

        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>

          <Label horizontal>Rating:</Label>
          <Form.Input
            type="number"
            name="rating"
            max="5"
            min="1"
            onChange={this.handleChange}
          />

          <Label horizontal>Social Distancing Rating:</Label>
          <Form.Input
            type="number"
            name="social_distancing_rating"
            onChange={this.handleChange}
          />

          <Label horizontal>Heat Lamps:</Label>
          <Form.Input
            type="boolean"
            control={Checkbox}
            name="heat_lamps"
            onChange={this.handleChange}
          />

          <Label horizontal>Comments:</Label>
          <Form.TextArea
            name="comments"
            value={this.state.comments}
            placeholder="Enter comments"
            onChange={this.handleChange}
          />

          <Modal.Actions>
            <Button type='submit'>Submit</Button>
          </Modal.Actions>

          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}