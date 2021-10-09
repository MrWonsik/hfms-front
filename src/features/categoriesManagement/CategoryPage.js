import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePage } from '../user/oldRedux/user.actions'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import CategoriesTable from './CategoriesTable'
import AddNewCategoryModal from './AddNewCategoryModal'
import Form from 'react-bootstrap/Form'
import { BsPlus } from 'react-icons/bs'
import { openModalAddNewCategory } from '../../_components/modal/modal.actions'
import { getCategories } from '../../features/finance-oldRedux/finance.actions'
import { EXPENSE, INCOME } from '../../features/finance-oldRedux/CategoryType'
import { getIconWithActionAndTooltip } from '../../_components/HoverTooltip'

const CategoryPage = () => {
  const { expenseCategories, incomeCategories, isExpenseCategoriesLoading, isIncomeCategoriesLoading } = useSelector((state) => ({
    expenseCategories: state.finance.expenseCategories,
    incomeCategories: state.finance.incomeCategories,
    isExpenseCategoriesLoading: state.finance.isExpenseCategoriesLoading,
    isIncomeCategoriesLoading: state.finance.isIncomeCategoriesLoading
  }))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changePage('Category management'))
    dispatch(getCategories(EXPENSE))
    dispatch(getCategories(INCOME))
  }, [])

  const handleAddNewCategory = () => {
    dispatch(openModalAddNewCategory())
  }

  return (
        <>
            <Form.Group className="text-right add-new-container">
                {getIconWithActionAndTooltip(BsPlus, 'table-icon-action', () => handleAddNewCategory(), 'top', 'Add new category')}
            </Form.Group>
            <Tabs className="categories-tabs">
                <Tab eventKey="expense" title="expense">
                    <CategoriesTable type={EXPENSE} categories={expenseCategories} isLoading={isExpenseCategoriesLoading} />
                </Tab>
                <Tab eventKey="income" title="income">
                    <CategoriesTable type={INCOME} categories={incomeCategories} isLoading={isIncomeCategoriesLoading} />
                </Tab>
            </Tabs>
            <AddNewCategoryModal />
        </>
  )
}

export default CategoryPage
