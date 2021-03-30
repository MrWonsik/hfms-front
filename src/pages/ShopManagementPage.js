import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShops } from '../expense/expense.actions';
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { useHistory } from "react-router";
import { BsTrash } from 'react-icons/bs'

const ShopManagementPage = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const { shops, isShopsLoading } = useSelector((state) => ({
        shops: state.expenses.shops,
        isShopsLoading: state.expenses.isLoading
    }));

    useEffect(() => {
        dispatch(getShops()).catch((shouldRedirect) => shouldRedirect === true && history.push("/login"));
    }, []);

    return (
        <>
            { isShopsLoading ? <Spinner animation="border text-center" size="lg" /> :  shops && shops.length > 0 ?  
                <>
                    {/*TODO: add button to add new shop */}
                    <Table responsive hover className="list-table">
                    <thead>
                        <tr>
                            <th>Shop name</th>
                            <th>Created</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shops?.map((shop) => (
                        <tr key={shop.id}>
                                <td>{shop.shopName}</td>
                                <td>{shop.createDate}</td>
                                <td>
                                    <>
                                        <BsTrash tabIndex="0" className="table-action-icon" onClick={() => console.log("clicked!")} onKeyPress={e => e.key === 'Enter' && console.log("clicked!")}/>
                                        {/*TODO: add action to show all expense from this shop*/}
                                    </>
                                </td>
                        </tr>
                        ))}
                    </tbody>
                    </Table>
                </> :
                <p className="text-center">You don't have any shop yet. To add new shop click here.</p>
            }
        </>
    );
}

export default ShopManagementPage;