import express, { Request, Response } from "express"
import cors from "cors"
import fileupload from "express-fileupload"
import cookieParser from 'cookie-parser';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads/images", express.static("src/uploads/images"));
app.use("/uploads/coverimgs", express.static("src/uploads/coverimgs"));

// http://localhost:8000/uploads/coverimgs/{filename}

app.use(fileupload());
app.use(cors());



app.get("/", (req: Request, res: Response) => {

    res.json({ msg: "hamrocare" })
})
app.get("/ping", (req: Request, res: Response) => {

    res.status(200).json({

        message: "this is test api",
        data: [],
    })
    return
})



app.listen(8000, () => {
    console.log("BACKEND SERVER::running in port  8000. visit: http://localhost:8000")
})
