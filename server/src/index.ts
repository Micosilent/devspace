import * as express from "express"
import * as bodyParser from "body-parser"
import { AppDataSource } from "./data-source"
import {errorHandler} from "./controller/errorController";
import {AuthRoutes} from "./routes/authRoutes";

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

    // register express routes from defined application routes
    // Auth Routes
    app.use('/auth', AuthRoutes)

    // setup express app here
    app.use(errorHandler)
    // start express server
    app.listen(3000)



    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
