import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { closeModalEditMaximumAmount } from '../../_components/modal/modal.actions'
import { BsArrowRightShort } from 'react-icons/bs'
import { Form, Spinner } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { editExpenseCategoryMaximumAmount } from '../../features/finance-oldRedux/finance.actions'
import { getMonth } from '../../_services/dateHelper'
import { getCurrency } from '../../_services/currencyGetter'

const EditMaximumAmountModal = ({ id, categoryId }) => {
  const dispatch = useDispatch()

  const { editMaximumAmountModal, isEditExpenseCategoryMaximumAmountInProgress, expenseCategories } = useSelector(state => ({
    expenseCategories: state.finance.expenseCategories,
    editMaximumAmountModal: state.modals.editMaximumAmountModal,
    isEditExpenseCategoryMaximumAmountInProgress: state.finance.isEditExpenseCategoryMaximumAmountInProgress
  }))

  const category = expenseCategories.find(category => category.id === categoryId)

  const [submitted, setSubmitted] = useState(false)
  const [maximumAmount, setMaximumAmount] = useState(category.currentVersion.maximumAmount)
  const [validInNextMonth, setValidInNextMonth] = useState(false)

  const handleClose = () => {
    dispatch(closeModalEditMaximumAmount())
    setValidInNextMonth(false)
    setSubmitted(false)
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    setSubmitted(true)
    if (maximumAmount >= 0) {
      dispatch(editExpenseCategoryMaximumAmount(category, maximumAmount, validInNextMonth))
        .then((isExpenseCategoryUpdated) => {
          if (isExpenseCategoryUpdated) {
            handleClose()
          }
        })
    }
  }

  return (<Modal show={editMaximumAmountModal && id === editMaximumAmountModal.contextId && editMaximumAmountModal.isOpen } onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Plan maximum amount (<b>{category.categoryName}</b>)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Previous maximum amounts:
        {
        category.expenseCategoryVersions?.sort((b, a) => new Date(a.validMonth) - new Date(b.validMonth)).slice(0, 5).reverse().map(version => {
          const date = new Date(version.validMonth)
          const year = date.getFullYear()
          const month = getMonth(date.getMonth())
          const isCurrentMonth = category.currentVersion.validMonth === version.validMonth
          return <div key={version.id} className={isCurrentMonth ? 'font-italic' : ''}>
                    <BsArrowRightShort className="icon-as-list-pointer"/> {version.maximumAmount} {getCurrency()} ({month} {year}) {isCurrentMonth && ' - current version'}
            </div>
        })}
        <hr/>
            <Form.Group controlId="maximumCategoryAmount">
                <Form.Label>Current maximum category amount:</Form.Label>
                <Form.Control
                    type="number"
                    className={(submitted && maximumAmount < 0 ? ' is-invalid' : '')}
                    name="maximumCategoryAmount"
                    value={maximumAmount}
                    onChange={(e) => setMaximumAmount(e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="0,00"
                />
                <Form.Control.Feedback type="invalid">
                    Please provide correct positive number set maximum amount (or 0 to not set any maximum value).
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validInNextMonth">
                <Form.Check
                    type="switch"
                    name="validInNextMonth"
                    onChange={() => setValidInNextMonth(!validInNextMonth)}
                    value={validInNextMonth}
                    label="is valid from next month"
                />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
             { isEditExpenseCategoryMaximumAmountInProgress && <Spinner animation="border" size="sm" />}
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>)
}

EditMaximumAmountModal.propTypes = {
  id: PropTypes.string.isRequired,
  categoryId: PropTypes.number.isRequired
}

export default EditMaximumAmountModal
