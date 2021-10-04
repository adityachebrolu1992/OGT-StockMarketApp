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
        console.log("Redux array==>>", myReduxList);
        // dispatch(add(newListItem));


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

                // console.log("add to list-->>",props.myList);
                if (companyPresentInList) {
                    console.log("inside companyPresentInList");
                    let myPayload = [companyIndexInMyList, Number(numberOfShares), (Number(props.sharePrice * numberOfShares).toFixed(2))]
                    dispatch(edit(myPayload));
                    // dispatch(add(newListItem));
                } else {
                    dispatch(add(newListItem));
                }
                // console.log("setList-->>",props.MyList[0]);
                // dispatch(add(newListItem))
                setNumberOfShares("");
            } else {
                alert("Not enough cash in the wallet")
            }
        } else {
            alert("Please add the number of shares you want to buy in the input box");
        }
    }

    function sharesInputHandler(event) {
        // console.log("number of shares==",typeof event.target.value);
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
        let selectedShares = +numberOfShares;
        let sharePrice = props.sharePrice;
        setCostOfPurchase(+selectedShares * +sharePrice);
        // console.log(costOfPurchase);
        setCautionFlag(false);
        if (selectedShares > 0) {
            setNewListItem({ "key": props.companyDetails["Symbol"], "Name": props.companyDetails["Name"], "numberOfShares": numberOfShares, "costOfPurchase": ((+selectedShares * +sharePrice).toFixed(2)) })
            // alert(`you are purchasing  ${selectedShares} shares at a price of ${sharePrice}Rs which amounts to ${(+selectedShares*+sharePrice).toFixed(2)}Rs which will be deducted from your wallet`);

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