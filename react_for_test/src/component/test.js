const axios = require('axios')

axios.get("http://localhost:9002/Registrationlist").then(
    (response) => {
        var result = response.data;
        console.log(result);
    },
    (error) => {
        console.log(error);
    }
);