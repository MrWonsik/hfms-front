import React from 'react';
import { useDispatch } from 'react-redux';
import Spinner from "react-bootstrap/Spinner";
import { BsTrash, BsStarFill, BsStar, BsSquareFill, BsCalendar } from 'react-icons/bs'
import { openConfirmationModal, openModalAddNewCategory } from '../modal/modal.actions';
import ConfirmationModal from './modal/ConfirmationModal';
import Alert from "react-bootstrap/Alert";
import { dateSort, sortByName } from '../_helpers/tableBootstrapSorter';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const CategoriesTable = ({ type, categories, isLoading, handleDeleteCategory, handleIsFavouriteClicked }) => {

    const dispatch = useDispatch();

    const showDeleteConfirmationModal = (category) => {
        dispatch(openConfirmationModal("category_" + category.categoryName.trim() + "_" + category.id));
    }

    const handleAddNewCategory = () => {
        dispatch(openModalAddNewCategory());
    }

    const products = categories?.map((category) => ({
            id: category.id,
            categoryName: <>{category.categoryName} <span className="additionaly-info">({category.id})</span></>,
            color: <><BsSquareFill className="align-baseline" color={category.colorHex} /> {category.colorHex}</>,
            created: <><BsCalendar /> {category.createDate.date}</>,
            isFavourite: category.favourite,
            actions: <>
                <BsTrash tabIndex="0" className="table-action-icon" onClick={() => showDeleteConfirmationModal(category)} onKeyPress={e => e.key === 'Enter' && showDeleteConfirmationModal(category)}/>
                {category.favourite ? 
                    <BsStarFill className="table-action-icon" onClick={() => handleIsFavouriteClicked(category)} onKeyPress={e => e.key === 'Enter' && handleIsFavouriteClicked(category)} /> : 
                    <BsStar className="table-action-icon" onClick={() => handleIsFavouriteClicked(category)} onKeyPress={e => e.key === 'Enter' && handleIsFavouriteClicked(category)} />}
            </>
    }))
    
    const columns = [{
        dataField: 'categoryName',
        text: 'Name',
        sort: true,
        sortFunc: sortByName
      }, {
        dataField: 'color',
        text: 'Color',
      }, {
        dataField: 'created',
        text: 'Created',
        sort: true,
        sortFunc: dateSort
      }, {
        dataField: 'actions',
        text: 'Action'  
      }, {
        dataField: 'id',
        hidden: true
      }, {
        dataField: 'isFavourite',
        hidden: true
      }];

    const defaultSorted = [{
        dataField: 'categoryName',
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
            { !categories && isLoading === true ? <Spinner animation="border text-center" size="lg" /> :  categories?.length > 0 ?  
                <>
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
                    {categories?.map((category) => (
                        <ConfirmationModal key={category.id} id={"category_" + category.categoryName.trim() + "_" + category.id} confirmationFunction={() => handleDeleteCategory(category.id)} confirmationMessage={"Are you sure you want to delete " + category.categoryName + "?"} />
                    ))}
                </> :
                <Alert className="text-center" variant="light">
                    You don't have any categories yet. To add new category <Alert.Link onClick={handleAddNewCategory}>click here</Alert.Link>.
                </Alert>
            }
        </>
    );
}

export default CategoriesTable;