import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { Await } from "react-router-dom"
import axios from 'axios';
// import sendEmail from './sendMail.js'
import nodemailer from 'nodemailer'


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


//Reset Password  ----------------------------------------------

app.post("/resetpassword", async (req, res) => {
    const { email, oldpassword, newpassword } = req.body


    try { 

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

    } catch (error) {
        console.log(error);
    }

})







app.post("/resetpass", async (req, res) => {
    const { email, newpassword} = req.body
console.log(email);
console.log(newpassword);

    try { 

        const user = await User.findOne({ email: email }).exec();

        if (user) {
                const user = new User({
                    email,
                    newpassword
                })

                const filter = { email: email };
                const update = { password: newpassword };
                await User.findOneAndUpdate(filter, update, { new: true });

                res.send({ message: "Password set succesfully", user: user })
            
        } else {
            res.send({ message: "User not registered" })
        }

    } catch (error) { 
        console.log(error);
    }

})

// Login  ----------------------------------------------

app.post("/login", async (req, res) => {
    console.log("daya");
    const { email, password } = req.body


    try { 

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

    } catch (error) { 
        console.log("error occured");
    }

})


// Register  ---------------------------------------

app.post("/register", async (req, res) => {
    const { firstname, lastname, email, password, address, phoneno, companyname } = req.body
    try { 

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

    } catch (error) { 
        console.log("error occured");
    }

})


// Profile Update -----------------------

app.post("/profileupdate", async (req, res) => {
    const { firstname, lastname, email, address, phoneno, companyname } = req.body
    try { 

        const user = await User.findOne({ email: email }).exec();
        if (user) {

            const user = new User({
                firstname, lastname, email, address, phoneno, companyname
            })

            const filter = { email: email };
            const update = { firstname: firstname, lastname: lastname, address: address, phoneno: phoneno, companyname: companyname };
            await User.findOneAndUpdate(filter, update, { new: true });
            res.send({ message: "successfully Updated" })
        }

    } catch (error) {
        console.log(error);
    }

})
//---------------Forget Password-------------------------------------------------------------------



app.post('/forgetpassword', async (req, res) => {

    const { email } = req.body

    const user = await User.findOne({ email: email }).exec();

    if (user) {

        const otp = generateRandomCode();
        console.log(otp);
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dayanandkumargupta94@gmail.com',
                pass: 'iknjyzyiexjqgtqz'
            }
        });

        let mailDetails = {
            from: 'dayanandkumargupta94@gmail.com',
            to: email,
            subject: 'Reset Password OTP !',
            text: 'Here is your 6 digit reset password OTP  :   ' + otp
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
                res.send({ message: "Email has been sent", otp: otp })
            }
        });

    }else{
        res.send({ message: "User not regisered"})
    }

});



// app.post("/forgetpassword", async (req, res) => {
//     console.log(req.body.email);
//     res.send({ message: "successfully Updated" })
// })


//------------------Utility----------------------------
function generateRandomCode() {
    const randomNumber = Math.floor(Math.random() * 1000000);
    let randomCode = randomNumber.toString();
    while (randomCode.length < 6) {
        randomCode = '0' + randomCode;
    }
    return randomCode;
}
// ---------------------Registration List -----------------------

app.get("/registrationlist", async  function(req, res){ 
    var  result_find = await User.find()
    console.log(result_find)
      res.status(200).send( result_find); 
    });

// app.user("/user_delete", async (req,res)=>{
// var u_id = req.body.user_id
// console.log("________________38"+u_id)

// }
// )




//-------------------------------------------------------------------

app.listen(9002, () => {
    console.log("Be started at port 9002")
})