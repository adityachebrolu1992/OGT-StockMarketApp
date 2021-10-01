import React, { useState } from "react";
import "./style.css";

export default function CardForList(props) {

    const [valueOfShare, setValueOfShare] = useState(10);
    const [totalSharesLeft, setTotalSharesLeft] = useState(props.val["numberOfShares"]);
    const [sharesToBeSold, setSharesToBeSold] = useState(1);

    function randomValueGenerator() {
        let min = 1;
        let max = 10;
        let val = (min + (Math.random() * (max - min))).toFixed(0);
        return val % 2;
    }

    function increaseSharesToBeSold() {
        if (sharesToBeSold < totalSharesLeft) {
            setSharesToBeSold(sharesToBeSold + 1);
        }
    }

    function decreaseSharesToBeSold() {
        if (sharesToBeSold > 1) {
            setSharesToBeSold(sharesToBeSold - 1);
        }
    }

    function sellHandler(event) {
        let searchedCompany = props.val["key"];
        const apiKey = ["9E3RT7E2BU9RO7SW", "A9ELA1B2R92C0MU9"];
        let index = randomValueGenerator();
        let request = require("request");
        var url2 = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${searchedCompany}&apikey=${apiKey[index]}`;
        request.get({
            url: url2,
            json: true,
            headers: { 'User-Agent': 'request' }
        }, (err, res, data) => {
            if (err) {
                console.log('Error:', err);
            } else if (res.statusCode !== 200) {
                console.log('Status:', res.statusCode);
            } else {
                // data is successfully parsed as a JSON object:
                let tempPrice = +data["Global Quote"]["05. price"];
                let truncedTempPrice = tempPrice.toFixed(2);
                props.setWalletAmount((+props.walletAmount + (+sharesToBeSold * truncedTempPrice)).toFixed(2));

                if (sharesToBeSold == totalSharesLeft) {
                    props.deleteListItem(event);
                    return;
                } else {
                    setTotalSharesLeft(totalSharesLeft - sharesToBeSold);
                    setSharesToBeSold(1);
                }

                console.log(truncedTempPrice);
            }
        });

    }
    return (
        <tr key={props.val["key"]} id="listCard-container"><td>{props.val["Name"]}</td><td>{totalSharesLeft}</td><td>{props.val["costOfPurchase"]}</td><td><button onClick={decreaseSharesToBeSold}>-</button>{sharesToBeSold}<button onClick={increaseSharesToBeSold}>+</button></td><td><button onClick={() => sellHandler(props.idx)}>Sell</button></td></tr>
    )
}