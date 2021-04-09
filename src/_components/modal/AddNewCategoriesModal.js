import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import { closeModalAddNewCategory } from '../../modal/modal.actions'
import { createExpenseCategory } from "../../finance/finance.actions";
import { BsCircle, BsCircleFill } from "react-icons/bs";

export const AddNewCategoriesModal = () => {

    const dispatch = useDispatch();

    const { addNewCategoryModalIsOpen, creatingCategoriesInProgress } = useSelector(state => ({
        addNewCategoryModalIsOpen: state.modals.addNewCategoryModalIsOpen,
        creatingCategoriesInProgress: state.finance.creatingCategoriesInProgress
    }));

    const [submitted, setSubmitted] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [colorHex, setColorHex] = useState("");
    const [categoryType, setCategoryType] = useState("Expense category");
    const [maximumCategoryAmount, setMaximumCategoryAmount] = useState(0);
    const [isFavourite, setIsFavourite] = useState(false);

    const handleClose = () => {
        dispatch(closeModalAddNewCategory())
        setCategoryName("");
        setColorHex("");
        setCategoryType("Expense category");
        setMaximumCategoryAmount(0);
        setSubmitted(false);
      }

    const handleAddNewCategories = (e) => {
        e.preventDefault();
        console.log(isFavourite)
        setSubmitted(true);
        if (categoryName) {
            dispatch(createExpenseCategory({ categoryName, colorHex: (colorHex ? colorHex : null), isFavourite })).then((isCategoriesCreated) => {
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
                <Form.Label>Role:</Form.Label>
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
            {categoryType === "Expense category" &&
                <Form.Group controlId="maximumCategoryAmount">
                    <Form.Label>Maximum category amount:</Form.Label>
                        <Form.Control
                            type="number"
                            className={ "form-control" + (submitted && maximumCategoryAmount < 0 ? " is-invalid" : "")}
                            name="maximumCategoryAmount"
                            value={maximumCategoryAmount}
                            onChange={(e) => setMaximumCategoryAmount(e.target.value)}
                            min="0"
                            step="0.01"
                            placeholder="0,00"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide correct positive number or 0 to not set maximum amount. 
                        </Form.Control.Feedback>
                </Form.Group>
            }
            <Form.Group controlId="isFavourite">
                <Form.Check //TODO: Change color of switch!
                    type="switch"
                    name="isFavourite"
                    onChange={() => setIsFavourite(!isFavourite)}
                    value={isFavourite}
                    label="is favourite"
                />
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