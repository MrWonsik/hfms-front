import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import { closeModalEditCategory } from '../../modal/modal.actions'
import { editCategory } from "../../finance/finance.actions";
import { BsCircleFill } from "react-icons/bs";
import PropTypes from "prop-types";

const EditCategoryModal = ({id, category, categoryType}) => {

    const dispatch = useDispatch();

    const { editCategoryModal, isEditCategoryInProgress } = useSelector(state => ({
        editCategoryModal: state.modals.editCategoryModal,
        isEditCategoryInProgress: state.finance.isEditCategoryInProgress
    }));

    const [submitted, setSubmitted] = useState(false);
    const [categoryName, setCategoryName] = useState(category.categoryName);
    const [colorHex, setColorHex] = useState(category.colorHex);

    const handleClose = () => {
        dispatch(closeModalEditCategory())
        setSubmitted(false);
      }

    const handleEditCategory = (e) => {
        e.preventDefault();

        setSubmitted(true);
        if (categoryName) {
            dispatch(editCategory({ 
                categoryId: category.id,
                categoryName: (category.categoryName != categoryName ? categoryName : null ), 
                colorHex: (category.colorHex != colorHex ? colorHex : null), 
                categoryType
            }))
            .then((isCategoriesEdited) => {
                if(isCategoriesEdited) {
                    handleClose();
                }
            });
        }
      };

    return (<Modal show={editCategoryModal && id === editCategoryModal.contextId && editCategoryModal.isOpen } onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Edit category ({category.categoryName})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Row>
                <Form.Group as={Col} md={8} controlId="categoryName">
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
                <Form.Group as={Col} controlId="colorHex">
                    <Form.Label>Category color:</Form.Label>
                        <div className="color-picker-wrapper">
                                <>
                                    <BsCircleFill className="color-picker-circle" style={{color: colorHex}}/>
                                    <div className="color-picker-value">{colorHex}</div>
                                </>
                            <Form.Control 
                                className="color-picker"
                                type="color" 
                                name="colorHex"
                                value={colorHex}
                                onChange={(e) => setColorHex(e.target.value)}
                            />
                        </div>
                </Form.Group>
            </Form.Row>
        </Modal.Body>
        <Modal.Footer>
            { isEditCategoryInProgress && <Spinner animation="border" size="sm" />}
            <Button type="submit" variant="primary" onClick={handleEditCategory}>
                    Edit category
            </Button>
        </Modal.Footer>
      </Modal>)
}

EditCategoryModal.propTypes = {
    id: PropTypes.string.isRequired,
    category: PropTypes.object.isRequired,
    categoryType: PropTypes.string.isRequired
}

export default EditCategoryModal;