import 'moment/locale/pt-br';
import {
  Button, Container, Grid, IconButton, Snackbar, TextField,
} from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import SearchIcon from '@material-ui/icons/Search';
import BackspaceIcon from '@material-ui/icons/Backspace';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import InputMask from 'react-input-mask';
import PortalDaTransparenciaService from '../../services/PortalDaTransparenciaService';
import PortalDaTransparenciaResponse from '../../models/PortalDaTransparenciaResponse';
import CircularProgressIcon from '../atoms/CircularProgressIcon';
import PaymentDocument from '../../models/PaymentDocument';

moment.locale('pt-br');

interface SchoolarshipFormInputs {
  cpf: string,
  date: Date,
}

interface ScholarshipFormState {
  response?: PortalDaTransparenciaResponse,
  openSnackbar: boolean,
  openDateDialog: boolean,
}

interface ScholarshipFormProps {
  handleSubmit: (paymentDocument: Array<PaymentDocument> | undefined) => void;
}

function isCpfValid(value: string | undefined): boolean {
  return value ? cpfValidator.isValid(value) : false;
}

const lastDateOfCurrentMonth: moment.Moment = moment().endOf('month');

const validationSchema = Yup.object({
  cpf: Yup.string().required('O CPF é obrigatório').test('isCpfValid', 'CPF não é válido', isCpfValid),
  date: Yup.date().required('Mês e ano da bolsa são obrigatórios').max(lastDateOfCurrentMonth.toDate(), 'Você não pode pesquisar por datas no futuro'),
});

export default function ScholarshipForm({ handleSubmit }: ScholarshipFormProps): JSX.Element {
  const portalDaTransparenciaService: PortalDaTransparenciaService = new PortalDaTransparenciaService();

  const [state, setState] = useState<ScholarshipFormState>({
    openDateDialog: false,
    openSnackbar: false,
    response: undefined,
  });
  const formik = useFormik({
    initialValues: {
      cpf: '',
      date: new Date(),
    } as SchoolarshipFormInputs,
    validationSchema,
    validateOnChange: false,
    onSubmit: async (inputValues: SchoolarshipFormInputs) => {
      let response: PortalDaTransparenciaResponse;

      try {
        response = await portalDaTransparenciaService.checkScholarship(inputValues.date, inputValues.cpf);
      } catch (e) {
        response = {
          error: e.Message,
          data: [],
        } as PortalDaTransparenciaResponse;
      }

      setState({
        ...state,
        response,
        openSnackbar: true,
      });

      handleSubmit(response.data);
    },
  });

  const handleDateChange = (date: MaterialUiPickersDate) => {
    formik.setFieldValue('date', date);
  };

  const handleClear = () => {
    formik.resetForm();
    setState({
      ...state,
      openSnackbar: false,
      response: undefined,
    });
    handleSubmit(undefined);
  };

  const closeSnackbar = (): void => {
    setState({
      ...state,
      openSnackbar: false,
    });
  };

  const alertSeverity: 'error' | 'success' = state.response?.error || state.response?.recordsTotal === 0 ? 'error' : 'success';

  const getAlertMessage = (): string => {
    if (state.response?.recordsTotal && state.response.recordsTotal > 0) {
      const pluralNoun: string = state.response.recordsTotal > 1 ? 's' : '';
      return `${state.response.recordsTotal} registro${pluralNoun} encontrado${pluralNoun}`;
    }

    const formattedDate: string = moment(formik.values.date).format('MMMM [de] YYYY');

    return `Nenhum registro encontrado para o CPF ${formik.values.cpf} em ${formattedDate}`;
  };

  const handleClickOnDateInput = (): void => {
    setState({
      ...state,
      openDateDialog: true,
    });
  };

  const handleCloseDateDialog = (): void => {
    setState({
      ...state,
      openDateDialog: false,
    });
  };

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <Grid container>
              <InputMask
                mask="999.999.999-99"
                value={formik.values.cpf}
                onChange={formik.handleChange}
              >
                {() => (
                  <TextField
                    name="cpf"
                    label="CPF"
                    placeholder="Informe o CPF do bolsista"
                    fullWidth
                    value={formik.values.cpf}
                    error={formik.touched.cpf && !!formik.errors.cpf}
                    helperText={formik.touched.cpf && formik.errors.cpf}
                  />
                )}
              </InputMask>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <MuiPickersUtilsProvider locale="pt-br" utils={MomentUtils}>
                <KeyboardDatePicker
                  name="date"
                  margin="normal"
                  label="Mês e ano da bolsa"
                  format="MM/yyyy"
                  openTo="year"
                  cancelLabel="Cancelar"
                  views={['year', 'month']}
                  open={state.openDateDialog}
                  disableFuture
                  autoOk
                  fullWidth
                  value={formik.values.date}
                  error={formik.touched.date && !!formik.errors.date}
                  helperText={formik.touched.date && formik.errors.date}
                  onChange={(date) => handleDateChange(date)}
                  onClick={handleClickOnDateInput}
                  onAccept={handleCloseDateDialog}
                  onClose={handleCloseDateDialog}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container>
              <Button variant="contained" onClick={handleClear} disabled={!!formik.isSubmitting} startIcon={<BackspaceIcon />}>Limpar</Button>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                disabled={!!formik.isSubmitting}
                startIcon={formik.isSubmitting ? <CircularProgressIcon /> : <SearchIcon />}
              >
                Pesquisar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={state.openSnackbar}
      >
        <Alert
          severity={alertSeverity}
          variant="filled"
          action={(
            <IconButton size="small" color="inherit" onClick={closeSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
        )}
        >
          {getAlertMessage()}
        </Alert>
      </Snackbar>
    </Container>
  );
}
