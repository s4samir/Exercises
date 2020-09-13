/*
 * Authored by Samir Kishore
 */
import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import "./TopForm.scss";

export const level = {
  Beginner: "55",
  Intermediate: "67",
  Advanced: "77",
};
export default function TopForm({ onLevelChange }) {
  const handleClick = (value) => {
    onLevelChange(level[value]);
  };
  return (
    <div className="TopForm">
      <div>
        <Typography variant="h1" component="h2" gutterBottom>
          Mine Sweeper
        </Typography>
      </div>
      <div>
        <ButtonGroup
          size="large"
          color="primary"
          aria-label="large outlined primary button group"
        >
          <Button
            onClick={() => {
              handleClick("Beginner");
            }}
          >
            Beginner
          </Button>
          <Button
            onClick={() => {
              handleClick("Intermediate");
            }}
          >
            Intermediate
          </Button>
          <Button
            onClick={() => {
              handleClick("Advanced");
            }}
          >
            Advanced
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

TopForm.propTypes = {
  onLevelChange: PropTypes.func,
};
