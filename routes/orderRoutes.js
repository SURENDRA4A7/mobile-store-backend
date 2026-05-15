const express = require("express");

const router = express.Router();

const connection = require("../config/db");

router.post("/orders", (req, res) => {

    const {
        customer_name,
        phone_number,
        item_name,
        cost
    } = req.body;

    // CHECK DUPLICATE ORDER

    const checkSql =
        `SELECT * FROM orders
         WHERE customer_name=?
         AND phone_number=?
         AND item_name=?`;

    connection.query(
        checkSql,
        [
            customer_name,
            phone_number,
            item_name
        ],
        (checkErr, checkResult) => {

            if (checkErr) {

                return res.status(500).json({
                    message: "Database Error"
                });

            }

            // DUPLICATE FOUND

            if (checkResult.length > 0) {

                return res.json({
                    success: false,
                    message: "Order Already Exists"
                });

            }

            // INSERT ORDER

            const insertSql =
                `INSERT INTO orders
                (customer_name, phone_number, item_name, cost)
                VALUES (?, ?, ?, ?)`;

            connection.query(
                insertSql,
                [
                    customer_name,
                    phone_number,
                    item_name,
                    cost
                ],
                (insertErr, result) => {

                    if (insertErr) {

                        return res.status(500).json({
                            message: "Database Error"
                        });

                    }

                    res.json({
                        success: true,
                        message: "Order Placed Successfully"
                    });

                }
            );

        }
    );

});

module.exports = router;