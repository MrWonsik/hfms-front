import React from 'react';
import { useDispatch } from 'react-redux';
import Spinner from "react-bootstrap/Spinner";
import { BsTrash, BsStarFill, BsStar, BsSquareFill, BsCalendar, BsClipboardData, BsPencil } from 'react-icons/bs'
import { openConfirmationModal, openModalAddNewCategory, openModalEditCategory, openModalEditMaximumCost } from '../modal/modal.actions';
import ConfirmationModal from './modal/ConfirmationModal';
import Alert from "react-bootstrap/Alert";
import { dateSort, sortByName } from '../_helpers/tableBootstrapSorter';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { changeStateFavouriteExepenseCategory, deleteCategory } from '../finance/finance.actions';
import { EXPENSE } from '../finance/CategoryType';
import EditMaximumCostModal from './modal/EditMaximumCostModal';
import PropTypes from "prop-types";
import { getIconWithActionAndTooltip } from '../_helpers/wrapWithTooltip';
import EditCategoryModal from './modal/EditCategoryModal';
import Loader from '../_helpers/Loader';

const CategoriesTable = ({ type, categories, isLoading }) => {

    const dispatch = useDispatch();

    const showDeleteConfirmationModal = (category) => {
        dispatch(openConfirmationModal("category_confirmation_" + category.categoryName.trim() + "_" + category.id));
    }

    const showEditMaximumCostModal = (category) => {
        dispatch(openModalEditMaximumCost("category_edit_maximum_cost" + category.categoryName.trim() + "_" + category.id));
    }

    const showEditCategoryModal = (category) => {
        dispatch(openModalEditCategory("category_edit" + category.categoryName.trim() + "_" + category.id));
    }

    const handleAddNewCategory = () => {
        dispatch(openModalAddNewCategory());
    }

    const handleIsFavouriteClicked = (category) => {
        dispatch(changeStateFavouriteExepenseCategory(category));
    }

    const handleDeleteCategory = (id, categoryType) => {
        dispatch(deleteCategory(id, categoryType));
    }

    const products = categories?.map((category) => ({
            id: category.id,
            categoryName: <>{category.categoryName} <span className="additionaly-info">({category.id})</span></>,
            color: <><BsSquareFill className="align-baseline" color={category.colorHex} /> {category.colorHex}</>,
            created: <><BsCalendar /> {category.createDate.date}</>,
            isFavourite: category.favourite,
            actions: <>
                {getIconWithActionAndTooltip(BsStarFill, "table-action-icon", () => handleIsFavouriteClicked({...category, type}), "top", "Delete from favourite", category.favourite)}
                {getIconWithActionAndTooltip(BsStar, "table-action-icon", () => handleIsFavouriteClicked({...category, type}), "top", "Add to favourite", !category.favourite)}
                {type === EXPENSE && getIconWithActionAndTooltip(BsClipboardData, "table-action-icon", () => showEditMaximumCostModal(category), "top", "Plan maximum cost")}
                {getIconWithActionAndTooltip(BsPencil, "table-action-icon", () => showEditCategoryModal(category), "top", "Edit")}
                {getIconWithActionAndTooltip(BsTrash, "table-action-icon", () => showDeleteConfirmationModal(category), "top", "Delete")}
            </>,
            maximumCost: type === EXPENSE ? category.currentVersion.maximumCost : null
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
        dataField: 'maximumCost',
        text: "Maximum cost", //TODO: Add some description of this coulmn...
        hidden: type === EXPENSE ? false : true,
        sort: true,
        formatter: (cell) => Math.round(cell * 100 / 100).toFixed(2) + " zł"
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
            { isLoading === true ? <Loader /> :  categories?.length > 0 ?  
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
                        <div key={category.id}>
                            <ConfirmationModal id={"category_confirmation_" + category.categoryName.trim() + "_" + category.id} confirmationFunction={() => handleDeleteCategory(category.id, type)} confirmationMessage={"Are you sure you want to delete " + category.categoryName + "?"} />
                            {type === EXPENSE && <EditMaximumCostModal id={"category_edit_maximum_cost" + category.categoryName.trim() + "_" + category.id} category={category} />}
                            <EditCategoryModal id={"category_edit" + category.categoryName.trim() + "_" + category.id} category={category} categoryType={type}/>
                        </div>
                    ))}
                </> :
                <Alert className="text-center" variant="light">
                    You don`t have any categories yet. To add new category <Alert.Link onClick={handleAddNewCategory}>click here</Alert.Link>.
                </Alert>
            }
        </>
    );
}

CategoriesTable.propTypes = {
    type: PropTypes.string.isRequired, 
    categories: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired
}

export default CategoriesTable;