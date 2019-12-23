import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

// custom import
import '../GamePage/gamePage.css';
import GameService from '../../utils/service';
import CustomToastr from '../../utils/toastr';

const defaultState = {

    loader: false,

    planetData: [],
    vehicleData: [],

    selectedPlanet: [],
    selectedVehicle: [],

    payloadData: {
        planets_names: [],
        vehicles_names: []
    },

    displayResult: {
        resultStatus: '',
        planetName: '',
        travelTime: '',
        reason: '',
    }
}

class GamePage extends Component {
    constructor(props) {
        super(props);

        this.state = defaultState;
        this.discoverQueen = this.discoverQueen.bind(this)
        this.handleChange = this.handleChange.bind(this)
        window.childComp = this;
    }

    componentDidMount() {
        this.fetchPlanetData();
        this.fetchVehicleData()
    }

    fetchPlanetData = () => {
        this.setState({ loader: true })

        let getPlanetData = GameService.getPlanetData()
        getPlanetData.then(res => {
            if (res && res.length !== 0) {
                this.setState({ planetData: res, loader: false })
                CustomToastr.success("Planet Information fetched successfully !")
            }
        }, function (responseError) {
            this.setState({ loader: false })
            CustomToastr.error(responseError)
        })
    }

    fetchVehicleData = () => {
        this.setState({ loader: true })

        let getVehicleData = GameService.getVehicleData()
        getVehicleData.then(res => {
            if (res && res.length !== 0) {
                this.setState({ vehicleData: res, loader: false })
                CustomToastr.success("Vehicle Information fetched successfully !")
            }
        }, function (responseError) {
            this.setState({ loader: false })
            CustomToastr.error(responseError)
        })
    }

    discoverQueen = (event) => {
        event.preventDefault();

        let findQueen = GameService.findQueen(this.state.payloadData)
        findQueen.then((res) => {

            if (res.status === "fail") {
                let invalidUserInput = res.reason.search("invalid input")
                if (invalidUserInput === 0) {
                    CustomToastr.error(res.reason)
                    return false
                }

                let failedState = Object.assign({}, this.state.displayResult)
                failedState.resultStatus = res.status;
                failedState.reason = res.reason;

                this.setState({ displayResult: failedState })
                this.props.history.push('/response-view', { queenResponseData: this.state.displayResult });
            } else {
                let name = res.planet_name;

                /*  Get the planet distance from planetData array */
                let planetDistance = this.state.planetData.find((data) => data.name === name).distance;

                /** extract all the distance from vehicle object and put it in array */
                let distanceArr = this.state.vehicleData.map(data => data.max_distance);

                /** Find the distance value from distanceArr which is closest to the planet distance */
                let nearestDistance = distanceArr.reduce((prev, curr) => Math.abs(curr - planetDistance) < Math.abs(prev - planetDistance) ? curr : prev);;

                /** Get Space vehicle whose max_distance matches with the nearestDistance */
                let requiredSpaceVehicle = this.state.vehicleData.find(data => data.max_distance === nearestDistance)

                /** find the time on the basis of distance-speed formula 
                 *  distance = speed * time 
                 *  time = distance/speed
                 */

                let time = planetDistance / (requiredSpaceVehicle.speed);

                /** totaTtime = (time * total_no)  */
                let totalTime = time * (requiredSpaceVehicle.total_no)

                let successState = Object.assign({}, this.state.displayResult)
                successState.resultStatus = res.status;
                successState.planetName = name;
                successState.travelTime = totalTime;

                this.setState({ displayResult: successState })
                this.props.history.push('/response-view', { queenResponseData: this.state.displayResult });
            }

        }, function (responseError) {
            CustomToastr.error(responseError)
        })
    }

    handleChange(event) {
        event.preventDefault();

        if (event.target.name === "planet") {
            this.setState({ selectedPlanet: event.target.value }, function () {

                let planet_name_data = Object.assign({}, this.state.payloadData)
                planet_name_data.planets_names = this.state.selectedPlanet
                this.setState({payloadData: planet_name_data})

                if (this.state.selectedPlanet.length > 4) {
                    CustomToastr.warning("Please select exactly 4 planet")
                }
            })
        } else {
            this.setState({ selectedVehicle: event.target.value }, function () {

                let vehicle_name_data = Object.assign({}, this.state.payloadData)
                vehicle_name_data.vehicles_names = this.state.selectedVehicle
                this.setState({payloadData: vehicle_name_data})

                if (this.state.selectedVehicle.length > 4) {
                    CustomToastr.warning("Please select exactly 4 vehicle")
                }
            })
        }
    }

    resetFormData = () => {
        this.setState({selectedPlanet: [], selectedVehicle: []})
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container fixed>
                    <form name="queenForm" onSubmit={this.discoverQueen} noValidate autoComplete="off">
                        <Typography className="parentTypography" component="div">
                            <Grid container direction="column" spacing={2}>
                                <Grid container spacing={2}>
                                    <Grid item sm={6}>
                                        <Paper>
                                            <h4>Planet List</h4>
                                        </Paper>
                                    </Grid>
                                    <Grid item sm={6}>
                                        <Paper>
                                            <h4>Vehicle List</h4>
                                        </Paper>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item sm={6}>
                                        <Paper className="planetClass">
                                            <FormControl>
                                                <InputLabel id="demo-mutiple-checkbox-label">Select Planet - -</InputLabel>
                                                <Select id="selectPlanetBox" name="planet" value={this.state.selectedPlanet} onChange={this.handleChange}
                                                    input={<Input />} renderValue={selected => (selected).join(', ')} multiple >
                                                    {
                                                        this.state.planetData.map((planet) => {
                                                            return (
                                                                <MenuItem key={planet.name} value={planet.name}>
                                                                    <Checkbox checked={this.state.selectedPlanet.indexOf(planet.name) > -1} />
                                                                    <ListItemText primary={`${planet.name} (${planet.distance} km)`} />
                                                                </MenuItem>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Paper>
                                    </Grid>

                                    <Grid item sm={6}>
                                        <Paper className="vehicleClass">
                                            <FormControl>
                                                <InputLabel id="demo-mutiple-checkbox-label">Select Vehicle - -</InputLabel>
                                                <Select id="selectVehicleBox" name="vehicle" value={this.state.selectedVehicle} onChange={this.handleChange}
                                                    input={<Input />} renderValue={selected => (selected).join(', ')} multiple 
                                                    disabled={this.state.selectedPlanet.length !== 4 ? true: false} >
                                                    {
                                                        this.state.vehicleData.map((vehicle) => {
                                                            return (
                                                                <MenuItem key={vehicle.name} value={vehicle.name}>
                                                                    <Checkbox name={vehicle.name} checked={this.state.selectedVehicle.indexOf(vehicle.name) > -1} />
                                                                    <ListItemText primary={` ${vehicle.name} - (${vehicle.total_no})`}/>
                                                                </MenuItem>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Paper>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item sm={8}>
                                        {
                                            (this.state.loader === true) ?
                                                <div>
                                                    <h1>
                                                        <LinearProgress color="secondary" />
                                                    </h1>
                                                    <h3> Fetching Planets and Vehicles . . . </h3>
                                                </div>
                                                : null
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Typography>

                        <Typography className="footerTypography" component="div">
                            <Grid container direction="row" justify="center" alignItems="center">
                                <Button name="submit" type="submit" variant="contained" color="secondary">Find Queen</Button>
                                <Button name="reset" type="reset" variant="contained" color="primary" onClick={this.resetFormData.bind(this)}>Reset</Button>
                            </Grid>
                        </Typography>
                    </form>
                </Container>
            </React.Fragment>
        )
    }
}
export default withRouter(GamePage);