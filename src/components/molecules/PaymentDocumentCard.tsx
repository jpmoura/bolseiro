import {
  Button, Card, CardActions, CardContent, CardHeader, Divider, makeStyles, Theme, Typography,
} from '@material-ui/core';
import React from 'react';
import PaymentDocument from '../../models/PaymentDocument';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
  scholarshipValue: {
    color: theme.palette.success.main,
    fontWeight: 'bold',
  },
  scholarshipRecipient: {
    textTransform: 'capitalize',
  },
  scholarshipInstitution: {
    fontWeight: 'bold',
  },
}));

interface PaymentDocumentCardProps {
  paymentDocument: PaymentDocument;
}

export default function PaymentDocumentCard({ paymentDocument }: PaymentDocumentCardProps): JSX.Element {
  const classes = useStyles();
  const paymentDocumentPhase: string = paymentDocument.fase.toLowerCase();

  return (
    <>
      <Card className={classes.root} raised>
        <CardHeader
          title={`Documento ${paymentDocument.documentoResumido}`}
          subheader={`Em ${paymentDocumentPhase} no dia ${paymentDocument.data}`}
        />
        <CardContent>
          <Typography>
            Pagamento de
            {' '}
            <span className={classes.scholarshipValue}>{`R$${paymentDocument.valor}`}</span>
            {' '}
            para
          </Typography>
          <br />
          <Typography className={classes.scholarshipRecipient} variant="h6">
            {paymentDocument.nomeFavorecido.toLowerCase()}
          </Typography>
          <br />
          <Typography>
            através da instituição
            {' '}
            <span className={classes.scholarshipInstitution}>{paymentDocument.orgao}</span>
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            size="small"
            target="_blank"
            href={`http://www.portaltransparencia.gov.br/despesas/${paymentDocumentPhase}/${paymentDocument.documento}`}
          >
            Detalhes
          </Button>
        </CardActions>
      </Card>
      <Divider />
    </>
  );
}
