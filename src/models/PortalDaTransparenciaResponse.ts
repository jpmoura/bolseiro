import PaymentDocument from './PaymentDocument';

export default interface PortalDaTransparenciaResponse {
  recordsTotal?: number,
  data?: Array<PaymentDocument>,
  error?: string,
}
