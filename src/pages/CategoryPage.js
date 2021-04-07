import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../user/user.actions';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CategoriesTable from '../_components/CategoriesTable';
import AddNewCategoriesModal from '../_components/modal/AddNewCategoriesModal';
import Form from "react-bootstrap/Form";
import { BsPlus } from 'react-icons/bs'
import { openModalAddNewCategory } from '../modal/modal.actions';
import { getExpenseCategories } from '../finance/finance.actions';

const CategoryPage = () => {

    const { expenseCategories, isExpenseCategoriesLoading } = useSelector((state) => ({
        expenseCategories: state.finance.expenseCategories,
        isExpenseCategoriesLoading: state.finance.isExpenseCategoriesLoading
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changePage("Category management"))
        dispatch(getExpenseCategories());
    }, []);

    const handleAddNewCategory = () => {
        dispatch(openModalAddNewCategory());
    }


    return (
        <>
            <Form.Group className="text-right">
                <BsPlus tabIndex="0" className="icon-add" onClick={handleAddNewCategory} onKeyPress={e => e.key === 'Enter' && handleAddNewCategory()}/>
            </Form.Group>
            <Tabs className="categories-tabs">
                <Tab eventKey="expense" title="expense">
                    <CategoriesTable type="expense" categories={expenseCategories} isLoading={isExpenseCategoriesLoading} />
                </Tab>
                <Tab eventKey="income" title="income">
                    {/* <CategoriesTable /> */}
                </Tab>
            </Tabs>
            

            <AddNewCategoriesModal />
        </>
    );
}

export default CategoryPage;