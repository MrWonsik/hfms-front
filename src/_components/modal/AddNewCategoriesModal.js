import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { closeModalAddNewCategory } from '../../modal/modal.actions'
import { createExpenseCategory } from "../../finance/finance.actions";

export const AddNewCategoriesModal = () => {

    const dispatch = useDispatch();

    const { addNewCategoryModalIsOpen, creatingCategoriesInProgress } = useSelector(state => ({
        addNewCategoryModalIsOpen: state.modals.addNewCategoryModalIsOpen,
        creatingCategoriesInProgress: state.finance.creatingCategoriesInProgress
    }));

    const [submitted, setSubmitted] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    const handleClose = () => {
        dispatch(closeModalAddNewCategory())
        setCategoryName("");
        setSubmitted(false);
      }

    const handleAddNewCategories = (e) => {
        e.preventDefault();
    
        setSubmitted(true);
        if (categoryName) {
            dispatch(createExpenseCategory({ categoryName })).then((isCategoriesCreated) => {
                if(isCategoriesCreated) {
                    handleClose();
                }
            });
        }
      };

    return (<Modal show={addNewCategoryModalIsOpen} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Categories creator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group controlId="categoryName">
                <Form.Label>Category name:</Form.Label>
                <Form.Control
                    type="text"
                    className={ "form-control" + (submitted && !categoryName ? " is-invalid" : "") }
                    name="categoryName"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Enter category name"
                />
            <Form.Control.Feedback type="invalid">
                Category name is required
            </Form.Control.Feedback>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            { creatingCategoriesInProgress && <Spinner animation="border" size="sm" />}
            <Button type="submit" variant="primary" onClick={handleAddNewCategories}>
                    Create categories
            </Button>
        </Modal.Footer>
      </Modal>)
}

export default AddNewCategoriesModal;