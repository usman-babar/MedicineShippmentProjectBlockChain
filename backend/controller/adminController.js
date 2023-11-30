import Admin from "../schema/adminSchema.js";
import jwt from "jsonwebtoken";

export const getAdmins = (req, res) => {
    Admin.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error' + err))
}

export const signin = (req, res) => {
    let { username, password } = req.body;
    Admin.findOne({ username: username }).then(founduser => {

        if (!founduser) {
            res.status(404).send({ "Messege": "User does not exist" })
        }
        else {
            if (password == founduser.password) {
                console.log(founduser)
                let token = jwt.sign({
                    username: founduser.username,
                }, process.env.SECRET_KEY, { expiresIn: '21h' })
                console.log(token)
                res.status(200).send({ user: founduser, "token": token })
            }
            else {
                console.log(username, password)
                res.status(400).send({ "Messege": " Not Found " })
            }
        }
    }).catch(e => {
        res.status(500).send("no understanding of error")
    })
}
