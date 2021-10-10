import React, { useEffect } from "react";
import CardForList from "../CardForList";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteStock, add } from "../features/sharesDataList/sharesDataList";

export default function MyList(props) {

    const dispatch = useDispatch();
    let myReduxListForMyList = useSelector(state => state.myStocks.value);
    // console.log("=======>>>>>>>>>>",myReduxListForMyList);
    function deleteListItem(itemKey) {
        fetch("http://localhost:9999/delete", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemKey)
        });
        dispatch(deleteStock(itemKey))
    }
    console.log("==++==++==>>", myReduxListForMyList);

    // useEffect(()=>{
    //     fetch("http://localhost:9999/myStocks").then(r=>r.json()).then(r=>dispatch(add(r)));
    // },[])

    return (
        <div>
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
                    {myReduxListForMyList.map((val, idx) => {
                        return <CardForList key={val["id"]} idx={idx} deleteListItem={deleteListItem} setWalletAmount={props.setWalletAmount} walletAmount={props.walletAmount} val={val} />
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}