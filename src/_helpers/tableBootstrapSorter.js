//Used to sort data with icon <BsCalendar /> 
export const dateSort = (a, b, order) => (order === "asc" ? new Date(a.props.children[2]) - new Date(b.props.children[2]) : new Date(b.props.children[2]) - new Date(a.props.children[2]));

//Used to sort by name with additional info 
export const sortByName = (a, b, order) => (order === "asc" ? a.props.children[0].localeCompare(b.props.children)  : b.props.children[0].localeCompare(a.props.children));