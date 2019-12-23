import axios from 'axios';

const GameService = {

    async getPlanetData() {
        const encodedURI = window.encodeURI("/proxy/production/planets");

        try {
            return await axios({
                method: "GET",
                url: encodedURI,
                "headers": {
                    'Content-Type': "application/json",
                    "SERVER": "PLANET"
                }
            }).then(function (response) {
                return response.data
            })
        } catch (error) {
            console.error(error)
        }
    },

    async getVehicleData() {
        const encodedURI = window.encodeURI('/proxy/production/vehicles');

        try {
            return await axios({
                method: "GET",
                url: encodedURI,
                crossdomain: true,
                host: '127.0.0.1',
                port: 7000,
                "headers": {
                    'Content-Type': "application/json",
                    "SERVER": "VEHICLE"
                }
            }).then(function (response) {
                return response.data
            })
        } catch (error) {
            console.error(error);
        }
    },

    async findQueen(payloadData) {
        const encodedURI = window.encodeURI("/proxy/production/find");

        try {
            return await axios({
                method: "POST",
                url: encodedURI,
                data: payloadData,
                "headers": {
                    'Content-Type': "application/json",
                    "SERVER": "QUEEN"
                }
            }).then(function (response) {
                return response.data
            })
        } catch (error) {
            console.error(error)
        }
    }
}

export default GameService;