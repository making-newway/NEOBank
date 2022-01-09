const Customer = require("../models/customerModel");

exports.addFunds = (req, res) => {
    const id = req.params['id'];
    let amount = req.body.amount;
    amount = Math.abs(Number(amount));

    Customer.findOne({ accNo: id })
    .then(customer => {
        const currbal = customer.currentBal + amount;

        Customer.findOneAndUpdate({ accNo: id }, {
            $inc: { currentBal : amount },
            $push: {
                transactions: {
                    transactionType: "credit",
                    transactionDetails: {
                        transferredFrom: "Self",
                        transferredTo: "Self",
                        balance: Number(currbal),
                        amount: Number(amount),
                    },
                },
            },
        })
        .then((response) => { res.status(201).json(`Funds added`) })
        .catch(err => { res.status(504).json(`Error : ${err}`)});
    })
    .catch((err) => {
        res.status(500).json(`Error : ${err}`);
        console.log(err);
    });
}

exports.withdrawFunds = (req, res) => {
    const id = req.params.id;
    let amount = Math.abs(Number(req.body.amount));

    Customer.findOne({ accNo: id })
    .then(customer => {
        const currbal = customer.currentBal + Number(-amount);
        if (currbal < 0) throw Error("Insufficient Funds!");
        Customer.findOneAndUpdate({ accNo: id }, {
            $inc: { currentBal : Number(-amount) },
            $push: {
                transactions: {
                    transactionType: "debit",
                    transactionDetails: {
                        transferredFrom: "Self",
                        transferredTo: "Self",
                        balance: currbal,
                        amount: Number(amount),
                    },
                },
            },
        })
        .then((response) => { res.status(201).json(response) })
        .catch(err => { res.status(500).json(`Error : ${err}`)});
    })
    .catch((err) => {
        res.json(err.toString);
    });
}

exports.transferFunds = (req, res) => {
    let amount = Math.abs(Number(req.body.amount));

    const sender = req.params.id;
    const receiver = req.body.transferTo;
    const debitFromURL = `/customers/${sender}/withdrawFunds`;
    const transferToURL = `/customers/${receiver}/addFunds`;

    Customer.find({ $or: [{ accNo: sender }, { accNo: receiver }] })
    .then((details) => {
        let [S, R] = details;
        const senderName = S.accNo === sender ? S.name : R.name;
        const receiverName = R.accNo === receiver ? R.name : S.name;
        console.log(`Sent From ${senderName} to ${receiverName}`);

        Customer.findOne({ accNo: sender })
        .then((response) => {
            const currbal = response.currentBal + Number(-amount);
            if (currbal < 0) throw Error("Insufficient Funds!");
            Customer.findOneAndUpdate({ accNo: sender }, {
                $inc: { currentBal: Number(-amount) },
                $push: {
                    transactions: {
                        transactionType: "debit",
                        transactionDetails: {
                            transferredFrom: "Self",
                            transferredTo: receiverName,
                            balance: currbal,
                            amount: Number(amount),
                        },
                    },
                },
                
            })
            .then((resdata) => { addFunds() })
            .catch((err) => {
                res.status(500).json({ err });
            });
        })
        .catch((err) => {
            res.status(500).json({ err });
        });

        const addFunds = () => {
            Customer.findOne({ accNo: receiver })
            .then((response) => {
                const currbal = response.currentBal + amount;
                Customer.findOneAndUpdate( { accNo: receiver }, {
                    $inc: { currentBal: amount },
                    $push: {
                        transactions: {
                            transactionType: "credit",
                            transactionDetails: {
                                transferredFrom: senderName,
                                transferredTo: "Self",
                                balance: currbal,
                                amount: amount,
                            },
                        },
                    },
                })
                .then((resdata) => {
                    res.status(201).json({ resdata });
                })
                .catch(err => { res.status(500).json(`Error : ${err}`)});
            })
            .catch(err => { res.status(500).json(`Error : ${err}`)});
        };
    })
    .catch(err => { res.status(504).json(`Error : ${err}`)});
}

exports.displayTransactions = (req, res) => {
    const id = req.params.id;
    
    Customer.findOne({ accNo:id })
    .then((customer) => {
        res.status(201).json({ customer });
    })
    .catch(err => res.status(500).json(`Error : ${err}`))
}