import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { closeTransactionDetailsModal } from '../../modal/modal.actions'
import { Col, Form, Image, Spinner } from "react-bootstrap";
import Lightbox from 'react-image-lightbox';
import { BsPlusCircle, BsTrash, BsTrashFill, BsUpload } from "react-icons/bs";
import { getIconWithActionAndTooltip } from "../../_helpers/wrapWithTooltip";
import { EXPENSE_TRANSACTION } from "../../finance/TransactionType";
import { deleteTransactionFile, updateTransaction, uploadTransactionFile } from "../../finance/finance.actions";
import cloneDeep from "lodash/cloneDeep"

export const TransactionDetailsModal = ({ id, transaction }) => {
    const dispatch = useDispatch();
    const isExpenseTransaction = transaction.type === EXPENSE_TRANSACTION;

    const { transactionDetailsModal, expenseFileRequestLoading, expenseDetailsBytes, expenseCategories, incomeCategories, shops, updateTransactionInProgress } = useSelector(state => ({
        transactionDetailsModal: state.modals.transactionDetailsModal,
        expenseFileRequestLoading: state.finance.expenseFileRequestLoading,
        expenseDetailsBytes: state.finance.expenseDetailsBytes,
        expenseCategories: state.finance.expenseCategories,
        incomeCategories: state.finance.incomeCategories,
        shops: state.finance.shops,
        updateTransactionInProgress: state.finance.updateTransactionInProgress
    }));

    let [openImage, setOpenImage] = useState(false);

    const getFormattedDate = () => {
        let date = new Date(transaction.createdDate);
        let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        let month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
        let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        return `${day} ${month} ${year}`;
    }

    const uploadFile = (file, transactionId) => {
        dispatch(uploadTransactionFile(transactionId, file));
    }

    const deleteFile = (transactionId) => {
        dispatch(deleteTransactionFile(transactionId))
    }

    const updateTransactionHandleClick = () => {
        if(!updatable) {
            return;
        }

        setSubmitted(true);
        if (transactionName && amount && amount >= 0 && category && category.name !== "Please wait") {
            if(isExpenseTransaction && !(expensePositionList?.every(position => position.positionName !== ""))) {
                return;
            }
            dispatch(updateTransaction ({
                id: transaction.id,
                name: transactionName, 
                amount: amount,
                transactionType: transaction.type,
                shop: shop,
                categoryId: category.id,
                expensePositions: expensePositionList,
                transactionDate: transactionDate,
             }))
            .then((isTransactionUpdated) => {
                if(isTransactionUpdated) {
                    dispatch(closeTransactionDetailsModal());
                }
            });
        }
    }

    const handleClose = () => {
        dispatch(closeTransactionDetailsModal())
        setSubmitted(false);
        setTransactionName(transaction.name);
        setAmount(transaction.amount);
        setCategory({ id: transaction.category?.id, name: transaction.category?.name});
        setShop({id: transaction.shop?.id, name: transaction.shop?.name});
        setTransactionDate(transaction.createdDate);
        setExpensePositionList(cloneDeep(transaction.expensePositionList));
    }

    const [submitted, setSubmitted] = useState(false);
    const [transactionName, setTransactionName] = useState(transaction.name);
    const [amount, setAmount] = useState(transaction.amount);
    const [category, setCategory] = useState({ id: transaction.category?.id, name: transaction.category?.name});
    const [shop, setShop] = useState({id: transaction.shop?.id, name: transaction.shop?.name});
    const [transactionDate, setTransactionDate] = useState(transaction.createdDate);
    const [updatable, setUpdatable] = useState(false);
    const [expensePositionList, setExpensePositionList] = useState(cloneDeep(transaction.expensePositionList));

    const clickUploadFile = () => {
        document.getElementById("upload-file-id").click();
    }

    const addNewPositionToList = () => {
        setExpensePositionList([...expensePositionList, {id: null, positionName: "", size: 1, amount: 0}]);
    }

    const deletePositionFromList = (index) => {
        let positions = [...expensePositionList];
        positions.splice(index, 1);
        setExpensePositionList(positions);
    }    
    

    const updatePositionName = index => e => {
        let position = [...expensePositionList];
        position[index].positionName = e.target.value;
        setExpensePositionList(position);
    }
    
    const updatePositionAmount = index => e => {
        let position = [...expensePositionList];
        position[index].amount = e.target.value;
        setExpensePositionList(position);
    }

    const updatePositionSize = index => e => {
        let position = [...expensePositionList];
        position[index].size = e.target.value;
        setExpensePositionList(position);
    }

    useEffect(() => {
        if(transactionName !== transaction.name ||
            amount !== transaction.amount ||
            category?.name !== transaction.category?.name ||
            (shop?.name !== transaction.shop?.name && shop?.id !== transaction.shop?.id) || 
            JSON.stringify(expensePositionList) != JSON.stringify(transaction.expensePositionList) || 
            transactionDate !== transaction.createdDate) {
            setUpdatable(true);
        } else {
            setUpdatable(false);
        }
    }, [transactionName, amount, category, shop, transactionDate, expensePositionList])


    const getOptions = (categories) => {
        return categories?.sort((a,b) => a.categoryName.localeCompare(b.categoryName)).sort(a => a.favourite ? -1 : 1).map((category) => 
            (<option key={category.id} value={category.categoryName} id={category.id}>{category.categoryName} {category.favourite && "★"}</option>))
    }

    return (
            <>
            {openImage && <Lightbox mainSrc={expenseDetailsBytes} onCloseRequest={() => setOpenImage(false)}/> }
            <Modal size={isExpenseTransaction ? "lg" : "md"} show={transactionDetailsModal && id === transactionDetailsModal.contextId && transactionDetailsModal.isOpen} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{transaction.name} - {getFormattedDate()}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="transaction-details-container">
                    <Form.Row className="transaction-detail-container">
                        <Col sm={isExpenseTransaction ? 6 : 12} className="transaction-detail-form-col">
                        <Form.Row className="transaction-detail-form-row-2">
                            <Form.Label className="transaction-details-label">Name:</Form.Label>
                            <Col>
                                <Form.Control
                                    type="text"
                                    className={submitted && !transactionName ? " is-invalid" : ""}
                                    name="transactionName"
                                    value={transactionName}
                                    onChange={(e) => setTransactionName(e.target.value)}
                                    placeholder={submitted && !transactionName ? "Name is required" : "Transaction name"}
                                />
                            </Col>
                        </Form.Row>
                        <Form.Row className="transaction-detail-form-row-2">
                                <Form.Label className="transaction-details-label transaction-details-label-date">Date:
                                    <Form.Control
                                        type="date"
                                        name="transactionDate"
                                        value={transactionDate}
                                        onChange={(e) => {
                                            setTransactionDate(e.target.value);
                                        }}
                                        className="transaction-details-date-input"
                                    />
                                </Form.Label>
                        </Form.Row>
                        <Form.Row className="transaction-detail-form-row-2"> 
                            <Form.Label className="transaction-details-label">Amount:</Form.Label>
                            <Col>
                                <Form.Control
                                    type="number"
                                    className={(submitted && amount <= 0 ? " is-invalid" : "")}
                                    name="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    min="0"
                                    step="0.01"
                                    placeholder={submitted && amount <= 0 ? "Amount > 0" : "0,00"}
                                />
                            </Col>
                        </Form.Row>
                        <Form.Row className="transaction-detail-form-row-2">
                            <Form.Label className="transaction-details-label">Category:</Form.Label>
                            <Col>
                                <Form.Control
                                    as="select"
                                    className={submitted && (!category || category.name === "Please select") ? " is-invalid" : ""}
                                    name="category"
                                    value={category?.name}
                                    onChange={(e) => {
                                        let element = document.querySelector("option[value=\"" + e.target.value + "\"]");
                                        let category = element != null ? {id: element.getAttribute("id"), name: e.target.value } : undefined;
                                        setCategory(category)
                                    }}
                                >
                                    <option>Please select</option>
                                    {isExpenseTransaction ? getOptions(expenseCategories) : getOptions(incomeCategories) }
                                </Form.Control>
                            </Col>
                        </Form.Row>
                        {isExpenseTransaction && 
                        <Form.Row className="transaction-detail-form-row-2">
                            <Form.Label className="transaction-details-label">Shop name:</Form.Label>
                            <Col>
                                <Form.Control
                                    list="shop-list"
                                    type="text"
                                    className={submitted && !shop.name ? " is-invalid" : ""}
                                    name="shop"
                                    value={shop.name ? shop.name : ""}
                                    onChange={(e) => {
                                        let element = document.querySelector("option[value=\"" + e.target.value + "\"]");
                                        setShop({id: element != null ? element.getAttribute("id") : undefined, name: e.target.value})
                                    }}
                                    placeholder={submitted && !shop.name ? "Shop name is required" : "Shop name"}
                                />
                                {shops &&
                                    <datalist id="shop-list">
                                        {shops.map(shop => 
                                            <option id={shop.id} key={shop.id} value={shop.name}>{shop.createDate.date}</option>
                                        )}
                                    </datalist>
                                }
                            </Col>
                        </Form.Row>
                        }
                        </Col>
                        {transaction.type == EXPENSE_TRANSACTION && 
                            <Col sm={6} className="transaction-detail-form-col">
                                <div className="transaction-image-container">
                                    {transaction.receiptId ?
                                        expenseFileRequestLoading 
                                        ? <div className="text-center"><Spinner animation="border" size="sm" /></div>
                                        : <Image src={expenseDetailsBytes} alt="recipt" className="transaction-image" onClick={() => setOpenImage(true)} fluid />
                                    :
                                        <div className="text-center">No image</div>
                                    }
                                </div>
                                <div className="text-center">
                                    {getIconWithActionAndTooltip(BsUpload, "transaction-image-icon" + (transaction.receiptId ? " disabled" : ""), () => clickUploadFile(), "top", "Upload file")}
                                    <Form.File id="upload-file-id" hidden onChange={(e) => uploadFile(e.target.files[0], transaction.id)}/>
                                    {getIconWithActionAndTooltip(BsTrash, "transaction-image-icon" + (!transaction.receiptId ? " disabled" : ""), () => deleteFile(transaction.id), "top", "Delete file")} 
                                </div>
                            </Col>
                        }
                    </Form.Row>
                    <br/>
                    <hr></hr>
                    { transaction.type == EXPENSE_TRANSACTION &&
                        <> 
                            <span>Position list (optional) </span>{getIconWithActionAndTooltip(
                                                                            BsPlusCircle,
                                                                            "transaction-add-position-icon", 
                                                                            () => addNewPositionToList(),
                                                                            "top", "Click to add new position")}
                            <br/>
                            <br/>
                            {expensePositionList?.length > 0 &&
                                <Form.Row>
                                    <Form.Label as={Col}>Name:</Form.Label>
                                    <Form.Label as={Col} xs={3}>Quantity:</Form.Label>
                                    <Form.Label as={Col} xs={3}>Amount:</Form.Label>
                                    <div className="trash-no-label"></div>
                                </Form.Row>
                            }
                            {expensePositionList?.map((position,index) => {
                                return <div key={index}>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId={"positionName" + index}>
                                                    <Form.Control
                                                        type="text"
                                                        className={submitted && position?.positionName === "" ? " is-invalid" : ""}
                                                        name={"positionName" + index}
                                                        value={position?.positionName}
                                                        onChange={updatePositionName(index)}
                                                        placeholder="Enter position"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Transaction name is required
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group as={Col} xs={3} controlId={"positionSize" + index}>
                                                    <Form.Control
                                                        type="number"
                                                        className={submitted && position?.size <= 0 ? " is-invalid" : ""}
                                                        name={"positionSize" + index}
                                                        value={position?.size}
                                                        onChange={updatePositionSize(index)}
                                                        min="0"
                                                        step="0.01"
                                                        placeholder="0.00"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Size must be bigger than 0.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group as={Col} xs={3} controlId={"positionAmount" + index}>
                                                    <Form.Control
                                                        type="number"
                                                        className={submitted && position?.amount <= 0 ? " is-invalid" : ""}
                                                        name={"positionAmount" + index}
                                                        value={position?.amount}
                                                        onChange={updatePositionAmount(index)}
                                                        min="0"
                                                        step="0.01"
                                                        placeholder="0.00"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Amount must be bigger than 0.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                {getIconWithActionAndTooltip(
                                                                            BsTrashFill,
                                                                            "transaction-delete-position-icon", 
                                                                            () => deletePositionFromList(index),
                                                                            "top", "Click to delete position")}
                                            </Form.Row>
                                        </div>
                            })}
                        </>
                    }     
                </Modal.Body>
                <Modal.Footer>
                     { updateTransactionInProgress && <Spinner animation="border" size="sm" />}
                    <Button variant="secondary" onClick={() => handleClose()}>Close</Button>
                    <Button type="submit" variant="primary" className={!updatable && "disabled"} onClick={() => updateTransactionHandleClick()}>Update</Button>
                </Modal.Footer>
            </Modal>
            </>)
}


TransactionDetailsModal.propTypes = {
    id: PropTypes.string.isRequired,
    transaction: PropTypes.object.isRequired
}

export default TransactionDetailsModal;