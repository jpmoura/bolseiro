import React, { useState } from 'react';
import PaymentDocument from '../../models/PaymentDocument';
import PaymentDocumentCard from '../molecules/PaymentDocumentCard';
import ScholarshipForm from '../organisms/ScholarshipForm';
import DefaultTemplate from '../templates/DefaultTemplate';

export default function IndexPage(): JSX.Element {
  const [paymentDocuments, setPaymentDocuments] = useState<Array<PaymentDocument> | undefined>(undefined);
  const paymentDocumentCards = paymentDocuments?.map((paymentDocument: PaymentDocument) => <PaymentDocumentCard key={paymentDocument.documentoResumido} paymentDocument={paymentDocument} />);

  return (
    <DefaultTemplate>
      <ScholarshipForm handleSubmit={setPaymentDocuments} />
      {paymentDocumentCards}
    </DefaultTemplate>
  );
}
