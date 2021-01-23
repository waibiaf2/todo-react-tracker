/** @format */
import PropTypes from "prop-types";
import {useLocation } from 'react-router-dom';

import Button from "./Button";

const Header = ({ title, toggleAddTaskForm, showAdd }) => {
    const location = useLocation();
    return (
        <header className="header">
            <h1>{title}</h1>
            {location.pathname === '/' && <Button
                onClick={() => toggleAddTaskForm()}
                color={showAdd ? "red" : "green"}
                text={showAdd ? "Close" : "Add"}
            />}
        </header>
    );
};

Header.defaultProps = {
    title: "Task Tracker",
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

// Css in JS

// const headingStyle = {
//     color: "yellow",
//     backgroundColor: "black",
//     padding: "10px",
//     borderBottom: "3px solid red",
// };

// const font = {
//     fontSize: "2rem",
//     letterSpacing: "3px",
// };

export default Header;
