import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { Await } from "react-router-dom"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb+srv://dayanandkumargupta94:S3S0spa9LbGfQyzb@cluster0.ly3o5nu.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully database");
});

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    address: String,
    phoneno: String,
    companyname: String
})
const User = new mongoose.model("User", userSchema)

// Routes
app.post("/resetpassword", async (req, res) => {
    const { email, oldpassword, newpassword } = req.body


    try { //exception handling   //risky code

        const user = await User.findOne({ email: email }).exec();

        if (user) {
            if (oldpassword === user.password) {
                const user = new User({
                    email,
                    newpassword
                })

                const filter = { email: email };
                const update = { password: newpassword };
                await User.findOneAndUpdate(filter, update, { new: true });

                res.send({ message: "reset success", user: user })
            } else {
                res.send({ message: "old pass not matched" })
            }
        } else {
            res.send({ message: "User not registered" })
        }

    } catch (error) { //handling code, non-risky
        console.log(error);
    }

})



app.post("/login", async (req, res) => {
    console.log("daya");
    const { email, password } = req.body


    try { //exception handling   //risky code

        const user = await User.findOne({ email: email }).exec();

        if (user) {
            console.log(password);

            console.log(user.email);
            console.log(user.password);
            if (password === user.password) {
                res.send({ message: "Login Successfull", user: user })
            } else {
                res.send({ message: "password didn't match" })
            }
        } else {
            res.send({ message: "User not registered" })
        }

    } catch (error) { //handling code, non-risky
        console.log("error occured");
    }

})

app.post("/register", async (req, res) => {
    const { firstname, lastname, email, password, address, phoneno, companyname } = req.body
    try { //exception handling   //risky code

        const user = await User.findOne({ email: email }).exec();

        if (user) {
            res.send({ message: "User already Registerd" })
        } else {
            const user = new User({
                firstname, lastname, email, password, address, phoneno, companyname
            })

            await user.save();
            res.send({ message: "successfully Register" })
        }

    } catch (error) { //handling code, non-risky
        console.log("error occured");
    }

})


app.post("/profileupdate", async (req, res) => {
    const { firstname, lastname, email, address, phoneno, companyname } = req.body
    try { //exception handling   //risky code

        const user = await User.findOne({ email: email }).exec();
        console.log(firstname)
        console.log(lastname)
        console.log(address)
        console.log(phoneno)
        console.log(companyname)
        if (user) {

            const user = new User({
                firstname, lastname, email, address, phoneno, companyname
            })

            const filter = { email: email };
            const update = {firstname : firstname, lastname : lastname, address : address, phoneno : phoneno, companyname : companyname};
            await User.findOneAndUpdate(filter, update, { new: true });
            res.send({ message: "successfully Updated" })
        }

    } catch (error) { //handling code, non-risky
        console.log(error);
    }

})

app.listen(9002, () => {
    console.log("Be started at port 9002")
})