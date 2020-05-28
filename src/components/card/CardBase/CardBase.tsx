import React, { ReactElement, ReactNode } from "react";
import { Card, CardContent, CardHeader, makeStyles } from "@material-ui/core";

export interface ICardBaseProps {
  actions?: ReactNode;
  className?: string;
  children?: ReactNode | ReactNode[];
  title?: ReactNode;
}

interface ICardBase extends ICardBaseProps {
  error?: ReactNode;
  loading?: boolean;
  placeholder?: ReactNode;
}

const useStyles = makeStyles(theme => ({
  card: {
    border: `1px solid ${theme.palette.grey[300]}`
  },
  cardHeader: {
    paddingBottom: theme.spacing(0)
  },
  action: {
    marginTop: 0,
    marginRight: 0
  },
  cardTitle: { fontSize: theme.typography.body1.fontSize, fontWeight: 600 }
}));

export function CardBase({
  actions,
  children,
  className,
  title
}: ICardBase): ReactElement {
  const classes = useStyles();

  return (
    <Card className={`${classes.card} ${className}`} elevation={0}>
      <CardHeader
        action={actions}
        classes={{
          root: classes.cardHeader,
          action: classes.action
        }}
        title={title}
        titleTypographyProps={{
          className: classes.cardTitle,
          variant: "h2"
        }}
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
}
