import React, { useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { add, edit } from "../features/sharesDataList/sharesDataList"

export default function CompanysDetail(props) {

    const myReduxList = useSelector(state => state.myStocks.value);
    const dispatch = useDispatch();

    const [numberOfShares, setNumberOfShares] = useState("");
    const [cautionFlag, setCautionFlag] = useState(false);
    const [costOfPurchase, setCostOfPurchase] = useState(0);
    const [newListItem, setNewListItem] = useState({});
    const [amountDisplayFlag, setAmountDisplayFlag] = useState(false)


    function listHandler() {
        if (numberOfShares > 0) {
            setAmountDisplayFlag(false);

            if (props.walletAmount - costOfPurchase >= 0) {
                let companyPresentInList = false;
                let companyIndexInMyList = null;
                let newArrayThatModifiedMyList = [];

                for (let i = 0; i < myReduxList.length; i++) {
                    if (myReduxList[i]["Name"] == props.companyDetails["Name"]) {
                        console.log("for loop shows list has this name")
                        companyPresentInList = true;
                        companyIndexInMyList = i;
                        break;
                    }
                }

                props.setWalletAmount((Number(props.walletAmount).toFixed(2) - costOfPurchase.toFixed(2)).toFixed(2));

                if (companyPresentInList) {
                    console.log("inside companyPresentInList");
                    let myPayload = [companyIndexInMyList, Number(numberOfShares), (Number(props.sharePrice * numberOfShares).toFixed(2))];
                    fetch("http://localhost:9999/updateSearch", {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(myPayload)
                    }).then(fetch("http://localhost:9999/myStocks").then(r => r.json()).then(r => {
                        console.log("updated rvalue in get", r);

                        dispatch(add(r));
                        // console.log("outside array from get",myArr);
                    }));
                    fetch("http://localhost:9999/myStocks").then(r => r.json()).then(r => {
                        console.log("updated rvalue in get", r);

                        dispatch(add(r));
                        // console.log("outside array from get",myArr);
                    });

                } else {
                    fetch("http://localhost:9999/search", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(newListItem)
                    }).then(fetch("http://localhost:9999/myStocks").then(r => r.json()).then(r => {
                        console.log("rvalue in get", r);

                        dispatch(add(r));
                        // console.log("outside array from get",myArr);
                    }));



                }
                setNumberOfShares("");
            } else {
                alert("Not enough cash in the wallet")
            }
        } else {
            alert("Please add the number of shares you want to buy in the input box");
        }
    }

    function sharesInputHandler(event) {
        let shares = event.target.value;
        setAmountDisplayFlag(true);
        if (shares[0] != "0" && shares >= 0 && shares <= 1000) {
            setCautionFlag(false);
            setNumberOfShares(shares);
        } else {
            setCautionFlag(true);
        }
    }

    function cautionTheCustomer() {
        let id = new Date().valueOf();
        let selectedShares = +numberOfShares;
        let sharePrice = props.sharePrice;
        setCostOfPurchase(+selectedShares * +sharePrice);
        setCautionFlag(false);
        if (selectedShares > 0) {
            setNewListItem({ "id": id, "key": props.companyDetails["Symbol"], "Name": props.companyDetails["Name"], "numberOfShares": numberOfShares, "costOfPurchase": ((+selectedShares * +sharePrice).toFixed(2)) });
        }
    }

    return (
        props.companyDetails.hasOwnProperty("Name") ? <div id="card-container">
            <h2>{props.companyDetails["Name"]}</h2>
            <div className="inner-container"><p><strong>AssetType:</strong> {props.companyDetails["AssetType"]}</p> <button id="list-button" onClick={listHandler}>Add to my List</button></div>
            <p><strong>CIK:</strong> {props.companyDetails["CIK"]}</p>
            <p><strong>Share price:</strong> {props.sharePrice}</p>
            <label htmlFor="shares-input"><strong>Enter the number of shares:</strong> <input placeholder="number of shares" onMouseOut={cautionTheCustomer} onChange={sharesInputHandler} id="shares-input" value={numberOfShares} type="number" /></label>{amountDisplayFlag ? <p id="amount-message">`${(+numberOfShares * +props.sharePrice).toFixed(2)}Rs will be deducted from your wallet`</p> : null}{cautionFlag ? <p className="caution-message">mininum shares=1, maximum shares=1000</p> : null}
            <p><strong>Description</strong></p>
            <p>{props.companyDetails["Description"]}</p>
        </div> : null
    )
}