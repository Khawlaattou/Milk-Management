const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const cowsRoute = require("./routes/cowsRoute");
const birthRoute = require("./routes/birthRoute");
const medicalExamRoute = require("./routes/medicalExamRoute");
const milkProductionRoute = require("./routes/milkProductionRoute");

//middleware
app.use(express.json());

//Routes
app.use("/birth", birthRoute);
app.use("/cows", cowsRoute);
app.use("/medicalExamination", medicalExamRoute);
app.use("/milkProduction", milkProductionRoute);


//listen for request
app.listen(port, () => {
    console.log("listening on port " + {port});
})


