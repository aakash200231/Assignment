const express = require('express');
const app = express();

const PORT = 8050;

app.use(express.json());

const routes = require("./routes/requestRoutes");
app.use("/api", routes);


app.listen(PORT, ()=> {
    console.log(`server is running on ${PORT}`)
})