const Customer = require("../models/customerModel");
const jwt = require("jsonwebtoken");
const moment = require('moment');

exports.signup = (req, res) => {
  
    const { name, address, dob, email, currentBal, phone, imgUrl, gender } = req.body;

    if (!name || !address || !imgUrl || !email || !dob || !phone || !gender)  {
        return res.status(400).json({ msg: 'All fields are required' });
    }
    
    Customer.findOne({ email: email, phone: phone })
    .then(async customer => {
        if(customer)
            return res.status(400).json('User already available');
        else {
            const customerNew = new Customer({
                name: name,
                email: email,
                address:address,
                dob:dob,
                currentBal: currentBal,
                phone:phone,
                imgUrl:imgUrl,
                gender:gender
            });

            customerNew.save()
                .then(() => res.status(201).json(`User added`))
                .catch((err) => res.status(500).json(`Error : ${err}`))
        }
    })
    .catch(err => res.status(504).json(`Error : ${err}`))
};

exports.signin = (req, res) => {
    Customer.findOne({email: req.body.email})
    .then(async customer => {
        if(customer)
            if(customer.dob === req.body.dob) {
                const token = jwt.sign({ id : customer._id, role: customer.role }, process.env.SECRET_TOKEN, { expiresIn: "1d" });
                const { name } = customer;
                return res.status(201).json(`Welcome ${name} with ${token}`);
            }
            else {
                res.status(403).json("Invalid password");
            }
        else {
            return res.status(403).json("User not Available");
        }
    })
    .catch(err => res.status(500).json(`Error : ${err}`))
}

exports.display = (req, res) => {
    const id = req.params.id;
    Customer.findOne({accNo: id})
    .then(customer => {
        const createdAt = moment(customer.createdAt).format("lll");
        const modifiedAt = moment(customer.updatedAt).format("lll");
        const dob = moment(customer.dob).format("ll");

        Customer.find({ accNo: { $ne: id } })
        .then(allCustomers => {
            res.status(201).json({ allCustomers, customer, createdAt, modifiedAt, dob });
        })
    })
    .catch(err => res.status(500).json(`Error : ${err}`))
}

exports.index = (req, res) => {
    Customer.find()
    .sort("name")
    .then(customer => {
        return res.status(201).json(customer);
    })
    .catch(err => res.status(500).json(`Error : ${err}`));
};