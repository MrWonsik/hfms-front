import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types'
import { closeTransactionDetailsModal } from '../../modal/modal.actions'
import { Col, Form, Image, Spinner } from 'react-bootstrap'
import Lightbox from 'react-image-lightbox'
import { BsTrash, BsUpload } from 'react-icons/bs'
import { getIconWithActionAndTooltip } from '../../_helpers/wrapWithTooltip'
import { EXPENSE_TRANSACTION } from '../../finance/TransactionType'
import { deleteTransactionFile, updateTransaction, uploadTransactionFile } from '../../finance/finance.actions'

export const TransactionDetailsModal = ({ id, transaction }) => {
  const dispatch = useDispatch()
  const isExpenseTransaction = transaction.type === EXPENSE_TRANSACTION

  const { transactionDetailsModal, expenseFileRequestLoading, expenseDetailsBytes, expenseCategories, incomeCategories, shops, updateTransactionInProgress } = useSelector(state => ({
    transactionDetailsModal: state.modals.transactionDetailsModal,
    expenseFileRequestLoading: state.finance.expenseFileRequestLoading,
    expenseDetailsBytes: state.finance.expenseDetailsBytes,
    expenseCategories: state.finance.expenseCategories,
    incomeCategories: state.finance.incomeCategories,
    shops: state.finance.shops,
    updateTransactionInProgress: state.finance.updateTransactionInProgress
  }))

  const [openImage, setOpenImage] = useState(false)

  const getFormattedDate = () => {
    const date = new Date(transaction.createdDate)
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
    const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date)
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
    return `${day} ${month} ${year}`
  }

  const uploadFile = (file, transactionId) => {
    dispatch(uploadTransactionFile(transactionId, file))
  }

  const deleteFile = (transactionId) => {
    dispatch(deleteTransactionFile(transactionId))
  }

  const updateTransactionHandleClick = () => {
    if (!updatable) {
      return
    }

    setSubmitted(true)
    if (transactionName && amount && amount >= 0 && category && category.name !== 'Please wait') {
      if (isExpenseTransaction) {
        return
      }
      dispatch(updateTransaction({
        id: transaction.id,
        name: transactionName,
        amount: amount,
        transactionType: transaction.type,
        shop: shop,
        categoryId: category.id,
        transactionDate: transactionDate
      }))
        .then((isTransactionUpdated) => {
          if (isTransactionUpdated) {
            dispatch(closeTransactionDetailsModal())
          }
        })
    }
  }

  const handleClose = () => {
    dispatch(closeTransactionDetailsModal())
    setSubmitted(false)
    setTransactionName(transaction.name)
    setAmount(transaction.amount)
    setCategory({ id: transaction.category?.id, name: transaction.category?.name })
    setShop({ id: transaction.shop?.id, name: transaction.shop?.name })
    setTransactionDate(transaction.createdDate)
  }

  const [submitted, setSubmitted] = useState(false)
  const [transactionName, setTransactionName] = useState(transaction.name)
  const [amount, setAmount] = useState(transaction.amount)
  const [category, setCategory] = useState({ id: transaction.category?.id, name: transaction.category?.name })
  const [shop, setShop] = useState({ id: transaction.shop?.id, name: transaction.shop?.name })
  const [transactionDate, setTransactionDate] = useState(transaction.createdDate)
  const [updatable, setUpdatable] = useState(false)

  const clickUploadFile = () => {
    document.getElementById('upload-file-id').click()
  }

  useEffect(() => {
    if (transactionName !== transaction.name ||
        amount !== transaction.amount ||
        category?.name !== transaction.category?.name ||
        (shop?.name !== transaction.shop?.name && shop?.id !== transaction.shop?.id) ||
        transactionDate !== transaction.createdDate) {
      setUpdatable(true)
    } else {
      setUpdatable(false)
    }
  }, [transactionName, amount, category, shop, transactionDate])

  const getOptions = (categories) => {
    return categories?.sort((a, b) => a.categoryName.localeCompare(b.categoryName)).sort(a => a.favourite ? -1 : 1).map((category) =>
      (<option key={category.id} value={category.categoryName} id={category.id}>{category.categoryName} {category.favourite && '★'}</option>))
  }

  return (
            <>
            {openImage && <Lightbox mainSrc={expenseDetailsBytes} onCloseRequest={() => setOpenImage(false)}/> }
            <Modal size={isExpenseTransaction ? 'lg' : 'md'} show={transactionDetailsModal && id === transactionDetailsModal.contextId && transactionDetailsModal.isOpen} onHide={handleClose}>
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
                                    className={submitted && !transactionName && ' is-invalid' }
                                    name="transactionName"
                                    value={transactionName}
                                    onChange={(e) => setTransactionName(e.target.value)}
                                    placeholder={submitted && !transactionName ? 'Name is required' : 'Transaction name'}
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
                                          setTransactionDate(e.target.value)
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
                                    className={(submitted && amount <= 0 && ' is-invalid')}
                                    name="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    min="0"
                                    step="0.01"
                                    placeholder={submitted && amount <= 0 ? 'Amount > 0' : '0,00'}
                                />
                            </Col>
                        </Form.Row>
                        <Form.Row className="transaction-detail-form-row-2">
                            <Form.Label className="transaction-details-label">Category:</Form.Label>
                            <Col>
                                <Form.Control
                                    as="select"
                                    className={submitted && (!category || category.name === 'Please select') && ' is-invalid'}
                                    name="category"
                                    value={category?.name}
                                    onChange={(e) => {
                                      const element = document.querySelector('option[value="' + e.target.value + '"]')
                                      const category = element != null ? { id: element.getAttribute('id'), name: e.target.value } : undefined
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
                                    name="shop"
                                    value={shop.name && shop.name}
                                    onChange={(e) => {
                                      const element = document.querySelector('option[value="' + e.target.value + '"]')
                                      setShop({ id: element != null ? element.getAttribute('id') : undefined, name: e.target.value })
                                    }}
                                    placeholder="Shop name"
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
                        {transaction.type === EXPENSE_TRANSACTION &&
                            <Col sm={6} className="transaction-detail-form-col">
                                <div className="transaction-image-container">
                                    {transaction.receiptId
                                      ? expenseFileRequestLoading
                                        ? <div className="text-center"><Spinner animation="border" size="sm" /></div>
                                        : <Image src={expenseDetailsBytes} alt="recipt" className="transaction-image" onClick={() => setOpenImage(true)} fluid />
                                      : <div className="text-center">No image</div>
                                    }
                                </div>
                                <div className="text-center">
                                    {getIconWithActionAndTooltip(BsUpload, 'transaction-image-icon' + (transaction.receiptId && ' disabled'), () => clickUploadFile(), 'top', 'Upload file')}
                                    <Form.File id="upload-file-id" hidden onChange={(e) => uploadFile(e.target.files[0], transaction.id)}/>
                                    {getIconWithActionAndTooltip(BsTrash, 'transaction-image-icon' + (!transaction.receiptId && ' disabled'), () => deleteFile(transaction.id), 'top', 'Delete file')}
                                </div>
                            </Col>
                        }
                    </Form.Row>
                    <br/>
                </Modal.Body>
                <Modal.Footer>
                     { updateTransactionInProgress && <Spinner animation="border" size="sm" />}
                    <Button variant="secondary" onClick={() => handleClose()}>Close</Button>
                    <Button type="submit" variant="primary" className={!updatable && 'disabled'} onClick={() => updateTransactionHandleClick()}>Update</Button>
                </Modal.Footer>
            </Modal>
            </>)
}

TransactionDetailsModal.propTypes = {
  id: PropTypes.string.isRequired,
  transaction: PropTypes.object.isRequired
}

export default TransactionDetailsModal
