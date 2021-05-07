import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { closeModalEditMaximumCost } from '../../modal/modal.actions'
import {BsArrowRightShort} from 'react-icons/bs'
import { Form, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import { editExpenseCategoryMaximumCost } from "../../finance/finance.actions";
import { getMonth } from "../../_helpers/dateHelper";

const EditMaximumCostModal = ({ id, category }) => {

    const dispatch = useDispatch();

    const { editMaximumCostModal, isEditExpenseCategoryMaximumCostInProgress } = useSelector(state => ({
        editMaximumCostModal: state.modals.editMaximumCostModal,
        isEditExpenseCategoryMaximumCostInProgress: state.finance.isEditExpenseCategoryMaximumCostInProgress
    }));

    const [submitted, setSubmitted] = useState(false);
    const [maximumCost, setMaximumCost] = useState(category.currentVersion.maximumCost);
    const [validInNextMonth, setValidInNextMonth] = useState(false);

    const handleClose = () => {
        dispatch(closeModalEditMaximumCost());
        setMaximumCost(category.currentVersion.maximumCost);
        setValidInNextMonth(false);
        setSubmitted(false);
      }

    const handleUpdate = (e) => {
        e.preventDefault();
        setSubmitted(true)
        if(maximumCost >= 0) {
            dispatch(editExpenseCategoryMaximumCost( category, maximumCost, validInNextMonth ));
        }
    };

    return (<Modal show={editMaximumCostModal && id === editMaximumCostModal.contextId && editMaximumCostModal.isOpen } onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Plan maximum cost (<b>{category.categoryName}</b>)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Previous maximum costs:
        {
        category.expenseCategoryVersions?.sort((b, a) => new Date(b.validMonth) - new Date(a.validMonth)).slice(0, 3).map(version => {
            let date = new Date(version.validMonth);
            let year = date.getFullYear();
            let month = getMonth(date.getMonth());
            let isCurrentMonth = category.currentVersion.validMonth === version.validMonth;
            return <div key={version.id} className={isCurrentMonth ? "font-italic" : ""}>
                    <BsArrowRightShort className="icon-as-list-pointer"/> {version.maximumCost} zł ({month} {year}) {isCurrentMonth && " - current version"}
            </div>
        })}
        <hr/>
            <Form.Group controlId="maximumCategoryCost">
                <Form.Label>Current maximum category cost:</Form.Label>
                <Form.Control
                    type="number"
                    className={(submitted && maximumCost < 0 ? " is-invalid" : "")}
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
             { isEditExpenseCategoryMaximumCostInProgress && <Spinner animation="border" size="sm" />}
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>)
}

EditMaximumCostModal.propTypes = {
    id: PropTypes.string.isRequired,
    category: PropTypes.object.isRequired
}

export default EditMaximumCostModal;