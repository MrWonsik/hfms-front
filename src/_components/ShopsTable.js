import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShops, deleteShop } from '../expense/expense.actions';
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { useHistory } from "react-router";
import Form from "react-bootstrap/Form";
import { BsTrash, BsPlus } from 'react-icons/bs'
import { openModalAddNewShop } from '../modal/modal.actions';
import AddNewShopModal from './modal/AddNewShopsModal';

const ShopsTable = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const { shops, isShopsLoading } = useSelector((state) => ({
        shops: state.expenses.shops,
        isShopsLoading: state.expenses.isLoading
    }));

    useEffect(() => {
        dispatch(getShops());
    }, []);

    const handleDeleteShop = (id) => {
        dispatch(deleteShop(id));
    }

    const handleAddNewShop = () => {
        dispatch(openModalAddNewShop());
    }

    return (
        <>
            { !shops && isShopsLoading ? <Spinner animation="border text-center" size="lg" /> :  shops && shops.length > 0 ?  
                <>
                    {/*TODO: add button to add new shop */}
                    <Form.Group className="text-right">
                        <BsPlus tabIndex="0" className="icon-add" onClick={() => handleAddNewShop()} onKeyPress={e => e.key === 'Enter' && handleAddNewShop()}/>
                    </Form.Group>
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
                                        <BsTrash tabIndex="0" className="table-action-icon" onClick={() => handleDeleteShop(shop.id)} onKeyPress={e => e.key === 'Enter' && handleDeleteUser(shop.id)}/>
                                        {/*TODO: add action to show all expense from this shop*/}
                                    </>
                                </td>
                        </tr>
                        ))}
                    </tbody>
                    </Table>
                    <AddNewShopModal />
                </> :
                <p className="text-center">You don't have any shop yet. To add new shop click here.</p>
            }
        </>
    );
}

export default ShopsTable;