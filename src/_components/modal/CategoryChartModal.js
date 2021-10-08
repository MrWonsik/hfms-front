import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import { closeCategoryChartModal } from '../../modal/modal.actions'
import PropTypes from 'prop-types'
import { Line } from 'react-chartjs-2'
import { BiPlus, BiMinus } from 'react-icons/bi'

export const CategoryChartModal = ({ id, category }) => {
  const dispatch = useDispatch()
  const CATEGORY_MONTH_QUANTITY = Object.keys(category.summaryTransactionMap)?.length

  const [chartQuantityMonth, setChartQuantityMonth] = useState(CATEGORY_MONTH_QUANTITY > 12 ? 12 : CATEGORY_MONTH_QUANTITY)
  const MIN_MONTH_QUANTITY = CATEGORY_MONTH_QUANTITY > 1 ? 1 : CATEGORY_MONTH_QUANTITY
  const MAX_MONTH_QUANTITY = CATEGORY_MONTH_QUANTITY > 24 ? 24 : CATEGORY_MONTH_QUANTITY

  const { categoryChartModal } = useSelector(state => ({
    categoryChartModal: state.modals.categoryChartModal
  }))

  const handleClose = () => {
    dispatch(closeCategoryChartModal())
  }

  const data = {
    labels: Object.keys(category.summaryTransactionMap).slice(-1 * chartQuantityMonth),
    datasets: [
      {
        label: category.categoryName,
        data: Object.values(category.summaryTransactionMap).slice(-1 * chartQuantityMonth),
        fill: false,
        backgroundColor: category.colorHex,
        borderColor: category.colorHex
      }
    ]
  }

  const generateMonthNumber = (number) => {
    if (number <= CATEGORY_MONTH_QUANTITY) {
      return <span className="category-chart-modal-number" onClick={() => setChartQuantityMonth(number)}>{number}</span>
    }
  }

  return (
        <Modal show={ categoryChartModal && categoryChartModal.isOpen && categoryChartModal.id === id } onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Category chart ({category.categoryName})</Modal.Title>
            </Modal.Header>
            <Modal.Body className="category-chart-modal-body">
                <div className="category-chart-modal-month-navigation">
                    {CATEGORY_MONTH_QUANTITY !== 0
                      ? <>
                            <span className={'category-chart-modal-icon ' + (chartQuantityMonth === MIN_MONTH_QUANTITY && 'disabled') } onClick={() => chartQuantityMonth > MIN_MONTH_QUANTITY && setChartQuantityMonth(chartQuantityMonth - 1)}><BiMinus/></span>
                                <span className="category-chart-modal-info">Last {chartQuantityMonth} months</span>
                            <span className={'category-chart-modal-icon ' + (chartQuantityMonth === MAX_MONTH_QUANTITY && 'disabled') } onClick={() => chartQuantityMonth < MAX_MONTH_QUANTITY && setChartQuantityMonth(chartQuantityMonth + 1)}><BiPlus/></span>
                        </>
                      : <span>No data</span>
                    }
                    {generateMonthNumber(3)}
                    {generateMonthNumber(6)}
                    {generateMonthNumber(12)}
                    {generateMonthNumber(24)}
                </div>
                <Line data={data}/>
            </Modal.Body>
        </Modal>)
}

CategoryChartModal.propTypes = {
  id: PropTypes.string.isRequired,
  category: PropTypes.object.isRequired
}

export default CategoryChartModal
