import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import { closeModalAddNewCategory } from '../../modal/modal.actions'
import { createCategory } from "../../finance/finance.actions";
import { BsCircle, BsCircleFill } from "react-icons/bs";
import { EXPENSE } from '../../finance/CategoryType';

export const AddNewCategoryModal = () => {

    const dispatch = useDispatch();

    const { addNewCategoryModalIsOpen, creatingCategoryInProgress } = useSelector(state => ({
        addNewCategoryModalIsOpen: state.modals.addNewCategoryModalIsOpen,
        creatingCategoryInProgress: state.finance.creatingCategoryInProgress
    }));

    const [submitted, setSubmitted] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [colorHex, setColorHex] = useState(undefined);
    const [categoryType, setCategoryType] = useState(EXPENSE);
    const [maximumCost, setMaximumCost] = useState(0);
    const [isFavourite, setIsFavourite] = useState(false);

    const handleClose = () => {
        dispatch(closeModalAddNewCategory())
        setCategoryName("");
        setColorHex(undefined);
        setCategoryType(EXPENSE);
        setMaximumCost(0);
        setSubmitted(false);
      }

    const handleAddNewCategory = (e) => {
        e.preventDefault();

        setSubmitted(true);
        if (categoryName && categoryType) {
            dispatch(createCategory({ 
                categoryName, 
                colorHex: (colorHex ? colorHex : null), 
                isFavourite,
                maximumCost,
                categoryType: categoryType
             }))
            .then((isCategoriesCreated) => {
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
                            {colorHex ? 
                                <>
                                    <BsCircleFill className="color-picker-circle" style={{color: colorHex}}/>
                                    <div className="color-picker-value">{colorHex}</div>
                                </> 
                            : 
                                <>
                                    <BsCircle className="color-picker-circle" />
                                    <div className="color-picker-value">random</div>
                                </>
                            }
                            
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
            <Form.Group controlId="categoryType">
                <Form.Label>Category type:</Form.Label>
                    <Form.Control
                        as="select"
                        className={ "form-control"}
                        name="categoryType"
                        value={categoryType}
                        onChange={(e) => setCategoryType(e.target.value)}
                    >
                        <option>Expense category</option>
                        <option>Income category</option>
                    </Form.Control>
            </Form.Group>
            {categoryType === EXPENSE &&
                <Form.Group controlId="maximumCategoryCost">
                    <Form.Label>Maximum category cost:</Form.Label>
                        <Form.Control
                            type="number"
                            className={ "form-control" + (submitted && maximumCost < 0 ? " is-invalid" : "")}
                            name="maximumCategoryCost"
                            value={maximumCost}
                            onChange={(e) => setMaximumCost(e.target.value)}
                            min="0"
                            step="0.01"
                            placeholder="0,00"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide correct positive number set maximum cost (or 0 to not set any maximum value). 
                        </Form.Control.Feedback>
                </Form.Group>
            }
            <Form.Group controlId="isFavourite">
                <Form.Check
                    type="switch"
                    name="isFavourite"
                    onChange={() => setIsFavourite(!isFavourite)}
                    value={isFavourite}
                    label="is favourite"
                />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            { creatingCategoryInProgress && <Spinner animation="border" size="sm" />}
            <Button type="submit" variant="primary" onClick={handleAddNewCategory}>
                    Create categories
            </Button>
        </Modal.Footer>
      </Modal>)
}

export default AddNewCategoryModal;