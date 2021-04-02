import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShops, deleteShop } from '../finance/finance.actions';
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import { BsTrash, BsPlus } from 'react-icons/bs'
import { openConfirmationModal, openModalAddNewShop } from '../modal/modal.actions';
import AddNewShopModal from './modal/AddNewShopsModal';
import ConfirmationModal from './modal/ConfirmationModal';
import Alert from "react-bootstrap/Alert";

const ShopsTable = () => {
    const dispatch = useDispatch();
    const { shops, isShopsLoading } = useSelector((state) => ({
        shops: state.finance.shops,
        isShopsLoading: state.finance.isShopsLoading
    }));

    useEffect(() => {
        dispatch(getShops());
    }, []);

    const showDeleteConfirmationModal = (shop) => {
        dispatch(openConfirmationModal("shop_" + shop.shopName.trim() + "_" + shop.id));
    }

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
                        <BsPlus tabIndex="0" className="icon-add" onClick={handleAddNewShop} onKeyPress={e => e.key === 'Enter' && handleAddNewShop()}/>
                    </Form.Group>
                    <Table responsive hover className="list-table">
                    <thead>
                        <tr>
                            <th>Shop name</th>
                            <th>Created Date</th>
                            <th>Created Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shops?.map((shop) => (
                        <tr key={shop.id}>
                                <td>{shop.shopName} <span className="additionaly-info">({shop.id})</span></td>
                                <td>{shop.createDate.date}</td>
                                <td>{shop.createDate.time}</td>
                                <td>
                                    <>
                                        <BsTrash tabIndex="0" className="table-action-icon" onClick={() => showDeleteConfirmationModal(shop)} onKeyPress={e => e.key === 'Enter' && showDeleteConfirmationModal(shop)}/>
                                        {/*TODO: add action to show all expense from this shop*/}
                                    </>
                                </td>
                                <ConfirmationModal id={"shop_" + shop.shopName.trim() + "_" + shop.id} confirmationFunction={() => handleDeleteShop(shop.id)} confirmationMessage={"Are you sure you want to delete " + shop.shopName + "?"} />
                        </tr>
                        ))}
                    </tbody>
                    </Table>
                    
                </> :
                <Alert className="text-center" variant="light">
                    You don't have any shop yet. To add new shop <Alert.Link onClick={handleAddNewShop}>click here</Alert.Link>.
                </Alert>
            }
            <AddNewShopModal />
        </>
    );
}

export default ShopsTable;