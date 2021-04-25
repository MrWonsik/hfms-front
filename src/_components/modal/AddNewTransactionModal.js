import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import { closeModalAddNewTransaction } from '../../modal/modal.actions'
import { EXPENSE_TRANSACTION } from "../../finance/TransactionType";
import { createTransaction } from "../../finance/finance.actions";

export const AddNewTransactionModal = () => {
    const dispatch = useDispatch();

    const { addNewTransactionModalIsOpen, creatingTransactionInProgress, expenseCategories, incomeCategories, shops } = useSelector(state => ({
        addNewTransactionModalIsOpen: state.modals.addNewTransactionModalIsOpen,
        creatingTransactionInProgress: state.finance.creatingTransactionInProgress,
        expenseCategories: state.finance.expenseCategories,
        incomeCategories: state.finance.incomeCategories,
        shops: state.finance.shops
    }));

    const [submitted, setSubmitted] = useState(false);
    const [transactionName, setTransactionName] = useState("");
    const [category, setCategory] = useState(undefined);
    const [shop, setShop] = useState(undefined);
    const [transactionType, setTransactionType] = useState(EXPENSE_TRANSACTION);
    const [cost, setMaximumCost] = useState(0);
    const [receiptFile, setReceiptFile] = useState(undefined);

    const handleClose = () => {
        dispatch(closeModalAddNewTransaction())
        setTransactionName("");
        setTransactionType(EXPENSE_TRANSACTION);
        setMaximumCost(0);
        setSubmitted(false);
      }

    const handleAddNewTransaction = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (transactionName && transactionType && cost && cost >= 0 && category && category.name !== "Please wait") {
            dispatch(createTransaction({ 
                name: transactionName, 
                cost: cost,
                transactionType: transactionType,
                shop: shop,
                receiptFile: receiptFile,
                categoryId: category.id
             }))
            .then((isCategoriesCreated) => {
                if(isCategoriesCreated) {
                    handleClose();
                }
            });
        }
      };


    const getOptions = (categories) => {
        return categories?.sort((a,b) => a.categoryName.localeCompare(b.categoryName)).sort(a => a.favourite ? -1 : 1).map((category) => 
            (<option key={category.id} value={category.categoryName} id={category.id}>{category.categoryName} {category.favourite && "★"}</option>))
    }

    const expenseCategoriesMap = getOptions(expenseCategories);
    
    const incomeCategoriesMap = getOptions(incomeCategories);

    return (
        <Modal show={addNewTransactionModalIsOpen} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add new transaction:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Row>
                    <Form.Group as={Col} sm={8} controlId="transactionName">
                        <Form.Label>Transaction name:</Form.Label>
                        <Form.Control
                            type="text"
                            className={ "form-control" + (submitted && !transactionName ? " is-invalid" : "") }
                            name="transactionName"
                            value={transactionName}
                            onChange={(e) => setTransactionName(e.target.value)}
                            placeholder="Enter transaction name"
                        />
                    <Form.Control.Feedback type="invalid">
                        Transaction name is required
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="cost">
                            <Form.Label>Cost:</Form.Label>
                            <Form.Control
                                type="number"
                                className={ "form-control" + (submitted && cost < 0 ? " is-invalid" : "")}
                                name="cost"
                                value={cost}
                                onChange={(e) => setMaximumCost(e.target.value)}
                                min="0"
                                step="0.01"
                                placeholder="0,00"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide correct positive number cost. 
                            </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="transactionType">
                        <Form.Label>Transaction type:</Form.Label>
                            <Form.Control
                                as="select"
                                className={ "form-control"}
                                name="transactionType"
                                value={transactionType}
                                onChange={(e) => {
                                    setTransactionType(e.target.value)
                                    setCategory(undefined)
                                }}
                            >
                                <option>Expense</option>
                                <option>Income</option>
                            </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="category">
                        <Form.Label>Category:</Form.Label>
                            <Form.Control
                                as="select"
                                className={ "form-control" + (submitted && (!category || category.name === "Please select") ? " is-invalid" : "") }
                                name="category"
                                value={category?.name}
                                onChange={(e) => {
                                    let element = document.querySelector("option[value=\"" + e.target.value + "\"]");
                                    let category = element != null ? {id: element.getAttribute("id"), name: e.target.value } : undefined;
                                    setCategory(category)
                                }}
                            >
                                <option>Please select</option>
                                {transactionType === EXPENSE_TRANSACTION ? expenseCategoriesMap : incomeCategoriesMap }
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please select category 
                            </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                {transactionType === EXPENSE_TRANSACTION &&
                    <>
                    <Form.File
                        label="Receipt file (.jpg, max 5MB)"
                        name="receiptFile"
                        // value={receiptFile?.name}
                        onChange={(e) => setReceiptFile(e.target.files[0])}
                    />
                    <br/>
                    <Form.Label>Shop name:</Form.Label>
                    <Form.Control
                        list="shop-list"
                        type="text"
                        className="form-control"
                        name="shop"
                        value={shop?.name}
                        onChange={(e) => {
                            let element = document.querySelector("option[value=\"" + e.target.value + "\"]");
                            setShop({id: element != null ? element.getAttribute("id") : undefined, name: e.target.value})
                        }}
                        placeholder="Enter shop name"
                    />
                    {shops &&
                        <datalist id="shop-list">
                            {shops.map(shop => 
                                <option id={shop.id} key={shop.id} value={shop.shopName}>{shop.createDate.date}</option>
                            )}
                        </datalist>
                    }
                </>
                }
                
            </Modal.Body>
            <Modal.Footer>
                { creatingTransactionInProgress && <Spinner animation="border" size="sm" />}
                <Button type="submit" variant="primary" onClick={handleAddNewTransaction}>
                        Create transaction
                </Button>
            </Modal.Footer>
        </Modal>)
}

export default AddNewTransactionModal;