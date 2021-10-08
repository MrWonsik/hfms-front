import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import Col from 'react-bootstrap/Col'
import { closeModalAddNewTransaction } from '../../modal/modal.actions'
import { EXPENSE_TRANSACTION } from '../../finance/TransactionType'
import { createTransaction } from '../../finance/finance.actions'
import moment from 'moment'

export const AddNewTransactionModal = () => {
  const dispatch = useDispatch()

  const { addNewTransactionModalIsOpen, creatingTransactionInProgress, expenseCategories, incomeCategories, shops } = useSelector(state => ({
    addNewTransactionModalIsOpen: state.modals.addNewTransactionModalIsOpen,
    creatingTransactionInProgress: state.finance.creatingTransactionInProgress,
    expenseCategories: state.finance.expenseCategories,
    incomeCategories: state.finance.incomeCategories,
    shops: state.finance.shops
  }))

  const [submitted, setSubmitted] = useState(false)
  const [transactionName, setTransactionName] = useState('')
  const [category, setCategory] = useState({ name: 'Please select' })
  const [shop, setShop] = useState({})
  const [transactionType, setTransactionType] = useState(EXPENSE_TRANSACTION)
  const [amount, setMaximumAmount] = useState(0)
  const [receiptFile, setReceiptFile] = useState(undefined)
  const [transactionDate, setTransactionDate] = useState(moment(new Date()).format('YYYY-MM-DD'))

  const handleClose = () => {
    dispatch(closeModalAddNewTransaction())
    setTransactionName('')
    setTransactionType(EXPENSE_TRANSACTION)
    setMaximumAmount(0)
    setSubmitted(false)
    setCategory({})
    setReceiptFile(undefined)
    setShop({})
    setTransactionDate(moment(new Date()).format('YYYY-MM-DD'))
  }

  const handleAddNewTransaction = (e) => {
    e.preventDefault()
    setSubmitted(true)
    if (transactionName && transactionType && amount && amount > 0 && category && category.name !== 'Please select') {
      dispatch(createTransaction({
        name: transactionName,
        amount: amount,
        transactionType: transactionType,
        shop: shop,
        receiptFile: receiptFile,
        categoryId: category.id,
        transactionDate: transactionDate
      }))
        .then((isTransactionCreated) => {
          if (isTransactionCreated) {
            handleClose()
          }
        })
    }
  }

  const getOptions = (categories) => {
    return categories?.sort((a, b) => a.categoryName.localeCompare(b.categoryName)).sort(a => a.favourite ? -1 : 1).map((category) =>
      (<option type="category" key={category.id} value={category.categoryName} id={category.id}>{category.categoryName} {category.favourite && '★'}</option>))
  }

  return (
        <Modal show={addNewTransactionModalIsOpen} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Add new transaction:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Row>
                    <Form.Group as={Col} sm={6} controlId="transactionName">
                        <Form.Label>Transaction name:</Form.Label>
                        <Form.Control
                            type="text"
                            className={(submitted && !transactionName ? ' is-invalid' : '') }
                            name="transactionName"
                            value={transactionName}
                            onChange={(e) => setTransactionName(e.target.value)}
                            placeholder="Enter transaction name"
                        />
                    <Form.Control.Feedback type="invalid">
                        Transaction name is required
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="amount">
                            <Form.Label>Amount:</Form.Label>
                            <Form.Control
                                type="number"
                                className={(submitted && amount <= 0 ? ' is-invalid' : '')}
                                name="amount"
                                value={amount}
                                onChange={(e) => setMaximumAmount(e.target.value)}
                                min="0"
                                step="0.01"
                                placeholder="0,00"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide correct positive number amount.
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="transactionDate">
                        <Form.Label>Date:</Form.Label>
                            <Form.Control
                                type="date"
                                className={ 'form-control' }
                                name="transactionDate"
                                value={transactionDate}
                                onChange={(e) => {
                                  setTransactionDate(e.target.value)
                                }}
                            >
                            </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} sm={5} controlId="transactionType">
                        <Form.Label>Type:</Form.Label>
                        <Form.Control
                            as="select"
                            className={ 'form-control'}
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
                                className={ 'form-control' + (submitted && (!category || category.name === 'Please select') ? ' is-invalid' : '') }
                                name="category"
                                value={category?.name}
                                onChange={(e) => {
                                  const element = document.querySelector('option[value="' + e.target.value + '"][type="category"]')
                                  const category = element != null ? { id: element.getAttribute('id'), name: e.target.value } : undefined
                                  setCategory(category)
                                }}
                            >
                                <option>Please select</option>
                                {transactionType === EXPENSE_TRANSACTION ? getOptions(expenseCategories) : getOptions(incomeCategories) }
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please select category
                            </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                {transactionType === EXPENSE_TRANSACTION &&
                    <>
                    <Form.Row>
                        <Form.Group as={Col} sm={5} controlId="receiptFile">
                            <Form.File
                                label="Receipt file:"
                                name="receiptFile"
                                onChange={(e) => setReceiptFile(e.target.files[0])}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="shop">
                            <Form.Label>Shop name:</Form.Label>
                            <Form.Control
                                list="shop-list"
                                type="text"
                                className="form-control"
                                name="shop"
                                value={shop?.name}
                                onChange={(e) => {
                                  const element = document.querySelector('option[value="' + e.target.value + '"][type="shop"]')
                                  setShop({ id: (element != null ? element.getAttribute('shop_id') : undefined), name: e.target.value })
                                }}
                                placeholder="Enter shop name"
                            />
                            {shops &&
                                <datalist id="shop-list">
                                    {shops.map(shop =>
                                        <option type="shop" shop_id={shop.id} key={shop.id} value={shop.name}>{shop.createDate.date}</option>
                                    )}
                                </datalist>
                            }
                        </Form.Group>
                    </Form.Row>
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

export default AddNewTransactionModal
