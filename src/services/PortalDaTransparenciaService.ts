import axios, { AxiosResponse } from 'axios';
import moment from 'moment';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import PortalDaTransparenciaResponse from '../models/PortalDaTransparenciaResponse';

export default class PortalDaTransparenciaService {
  private readonly corsByPassServer = 'https://cors-anywhere.herokuapp.com/';

  async checkScholarship(date: Date, cpf: string): Promise<PortalDaTransparenciaResponse> {
    const momentDate: moment.Moment = moment(date);
    const lastDayOfMonth: number = momentDate.daysInMonth();
    const year: number = momentDate.year();
    const month: string = momentDate.format('MM');
    const strippedCpf = cpfValidator.strip(cpf);

    const response: AxiosResponse<PortalDaTransparenciaResponse> = await axios.get<PortalDaTransparenciaResponse>(`${this.corsByPassServer}http://www.portaltransparencia.gov.br/despesas/favorecido/resultado?paginacaoSimples=true&tamanhoPagina=15&offset=0&direcaoOrdenacao=desc&colunaOrdenacao=valor&colunasSelecionadas=data%2CdocumentoResumido%2ClocalizadorGasto%2Cfase%2Cespecie%2Cfavorecido%2CufFavorecido%2Cvalor%2Cug%2Cuo%2Corgao%2CorgaoSuperior%2Cgrupo%2Celemento%2Cmodalidade&de=01%2F${month}%2F${year}&ate=${lastDayOfMonth}%2F${month}%2F${year}&cpfCnpj=${strippedCpf}`);

    return response.data;
  }
}
