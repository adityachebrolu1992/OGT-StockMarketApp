import React from "react";
import CardForList from "../CardForList";
import "./style.css";

export default function MyList(props) {

    function deleteListItem(itemKey) {
        // console.log("====>>>",itemKey)
        props.myList.splice(itemKey, 1);
        // console.log("====>>>",props.myList)
        props.setMyList([...props.myList])
    }

    function goBack() {
        props.setSwitchFlag(false)
    }

    return (
        <div>
            <button id="back" onClick={goBack}>back</button>
            <table>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Number of Shares</th>
                        <th>Total Cost</th>
                        <th>No. of shares to be sold</th>
                        <th>Sell</th>
                    </tr>
                </thead>
                <tbody>
                    {props.myList.map((val, idx) => {
                        return <CardForList idx={idx} deleteListItem={deleteListItem} setWalletAmount={props.setWalletAmount} walletAmount={props.walletAmount} val={val} />
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}