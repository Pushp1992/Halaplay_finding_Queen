import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import '../ResponsePage/responsePage.css';

export default class ResponsePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            queensInfo: {}
        }
    }
    componentDidMount() {
        let mountedData = this.props.location.state.queenResponseData;

        this.setState({ queensInfo: mountedData })
        console.log("props response", this.props.location.state.queenResponseData)
        console.log("state response", this.state.queensInfo)
    }
    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container fixed>
                    <Typography className="responseTypography" component="div">
                        <Grid container spacing={2}>
                            <Grid item sm={11}>
                                {
                                    (this.props.location.state.queenResponseData.resultStatus === "success") ?
                                        <div>
                                            <h3>
                                                <label> {this.props.location.state.queenResponseData.resultStatus} </label>
                                                <label> <i className="fa fa-smile-o fa-3x happy" aria-hidden="true"></i> </label>
                                            </h3>
                                            <label>Congratulations on finding the Queen, King Hala is pleased.</label>
                                            <h5>Queen is found on planet <b className="happy"> {this.props.location.state.queenResponseData.planetName} </b></h5>
                                            <h5> Travel Time taken to reach the Queen is <b className="happy"> {this.props.location.state.queenResponseData.travelTime} </b></h5>
                                        </div>
                                        :
                                        <div>
                                            <h3>
                                                <label> {this.props.location.state.queenResponseData.resultStatus} </label>
                                                <label> <i className="fa fa-frown-o fa-3x sad" aria-hidden="true"></i> </label>
                                            </h3>
                                            <label>Queen is not found, King Hala is Angry.</label>
                                            <h5> {this.props.location.state.queenResponseData.reason} </h5>
                                        </div>
                                }
                                <Link to="/game-view">
                                    <Button variant="contained" color="primary">
                                        Replay {" "} <i class="fa fa-refresh" aria-hidden="true"></i>
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Typography>
                </Container>
            </React.Fragment>
        )
    }
}