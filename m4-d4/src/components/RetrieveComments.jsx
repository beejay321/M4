import React from "react";
import { ListGroup, Card, FormControl, Button } from "react-bootstrap";

class RetrieveComments extends React.Component {
  state = {
    items: [],
    asin: "",
    isLoading: false,
    isError: false,
  };

  componentDidMount = async () => {
    this.setState({
      isLoading: true,
      asin: this.props.asin,
    });

    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" +
          this.state.asin,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgwMjEyYmIxZjBmYjAwMTVkOTE3OTkiLCJpYXQiOjE2MTkwMDk4MzUsImV4cCI6MTYyMDIxOTQzNX0.sjaCwExKLRwOY8S2I_evvMJ0RFmAb_2kU2aqNqyAakc",
          },
        }
      );
      console.log(response);
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        this.setState({ items: data, isError: false, isLoading: false });
      } else {
        console.log(" we got an error");
        this.setState({ isError: true, isLoading: false });
      }
    } catch (error) {
      console.log(error);
      this.setState({ isError: true, isLoading: false });
    }
  };

  deleteComment = async () => {
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" +
          this.props.asin,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgwMjEyYmIxZjBmYjAwMTVkOTE3OTkiLCJpYXQiOjE2MTkwMDk4MzUsImV4cCI6MTYyMDIxOTQzNX0.sjaCwExKLRwOY8S2I_evvMJ0RFmAb_2kU2aqNqyAakc",
          },
        }
      );
      if (!response.ok) throw new Error("Something went wrong");

      alert("Event deleted successfully");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  render() {
    return (
      <div>
        <h6>Comments </h6>
        {
          <Card style={{ width: "10rem" }}>
            <ListGroup key={this.props.item.asin}>
              <ListGroup.Item>
                <img
                  width={120}
                  src={this.props.item.img}
                  alt={this.props.item.title}
                />
              </ListGroup.Item>
              {this.state.items.map((itm) => (
                <div>
                  <ListGroup.Item key={itm._id}>{itm.comment}</ListGroup.Item>
                  <Button
                    onClick={this.deleteComment}
                    variant="danger"
                    type="submit"
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </ListGroup>
          </Card>
        }
      </div>
    );
  }
}
export default RetrieveComments;
