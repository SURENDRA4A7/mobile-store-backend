const express = require("express");

const router = express.Router();

const connection = require("../config/db");

router.get("/products", (req, res) => {

    const sql = "SELECT * FROM products";

    connection.query(sql, (err, result) => {

        if (err) {

            return res.status(500).json({
                message: "Database Error"
            });

        }

        res.json(result);

    });

});

router.get("/products/:id", (req, res) => {

    const { id } = req.params;

    const sql = "SELECT * FROM products WHERE id=?";

    connection.query(sql, [id], (err, result) => {

        if (err) {

            return res.status(500).json({
                message: "Database Error"
            });

        }

        res.json(result[0]);

    });

});

module.exports = router;