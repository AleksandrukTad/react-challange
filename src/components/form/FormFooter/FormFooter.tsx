import React, { ReactElement, ReactNode, BaseSyntheticEvent } from "react";
import { makeStyles, Button, Grid } from "@material-ui/core";

interface IFormFooter {
  formState?: {
    isSubmitting: boolean;
  };
  leftContent?: ReactNode;
  submitText?: string;
  testId?: string;
  onCancel?(event: BaseSyntheticEvent): void;
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    padding: theme.spacing(2, 3),
    margin: theme.spacing(3, -3, -1)
  },
  leftContent: {
    marginRight: "auto"
  }
}));

export function FormFooter({
  formState,
  leftContent,
  submitText = "Submit",
  onCancel
}: IFormFooter): ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {leftContent && <div className={classes.leftContent}>{leftContent}</div>}

      <Grid container spacing={1} justify="flex-end">
        {onCancel && (
          <Grid item>
            <Button onClick={onCancel} variant="outlined" color="secondary">
              Anuluj
            </Button>
          </Grid>
        )}
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            disabled={formState && formState.isSubmitting}
            type="submit"
            data-testid="submit.button"
          >
            {submitText}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
