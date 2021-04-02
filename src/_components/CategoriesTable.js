import React from 'react';
import { useDispatch } from 'react-redux';
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { BsTrash, BsStarFill, BsStar, BsSquareFill } from 'react-icons/bs'
import { openConfirmationModal, openModalAddNewCategory } from '../modal/modal.actions';
import ConfirmationModal from './modal/ConfirmationModal';
import Alert from "react-bootstrap/Alert";

const CategoriesTable = ({ type, categories, isLoading }) => {

    const dispatch = useDispatch();

    const showDeleteConfirmationModal = (category) => {
        dispatch(openConfirmationModal("category_" + category.categoryName.trim() + "_" + category.id));
    }

    const handleAddNewCategory = () => {
        dispatch(openModalAddNewCategory());
    }

    return (
        <>
            { !categories && isLoading ? <Spinner animation="border text-center" size="lg" /> :  categories && categories.length > 0 ?  
                <>
                    {/*TODO: add button to add new shop */}
                    <Table responsive hover className="list-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Color</th>
                            <th>Created</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.map((category) => (
                            <tr key={category.id}>
                                    <td>{category.categoryName} <span className="additionaly-info">({category.id})</span></td>
                                    <td><BsSquareFill className="align-baseline" color={category.colorHex} /> {category.colorHex}</td>{/* todo: show somehow this color */}
                                    <td>{category.createDate.date}, {category.createDate.time}</td>
                                    <td>
                                        <BsTrash tabIndex="0" className="table-action-icon" onClick={() => showDeleteConfirmationModal(category)} onKeyPress={e => e.key === 'Enter' && showDeleteConfirmationModal(category)}/>
                                        {category.favourite ? <BsStarFill className="table-action-icon" /> : <BsStar className="table-action-icon" />}
                                    </td>
                                    <ConfirmationModal id={"category_" + category.categoryName.trim() + "_" + category.id} confirmationMessage={"Are you sure you want to delete " + category.categoryName + "?"} />
                            </tr>
                        ))}
                    </tbody>
                    </Table>
                    
                </> :
                <Alert className="text-center" variant="light">
                    You don't have any categories yet. To add new category <Alert.Link onClick={handleAddNewCategory}>click here</Alert.Link>.
                </Alert>
            }
        </>
    );
}

export default CategoriesTable;