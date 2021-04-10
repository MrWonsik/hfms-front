import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShops, deleteShop } from '../finance/finance.actions';
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import { BsTrash, BsPlus, BsCalendar } from 'react-icons/bs'
import { openConfirmationModal, openModalAddNewShop } from '../modal/modal.actions';
import AddNewShopModal from './modal/AddNewShopsModal';
import ConfirmationModal from './modal/ConfirmationModal';
import Alert from "react-bootstrap/Alert";
import { dateSort, sortByName } from '../_helpers/tableBootstrapSorter';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

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

    const products = shops?.map((shop) => ({
            id: shop.id,
            shopName: <>{shop.shopName} <span className="additionaly-info">({shop.id})</span></>,
            date: <><BsCalendar /> {shop.createDate.date} </>,
            time: shop.createDate.time,
            actions: <>
                <BsTrash tabIndex="0" className="table-action-icon" onClick={() => showDeleteConfirmationModal(shop)} onKeyPress={e => e.key === 'Enter' && showDeleteConfirmationModal(shop)}/>
                {/*TODO: add action to show all expense from this shop*/}
            </>
        }))
    const columns = [{
        dataField: 'shopName',
        text: 'Shop name',
        sort: true,
        sortFunc: sortByName
      }, {
        dataField: 'date',
        text: 'Created date',
        sort: true,
        sortFunc: dateSort
      }, {
        dataField: 'time',
        text: 'Created time',
        sort: true
      }, {
        dataField: 'actions',
        text: 'Action'  
      }, {
        dataField: 'id',
        hidden: true
      }];

    const defaultSorted = [{
        dataField: 'shopName',
        order: 'asc'
    }]
    
    const paginationOptions = {
        sizePerPage: 5,
        hideSizePerPage: true, 
        hidePageListOnlyOnePage: true,
        alwaysShowAllBtns: false,
    }

    return (
        <>
            { !shops && isShopsLoading ? <Spinner animation="border text-center" size="lg" /> :  shops && shops.length > 0 ?  
                <>
                    <Form.Group className="text-right add-new-container">
                        <BsPlus tabIndex="0" className="icon-add" onClick={handleAddNewShop} onKeyPress={e => e.key === 'Enter' && handleAddNewShop()}/>
                    </Form.Group>
                    <BootstrapTable 
                        classes="list-table" 
                        bootstrap4 
                        keyField="id" 
                        data={ products } 
                        columns={ columns }
                        bordered={false}
                        defaultSorted={defaultSorted}
                        pagination={ paginationFactory(paginationOptions) }
                    />
                    {shops?.map((shop) => (
                        <ConfirmationModal key={shop.id} id={"shop_" + shop.shopName.trim() + "_" + shop.id} confirmationFunction={() => handleDeleteShop(shop.id)} confirmationMessage={"Are you sure you want to delete " + shop.shopName + "?"} />
                    ))};
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