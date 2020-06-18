/* eslint-disable array-callback-return */
import React from 'react';
import styled from 'styled-components';
import { withFormik } from 'formik';
import * as Yup from 'yup'
import { toast } from "react-toastify";
import { baseUrl } from '../../../api'

import { Button } from '../../Buttons'
import SquareInput from '../../Form/SquareInput';
import SelectInput from '../../Form/SelectInput';

const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        nama: Yup.string()
            .min(2, '*Nama terlalu pendek')
            .required('*Nama dibutuhkan')
    }),
    
    mapPropsToValues: props => ({
        ID : props.ID || '',
        APD : props.apd || '',
        tanggal : props.tanggal || '',
        nomor : props.nomor,
        nama : props.nama || '',
        username : props.username || '',
        institusi : props.institusi || '',
        keperluan : props.keperluan || '',
        masuk : props.masuk || '',
        keluar : props.keluar || '',
        suhu1 : props.suhu1 || '',
        suhu2 : props.suhu2 || '',
        asal : props.asal || '',
        tipe : props.tipe || '',
        tujuan : props.tujuan || '',
    }),
    
    handleSubmit: (values, {setSubmitting, setStatus, props}) => {
        setSubmitting(true)

        baseUrl.put(`api/kunjungan`, {...values})
        .then(res => {
            console.log(res.data);
            setSubmitting(false);

            toast.success('Data successfuly updated', {
                autoClose: 1500,
                hideProgressBar: true,
            });
        })
        .catch(err => {
            console.log(err.response);
            setSubmitting(false)
        })
    },
    displayName: 'Update Form',
  });

const BaseUpdateForm = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        setFieldValue,
        handleSubmit,
        isSubmitting,
        status
    } = props;

    const handleErrorResponse = (data) => {
        if (Array.isArray(data) && data.length > 1) {
            let store = []
            data.map((x, i) => {
                store = [...store, <li key={i}>{x.message}</li>]
            })

            return store
        }

        return <center>{data[0].message}</center>
    }

    return (
        <form onSubmit={handleSubmit}>

            {
                status && 
                <div className='error_response_box'>
                    <ul>{handleErrorResponse(status)}</ul>
                </div>
            }

            <Grid>
                <SquareInput
                    type="text"
                    name="nomor"
                    label='Nomor'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nomor}
                    error={errors.nomor && touched.nomor && errors.nomor}
                />
                <SquareInput
                    type="text"
                    name="nama"
                    label='Nama'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nama}
                    error={errors.nama && touched.nama && errors.nama}
                />
                <SelectInput
                    label='Menggunakan APD?'
                    name='APD'
                    onChange={val => setFieldValue('APD', val.value)}
                    options={[
                        {label: 'Iya', value: true},
                        {label: 'Tidak', value: false}
                    ]}
                    isSearchable={false}
                />
            </Grid>

            <Grid>
                <SquareInput
                    type="text"
                    name="tujuan"
                    label='Tempat Tujuan'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tujuan}
                    error={errors.tujuan && touched.tujuan && errors.tujuan}
                />
                <SquareInput
                    type="text"
                    name="keperluan"
                    label='Keperluan'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.keperluan}
                    error={errors.keperluan && touched.keperluan && errors.keperluan}
                />
            </Grid>

            <Grid>
                <SquareInput
                    type="text"
                    name="suhu1"
                    label='Suhu Masuk'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.suhu1}
                    error={errors.suhu1 && touched.suhu1 && errors.suhu1}
                />
                <SquareInput
                    type="text"
                    name="suhu2"
                    label='Suhu Keluar'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.suhu2}
                    error={errors.suhu2 && touched.suhu2 && errors.suhu2}
                />
            </Grid>

            <Grid>
                <SquareInput
                    type="text"
                    name="masuk"
                    label='Masuk'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.masuk}
                    error={errors.masuk && touched.masuk && errors.masuk}
                />
                <SquareInput
                    type="text"
                    name="keluar"
                    label='Keluar'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.keluar}
                    error={errors.keluar && touched.keluar && errors.keluar}
                />
            </Grid>


            <Button set='primary' size='jumbo' type="submit" isLoading={isSubmitting} isDisabled={isSubmitting}>
                Update
            </Button>
        </form>
    );
};

  
const UpdateForm = formikEnhancer(BaseUpdateForm);

export default UpdateForm

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    grid-column-gap: 2rem;
    grid-row-gap: .5rem;
`