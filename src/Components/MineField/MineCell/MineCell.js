/*
 * Authored by Samir Kishore
 */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";

export default function MineCell({ number, isMine, onClick }) {
  const [value, setValue] = useState(-1);

  const onCellClick = (number) => {
    const value = onClick(number);

    setValue(value);
  };

  return (
    <button
      className={`minecell ${number} ${isMine ? "blast" : ""} ${
        value !== -1 ? "selected" : ""
      }`}
      onClick={() => onCellClick(number)}
    >
      {isMine && <FontAwesomeIcon icon={faBomb} />}
      {value !== -1 && value}
    </button>
  );
}

MineCell.propTypes = {
  number: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isMine: PropTypes.bool,
};

MineCell.defaultProps = {
  number: "",
  isMine: false,
  onClick: () => ({ mine: false, value: -1 }),
};
