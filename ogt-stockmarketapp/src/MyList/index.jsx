import React from "react";
import CardForList from "../CardForList";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteStock } from "../features/sharesDataList/sharesDataList";

export default function MyList(props) {

    const dispatch = useDispatch();
    const myReduxListForMyList = useSelector(state => state.myStocks.value)

    function deleteListItem(itemKey) {
        // // console.log("====>>>",itemKey)
        // props.myList.splice(itemKey, 1);
        // // console.log("====>>>",props.myList)
        // props.setMyList([...props.myList])
        dispatch(deleteStock(itemKey))
    }

    // function goBack() {
    //     props.setSwitchFlag(false)
    // }

    return (
        <div>
            {/* <button id="back" onClick={goBack}>back</button> */}
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
                        return <CardForList idx={idx} deleteListItem={deleteListItem} setWalletAmount={props.setWalletAmount} walletAmount={props.walletAmount} val={val} />
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}