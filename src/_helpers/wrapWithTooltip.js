import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import PropTypes from "prop-types";

export const getIconWithActionAndTooltip = (IconTag, iconClassName, methodOnClick, tooltipPlacement, tooltipMessage, isVisible=true) => (
    <HoverTooltip 
        el={<IconTag tabIndex="0" className={iconClassName + (isVisible ? "" : " d-none") } onClick={methodOnClick} onKeyPress={e => e.key ==='Enter' && methodOnClick} />}
        placement={tooltipPlacement}
        msg={tooltipMessage}
        isVisible={isVisible}
    />
)

export const getIconWithTooltip = (IconTag, iconClassName, tooltipMessage, tooltipPlacement = "top", isVisible=true) => (
    <HoverTooltip 
        el={<IconTag tabIndex="0" className={iconClassName + (isVisible ? "" : " d-none") } />}
        placement={tooltipPlacement}
        msg={tooltipMessage}
        isVisible={isVisible}
    />
)

const HoverTooltip = (props) => {
    return <OverlayTrigger
    placement={props.placement}
    delay={{ show: 250, hide: 50 }}
    overlay={<Tooltip>{props.msg}</Tooltip>}
    >
        {props.el}
    </OverlayTrigger>
}

HoverTooltip.propTypes = {
    placement: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired,
    el: PropTypes.element.isRequired
}

export default HoverTooltip; 