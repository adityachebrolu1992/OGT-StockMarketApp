import React, { useState, useRef } from "react";
import "./style.css";
import CompanysDetail from "../CompanysDetail";

export default function Search(props) {
    const [searchedList, setSearchedList] = useState([]);
    const [companyDetails, setCompanyDetails] = useState([])
    const [sharePrice, setSharePrice] = useState(0)

    function randomValueGenerator() {
        let min = 1;
        let max = 10;
        let val = (min + (Math.random() * (max - min))).toFixed(0);
        return val % 2;
    }

    function changeHandler(event) {
        let searchedKeyWord = event.target.value;
        const key = ["9E3RT7E2BU9RO7SW", "A9ELA1B2R92C0MU9"];
        let index = randomValueGenerator();
        if (searchedKeyWord.length >= 3) {
            let request = require("request");
            let url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchedKeyWord}&apikey=` + key[index];
            request.get({
                url: url,
                json: true,
                headers: { "User-Agent": "request" }
            }, (err, res, data) => {
                if (err) {
                    console.log("Error:", err);
                } else if (res.statusCode !== 200) {
                    console.log("Status:", res.statusCode);
                } else {
                    let recommendedList = [];
                    for (let i = 0; i < data["bestMatches"].length; i++) {
                        recommendedList.push(data["bestMatches"][i]["1. symbol"]);
                    }
                    console.log(recommendedList);
                    setSearchedList(recommendedList);
                }
            }
            )
        }

    }



    const myRef = useRef();

    function searchHandler() {
        // console.clear();
        let searchedCompany = myRef.current.value;
        const key = ["9E3RT7E2BU9RO7SW", "A9ELA1B2R92C0MU9"];
        let index = randomValueGenerator();
        console.log("--->>", searchedCompany)
        let request = require("request");
        let url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${searchedCompany}&apikey=${key[index]}`;
        request.get({
            url: url,
            json: true,
            headers: { "User-Agent": "request" }
        }, (err, res, data) => {
            if (err) {
                console.log("Error:", err);
            } else if (res.statusCode !== 200) {
                console.log("Status:", res.statusCode);
            } else {
                console.log("data--->>", data);
                setCompanyDetails(data)
            }
        }
        )
        var url2 = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${searchedCompany}&apikey=${key[index]}`;

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
                setSharePrice(truncedTempPrice);
            }
        });

    }

    return (
        <div id="search-container">
            <label htmlFor="search-bar">Enter the company name:
                <input ref={myRef} onChange={changeHandler} list="browser" name="browser" id="search-bar" />
                <datalist id="browser">
                    {searchedList.map((myVal, idx) => {
                        return <option key={idx} value={myVal} />
                    })}
                </datalist>
                <button onClick={searchHandler} id="button">Search</button>
            </label>
            <CompanysDetail sharePrice={sharePrice} walletAmount={props.walletAmount} setWalletAmount={props.setWalletAmount} companyDetails={companyDetails} myList={props.myList} setMyList={props.setMyList} />
        </div>
    )
}